import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { getTokenFromCookie, verifyToken } from '../../../../lib/adminAuth'

const UPLOAD_DIR = path.resolve(process.cwd(), 'public', 'uploads')

function isAuthorized(request: Request) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
  const cookie = request.headers.get('cookie')
  const token = getTokenFromCookie(cookie)
  return verifyToken(token, ADMIN_PASSWORD)
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const form = await request.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'no file' }, { status: 400 })

  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filename = `${Date.now()}_${String(file.name).replace(/[^a-zA-Z0-9.\-_]/g, '_')}`
  const outPath = path.join(UPLOAD_DIR, filename)
  await fs.writeFile(outPath, buffer)
  const publicUrl = `/uploads/${filename}`
  return NextResponse.json({ url: publicUrl })
}
