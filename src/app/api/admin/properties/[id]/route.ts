import { NextResponse } from 'next/server'
import path from 'path'
import { getTokenFromCookie, verifyToken } from '../../../../../lib/adminAuth'
import { readJson, writeJson, ensureFileExists } from '../../../../../lib/safeJson'
import { getCollection } from '../../../../../lib/mongo'
import { sanitizePropertyPayload } from '../../../../../lib/validators'

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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  const payload = await request.json().catch(() => ({}))
  const data = await readData()
  // robust id matching: trim and compare string/number forms
  const searchId = String(id || '').trim()
  let idx = data.findIndex((d: any) => String(d.id || '').trim() === searchId)
  if (process.env.MONGO_URI) {
    try {
      const coll = await getCollection('properties')
      // sanitize incoming payload and set normalized location
      const cleaned = sanitizePropertyPayload(payload)
      const updateDoc: any = {}
      // only set fields that were provided in payload
      if (payload.title !== undefined) updateDoc.title = cleaned.title
      if (payload.location !== undefined) {
        updateDoc.location = cleaned.location
        updateDoc.location_normalized = cleaned.location_normalized
      }
      if (payload.price !== undefined) updateDoc.price = cleaned.price
      if (payload.type !== undefined) updateDoc.type = cleaned.type
      if (payload.sqm !== undefined) updateDoc.sqm = cleaned.sqm
      if (payload.rooms !== undefined) updateDoc.rooms = cleaned.rooms
      if (payload.baths !== undefined) updateDoc.baths = cleaned.baths
      if (payload.image !== undefined) updateDoc.images = cleaned.images
      if (payload.images !== undefined) updateDoc.images = cleaned.images
      if (payload.description !== undefined) updateDoc.description = cleaned.description
      const res = await coll.findOneAndUpdate({ id: searchId }, { $set: updateDoc }, { returnDocument: 'after' })
      if (!res.value) return NextResponse.json({ error: 'not found' }, { status: 404 })
      return NextResponse.json(res.value)
    } catch (e) {
      // fallback to file-based
    }
  }

  if (idx === -1) {
    // try numeric equality as a fallback
    const numericId = Number(searchId)
    if (!Number.isNaN(numericId)) {
      idx = data.findIndex((d: any) => Number(d.id) === numericId)
    }
  }
  if (idx === -1) {
    return NextResponse.json({ error: 'not found', ids: data.map((d: any) => d.id) }, { status: 404 })
  }

  // normalize incoming payload so description and numeric fields are persisted
  const updated = {
    ...data[idx],
    title: payload.title ?? data[idx].title ?? '',
    location: payload.location ?? data[idx].location ?? '',
    price: payload.price ?? data[idx].price ?? '',
    type: payload.type ?? data[idx].type ?? 'sale',
    sqm: typeof payload.sqm === 'number' ? payload.sqm : Number(payload.sqm ?? data[idx].sqm) || 0,
    rooms: typeof payload.rooms === 'number' ? payload.rooms : Number(payload.rooms ?? data[idx].rooms) || 0,
    baths: typeof payload.baths === 'number' ? payload.baths : Number(payload.baths ?? data[idx].baths) || 0,
    image: payload.image ?? data[idx].image ?? '',
    description: payload.description ?? data[idx].description ?? ''
  }

  data[idx] = updated
  await writeData(data)
  return NextResponse.json(data[idx])
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { id } = await params
  if (process.env.MONGO_URI) {
    try {
      const coll = await getCollection('properties')
      const res = await coll.findOneAndDelete({ id: String(id) })
      if (!res.value) return NextResponse.json({ error: 'not found' }, { status: 404 })
      return NextResponse.json(res.value)
    } catch (e) {
      // fallback
    }
  }
  const data = await readData()
  const idx = data.findIndex((d: any) => String(d.id) === String(id))
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const [removed] = data.splice(idx, 1)
  await writeData(data)
  return NextResponse.json(removed)
}
