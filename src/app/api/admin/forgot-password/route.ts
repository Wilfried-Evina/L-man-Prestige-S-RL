import { NextResponse } from 'next/server'
import crypto from 'crypto'

// In-memory store for reset tokens (valid for 15 minutes)
// In production you'd use a DB, but for a single-admin site this is fine
const resetTokens = new Map<string, { email: string; expires: number }>()

export { resetTokens }

let nodemailer: any = null
try { nodemailer = require('nodemailer') } catch (e) { nodemailer = null }

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { email } = body || {}

  if (!email) {
    return NextResponse.json({ error: 'Email requis.' }, { status: 400 })
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'

  // Always respond with success to not leak whether the email exists
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ ok: true })
  }

  // Generate a secure reset token
  const token = crypto.randomBytes(32).toString('hex')
  const expires = Date.now() + 15 * 60 * 1000 // 15 minutes

  // Clean up expired tokens
  for (const [t, data] of resetTokens.entries()) {
    if (data.expires < Date.now()) resetTokens.delete(t)
  }

  resetTokens.set(token, { email, expires })

  // Build the reset URL
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https'
  const resetUrl = `${protocol}://${host}/fr/admin/reset-password?token=${token}`

  // Send email via SMTP
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const leadsFrom = process.env.LEADS_FROM || 'no-reply@lemanprestige.com'

  if (nodemailer && smtpHost && smtpPort && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass }
      })

      await transporter.sendMail({
        from: leadsFrom,
        to: email,
        subject: 'Réinitialisation de votre mot de passe — Léman Prestige',
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; max-width: 520px; margin: 0 auto;">
            <div style="background: #051622; padding: 28px 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #C5A059; font-size: 22px;">Léman Prestige</h1>
              <p style="margin: 6px 0 0; color: rgba(255,255,255,0.6); font-size: 13px;">Réinitialisation du mot de passe</p>
            </div>
            <div style="background: #f9f9f9; padding: 28px 24px; border-radius: 0 0 12px 12px; border: 1px solid #eee; border-top: none;">
              <p style="color: #333; font-size: 14px; line-height: 1.7; margin: 0 0 20px;">
                Bonjour,<br><br>
                Vous avez demandé la réinitialisation de votre mot de passe administrateur.
                Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe.
              </p>
              <div style="text-align: center; margin: 28px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #C5A059; color: #051622; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; letter-spacing: 0.03em;">
                  Réinitialiser mon mot de passe
                </a>
              </div>
              <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 20px 0 0;">
                Ce lien est valable <strong>15 minutes</strong>. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.<br><br>
                <span style="color: #bbb;">Lien direct : <a href="${resetUrl}" style="color: #C5A059; word-break: break-all;">${resetUrl}</a></span>
              </p>
            </div>
          </div>
        `
      })
    } catch (err) {
      console.error('Failed to send reset email:', err)
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email.' }, { status: 500 })
    }
  } else {
    console.error('SMTP not configured, reset URL:', resetUrl)
    return NextResponse.json({ error: 'Le serveur email n\'est pas configuré.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
