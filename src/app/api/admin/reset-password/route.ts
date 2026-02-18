import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { hashPassword } from '../../../../lib/adminAuth'
import { resetTokens } from '../forgot-password/route'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { token, newPassword } = body || {}

  if (!token || !newPassword) {
    return NextResponse.json({ error: 'Token et nouveau mot de passe requis.' }, { status: 400 })
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' }, { status: 400 })
  }

  // Validate the token
  const tokenData = resetTokens.get(token)
  if (!tokenData) {
    return NextResponse.json({ error: 'Lien invalide ou expiré. Veuillez refaire une demande.' }, { status: 400 })
  }

  if (tokenData.expires < Date.now()) {
    resetTokens.delete(token)
    return NextResponse.json({ error: 'Ce lien a expiré. Veuillez refaire une demande.' }, { status: 400 })
  }

  // Hash the new password and update .env.local
  try {
    const newHash = await hashPassword(newPassword)
    const envPath = path.resolve(process.cwd(), '.env.local')
    let envContent = await fs.readFile(envPath, 'utf-8')

    const regex = /^ADMIN_PASSWORD_HASH=.*$/m
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `ADMIN_PASSWORD_HASH=${newHash}`)
    } else {
      envContent += `\nADMIN_PASSWORD_HASH=${newHash}`
    }

    await fs.writeFile(envPath, envContent, 'utf-8')
    process.env.ADMIN_PASSWORD_HASH = newHash

    // Invalidate the token
    resetTokens.delete(token)

    return NextResponse.json({ ok: true, message: 'Mot de passe modifié avec succès.' })
  } catch (err) {
    console.error('Error resetting password:', err)
    return NextResponse.json({ error: 'Erreur serveur lors de la mise à jour.' }, { status: 500 })
  }
}
