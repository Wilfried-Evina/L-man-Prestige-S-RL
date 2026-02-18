import { NextResponse } from 'next/server'
import { createToken, verifyPassword, COOKIE_NAME } from '../../../../lib/adminAuth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { email, password } = body || {}
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
  const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

  if (!email || !password || email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const passwordValid = await verifyPassword(password, ADMIN_PASSWORD_HASH)
  if (!passwordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = createToken()
  const maxAge = 24 * 60 * 60 // 1 day
  const cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${maxAge}`
  return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } })
}
