import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '../../../../lib/adminAuth'

export async function POST() {
  const cookie = `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0`
  return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } })
}
