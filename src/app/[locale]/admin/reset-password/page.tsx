"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import styles from '../../devis/DevisPage.module.css'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const t = useTranslations('resetPassword')
  const locale = useLocale()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [redirectCount, setRedirectCount] = useState(5)

  // Redirect countdown after success
  useEffect(() => {
    if (status !== 'success') return
    if (redirectCount <= 0) {
      window.location.href = `/${locale}/admin`
      return
    }
    const timer = setTimeout(() => setRedirectCount(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [status, redirectCount])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')

    if (password.length < 6) {
      setStatus('error')
      setMessage(t('tooShort'))
      return
    }

    if (password !== confirmPassword) {
      setStatus('error')
      setMessage(t('mismatch'))
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setStatus('success')
        setMessage(t('successMsg'))
      } else {
        setStatus('error')
        setMessage(data.error || t('resetError'))
      }
    } catch {
      setStatus('error')
      setMessage(t('connectionError'))
    }
  }

  // No token provided
  if (!token) {
    return (
      <div className={styles.devisPage}>
        <div className={styles.devisContainer} style={{ maxWidth: '500px' }}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t('invalidLink')}</h1>
            <p className={styles.subtitle}>
              {t('invalidText')}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '28px'
            }}>✕</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 24px' }}>
              {t('retryText')}
            </p>
            <a
              href={`/${locale}/admin`}
              className={styles.submitButton}
              style={{ display: 'inline-block', maxWidth: '240px', textAlign: 'center', textDecoration: 'none' }}
            >
              <span className={styles.buttonContent}>
                <span>{t('backToLogin')}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (status === 'success') {
    return (
      <div className={styles.devisPage}>
        <div className={styles.devisContainer} style={{ maxWidth: '500px' }}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t('changed')}</h1>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', fontSize: '28px'
            }}>✓</div>
            <p style={{ color: '#22c55e', fontSize: '1rem', fontWeight: 600, margin: '0 0 8px' }}>
              {t('success')}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 24px', lineHeight: 1.6 }}>
              {message}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '0 0 20px' }}>
              {t('redirecting', { count: redirectCount })}
            </p>
            <a
              href={`/${locale}/admin`}
              className={styles.submitButton}
              style={{ display: 'inline-block', maxWidth: '240px', textAlign: 'center', textDecoration: 'none' }}
            >
              <span className={styles.buttonContent}>
                <span>{t('login')}</span>
                <span className={styles.buttonIcon}>→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className={styles.devisPage}>
      <div className={styles.devisContainer} style={{ maxWidth: '500px' }}>
        <div className={styles.header}>
          <div className={styles.headerBadge}><span>{t('badge')}</span></div>
          <h1 className={styles.title}>{t('newPassword')}</h1>
          <p className={styles.subtitle}>{t('chooseNew')}</p>
          <div className={styles.headerDivider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerIcon}>◆</span>
            <span className={styles.dividerLine}></span>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                {t('passwordLabel')} <span className={styles.required}>*</span>
              </label>
              <input
                required
                className={styles.input}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('minChars')}
                minLength={6}
              />
            </div>
            <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
              <label className={styles.label}>
                {t('confirmLabel')} <span className={styles.required}>*</span>
              </label>
              <input
                required
                className={styles.input}
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder={t('retypePassword')}
                minLength={6}
              />
            </div>
          </div>

          <div className={styles.submitSection}>
            {status === 'error' && (
              <div className={styles.errorMessage}>{message}</div>
            )}
            <button
              className={styles.submitButton}
              type="submit"
              disabled={status === 'submitting'}
            >
              <span className={styles.buttonContent}>
                <span>{status === 'submitting' ? t('changingPassword') : t('changePassword')}</span>
                <span className={styles.buttonIcon}>→</span>
              </span>
            </button>
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <a
                href={`/${locale}/admin`}
                style={{
                  color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
                  textDecoration: 'none', transition: 'color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C5A059'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {t('backToLogin')}
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
