import { NextResponse } from 'next/server'
import path from 'path'
import { getTokenFromCookie, verifyToken } from '../../../../lib/adminAuth'
import { readJson, writeJson, ensureFileExists } from '../../../../lib/safeJson'
import { getCollection } from '../../../../lib/mongo'
import { sanitizePropertyPayload } from '../../../../lib/validators'

const DATA_PATH = path.resolve(process.cwd(), 'src/data/properties.json')

async function readData() {
  await ensureFileExists(DATA_PATH, [])
  return readJson(DATA_PATH)
}

async function writeData(data: any) {
  return writeJson(DATA_PATH, data)
}

function isAuthorized(request: Request) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
  const cookie = request.headers.get('cookie')
  const token = getTokenFromCookie(cookie)
  return verifyToken(token, ADMIN_PASSWORD)
}

export async function GET(request: Request) {
  // Protected: only admin can list via the admin API
  if (!isAuthorized(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  // prefer Mongo if configured
  if (process.env.MONGO_URI) {
    try {
      const coll = await getCollection('properties')
      const docs = await coll.find().toArray()
      return NextResponse.json(docs)
    } catch (e) {
      // fallback to file
    }
  }
  const data = await readData()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = await request.json().catch(() => ({}))
  const data = await readData()
  const id = String(Date.now())
  // sanitize payload
  const cleaned = sanitizePropertyPayload(payload)
  const item = {
    id,
    ...cleaned
  }
  // if Mongo configured, insert there
  if (process.env.MONGO_URI) {
    try {
      const coll = await getCollection('properties')
      // ensure location_normalized exists
      item.location_normalized = cleaned.location_normalized
      // ensure images exists
      if (!Array.isArray(item.images) || item.images.length === 0) {
        item.images = cleaned.images || []
      }
      await coll.insertOne(item)
      return NextResponse.json(item, { status: 201 })
    } catch (e) {
      // fallthrough to file fallback
    }
  }

  data.push(item)
  await writeData(data)
  return NextResponse.json(item, { status: 201 })
}
