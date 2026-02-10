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
          </div>
        </form>
      </div>
    </div>
  )
}
