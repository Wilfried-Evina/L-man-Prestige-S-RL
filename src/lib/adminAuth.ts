import crypto from 'crypto'

export const COOKIE_NAME = 'admin_token'
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000 // 2h — shorter for security

/** Get the HMAC secret used for token signing (separate from password) */
export function getSecret() {
  return process.env.ADMIN_SECRET || 'fallback-secret-change-me'
}

export function createToken(secret?: string) {
  const s = secret || getSecret()
  const ts = Date.now().toString()
  const hmac = crypto.createHmac('sha256', s).update(ts).digest('hex')
  return `${ts}.${hmac}`
}

export function verifyToken(token: string | null | undefined, secret?: string) {
  const s = secret || getSecret()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [tsStr, hmac] = parts
  const expected = crypto.createHmac('sha256', s).update(tsStr).digest('hex')
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

/** Hash a password with scrypt (returns "salt:hash") */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err)
      else resolve(`${salt}:${key.toString('hex')}`)
    })
  })
}

/** Verify a password against a "salt:hash" string */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':')
  if (!salt || !hash) return false
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err)
      else resolve(crypto.timingSafeEqual(Buffer.from(hash, 'hex'), key))
    })
  })
}

/** Check if the request has a valid admin token */
export function isAuthorized(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie')
  const token = getTokenFromCookie(cookieHeader)
  return verifyToken(token)
}
