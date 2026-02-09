import { NextResponse } from 'next/server'
import { createToken, COOKIE_NAME } from '../../../../lib/adminAuth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { email, password } = body || {}
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
  if (!email || !password || email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  const token = createToken(ADMIN_PASSWORD)
  const maxAge = 24 * 60 * 60 // 1 day
  const cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAge}`
  return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } })
}
