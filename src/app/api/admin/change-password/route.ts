import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { isAuthorized, verifyPassword, hashPassword } from '../../../../lib/adminAuth'

export async function POST(request: Request) {
  // Verify the user is authenticated
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const { currentPassword, newPassword } = body || {}

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 })
  }

  const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''
  const passwordValid = await verifyPassword(currentPassword, ADMIN_PASSWORD_HASH)
  if (!passwordValid) {
    return NextResponse.json({ error: 'Le mot de passe actuel est incorrect.' }, { status: 403 })
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères.' }, { status: 400 })
  }

  // Hash the new password and update .env.local
  try {
    const newHash = await hashPassword(newPassword)
    const envPath = path.resolve(process.cwd(), '.env.local')
    let envContent = await fs.readFile(envPath, 'utf-8')

    // Replace the ADMIN_PASSWORD_HASH line
    const regex = /^ADMIN_PASSWORD_HASH=.*$/m
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `ADMIN_PASSWORD_HASH=${newHash}`)
    } else {
      envContent += `\nADMIN_PASSWORD_HASH=${newHash}`
    }

    await fs.writeFile(envPath, envContent, 'utf-8')

    // Update the runtime env variable so it works immediately without restart
    process.env.ADMIN_PASSWORD_HASH = newHash

    return NextResponse.json({ ok: true, message: 'Mot de passe modifié avec succès.' })
  } catch (err) {
    console.error('Error updating password:', err)
    return NextResponse.json({ error: 'Erreur serveur lors de la mise à jour.' }, { status: 500 })
  }
}
