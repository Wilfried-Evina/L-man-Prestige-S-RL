import crypto from 'crypto'

export const COOKIE_NAME = 'admin_token'
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000 // 2h — shorter for security

export function createToken(secret: string) {
  const ts = Date.now().toString()
  const hmac = crypto.createHmac('sha256', secret).update(ts).digest('hex')
  return `${ts}.${hmac}`
}

export function verifyToken(token: string | null | undefined, secret: string) {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [tsStr, hmac] = parts
  const expected = crypto.createHmac('sha256', secret).update(tsStr).digest('hex')
  try {
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) return false
  } catch (e) {
    return false
  }
  const ts = Number(tsStr)
  if (Number.isNaN(ts)) return false
  if (Date.now() - ts > TOKEN_TTL_MS) return false
  return true
}

export function getTokenFromCookie(cookieHeader: string | null) {
  if (!cookieHeader) return null
  const cookies = cookieHeader.split(';').map(c => c.trim())
  for (const c of cookies) {
    if (c.startsWith(`${COOKIE_NAME}=`)) return decodeURIComponent(c.split('=')[1])
  }
  return null
}
