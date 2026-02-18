"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import styles from '../../app/[locale]/devis/DevisPage.module.css'
import AdminDashboard from './AdminDashboard'

const INACTIVITY_TIMEOUT = 15 * 60 * 1000 // 15 minutes

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [authErr, setAuthErr] = useState<string | null>(null)
  const [form, setForm] = useState({ email: '', password: '' })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [forgotMsg, setForgotMsg] = useState('')

  // Check if user is already authenticated on mount
  async function checkAuth() {
    const res = await fetch('/api/admin/properties')
    setIsAuthenticated(res.ok)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  // Auto-logout on inactivity
  const performLogout = useCallback(async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setIsAuthenticated(false)
    setForm({ email: '', password: '' })
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    function resetTimer() {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        performLogout()
      }, INACTIVITY_TIMEOUT)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click']
    events.forEach(ev => window.addEventListener(ev, resetTimer))
    resetTimer() // start the timer

    return () => {
      events.forEach(ev => window.removeEventListener(ev, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isAuthenticated, performLogout])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setAuthErr(null)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    })
    if (res.ok) {
      setIsAuthenticated(true)
    } else {
      setAuthErr('Email ou mot de passe incorrect')
    }
  }

  async function logout() {
    performLogout()
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault()
    setForgotStatus('sending')
    setForgotMsg('')
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      })
      if (res.ok) {
        setForgotStatus('sent')
        setForgotMsg('Un lien de réinitialisation a été envoyé à votre adresse email.')
      } else {
        setForgotStatus('error')
        const data = await res.json().catch(() => ({}))
        setForgotMsg(data.error || 'Erreur lors de l\'envoi. Vérifiez votre email.')
      }
    } catch {
      setForgotStatus('error')
      setForgotMsg('Erreur de connexion au serveur.')
    }
  }

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className={styles.devisPage}>
        <div className={styles.devisContainer} style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>Chargement...</p>
        </div>
      </div>
    )
  }

  // Authenticated -> show dashboard
  if (isAuthenticated) {
    return <AdminDashboard onLogout={logout} />
  }

  // Forgot password view
  if (showForgot) {
    return (
      <div className={styles.devisPage}>
        <div className={styles.devisContainer} style={{ maxWidth: '500px' }}>
          <div className={styles.header}>
            <div className={styles.headerBadge}><span>Réinitialisation</span></div>
            <h1 className={styles.title}>Mot de passe oublié</h1>
            <p className={styles.subtitle}>Entrez votre adresse email administrateur. Vous recevrez un lien de réinitialisation.</p>
            <div className={styles.headerDivider}>
              <span className={styles.dividerLine}></span>
              <span className={styles.dividerIcon}>◆</span>
              <span className={styles.dividerLine}></span>
            </div>
          </div>

          {forgotStatus === 'sent' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', fontSize: '28px'
              }}>✓</div>
              <p style={{ color: '#22c55e', fontSize: '1rem', fontWeight: 600, margin: '0 0 8px' }}>Email envoyé !</p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 24px', lineHeight: 1.6 }}>{forgotMsg}</p>
              <button
                onClick={() => { setShowForgot(false); setForgotStatus('idle'); setForgotEmail('') }}
                className={styles.submitButton}
                style={{ maxWidth: '200px', margin: '0 auto' }}
              >
                <span className={styles.buttonContent}>
                  <span>← Retour</span>
                </span>
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleForgotPassword}>
              <div className={styles.formSection}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email administrateur <span className={styles.required}>*</span></label>
                  <input
                    required
                    className={styles.input}
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="info@lemanprestige.com"
                  />
                </div>
              </div>

              <div className={styles.submitSection}>
                {forgotStatus === 'error' && <div className={styles.errorMessage}>{forgotMsg}</div>}
                <button className={styles.submitButton} type="submit" disabled={forgotStatus === 'sending'}>
                  <span className={styles.buttonContent}>
                    <span>{forgotStatus === 'sending' ? 'Envoi en cours…' : 'Envoyer le lien'}</span>
                    <span className={styles.buttonIcon}>→</span>
                  </span>
                </button>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => { setShowForgot(false); setForgotStatus('idle'); setForgotMsg('') }}
                    style={{
                      background: 'none', border: 'none', color: '#C5A059',
                      cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline'
                    }}
                  >
                    ← Retour à la connexion
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  // Not authenticated -> show login form
  return (
    <div className={styles.devisPage}>
      <div className={styles.devisContainer}>
        <div className={styles.header}>
          <div className={styles.headerBadge}><span>Admin privé</span></div>
          <h1 className={styles.title}>Accès administrateur</h1>
          <p className={styles.subtitle}>Zone réservée — connectez‑vous avec votre email et mot de passe.</p>
          <div className={styles.headerDivider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerIcon}>◆</span>
            <span className={styles.dividerLine}></span>
          </div>
        </div>

        <form className={styles.form} onSubmit={login}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Identifiants</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email <span className={styles.required}>*</span></label>
                <input
                  required
                  className={styles.input}
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Mot de passe <span className={styles.required}>*</span></label>
                <input
                  required
                  className={styles.input}
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className={styles.submitSection}>
            {authErr && <div className={styles.errorMessage}>{authErr}</div>}
            <button className={styles.submitButton} type="submit">
              <span className={styles.buttonContent}>
                <span>Se connecter</span>
                <span className={styles.buttonIcon}>→</span>
              </span>
            </button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: '0.85rem', transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C5A059'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                Mot de passe oublié ?
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
