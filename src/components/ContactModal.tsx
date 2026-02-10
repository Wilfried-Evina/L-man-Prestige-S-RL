"use client"
import React, { useState } from 'react'

const PHONE = '+41 76 471 91 30'
const EMAIL = 'info@lemanprestige.com'
const PHONE_TEL = 'tel:+41764719130'
const EMAIL_MAILTO = 'mailto:info@lemanprestige.com'

export default function ContactModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        display: 'inline-block', background: '#C5A059', color: '#051622',
        fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' as const,
        letterSpacing: '0.1em', padding: '12px 28px', borderRadius: '8px',
        border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
      }}>
        Nous contacter
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0d2137', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', width: '100%', maxWidth: '440px',
              overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>Nous contacter</h2>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                  fontSize: '24px', cursor: 'pointer', lineHeight: 1
                }}
              >×</button>
            </div>

            {/* Body */}
            <div style={{ padding: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', margin: '0 0 24px 0', lineHeight: 1.6 }}>
                Choisissez votre moyen de contact préféré. Notre équipe est à votre disposition.
              </p>

              {/* Phone option */}
              <a
                href={PHONE_TEL}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none', marginBottom: '12px', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(197,160,89,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(197,160,89,0.15)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Par téléphone</p>
                  <p style={{ margin: '4px 0 0', color: '#C5A059', fontSize: '0.85rem' }}>{PHONE}</p>
                </div>
              </a>

              {/* Email option */}
              <a
                href={EMAIL_MAILTO}
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(197,160,89,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(197,160,89,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(197,160,89,0.15)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Par email</p>
                  <p style={{ margin: '4px 0 0', color: '#C5A059', fontSize: '0.85rem' }}>{EMAIL}</p>
                </div>
              </a>
            </div>

            {/* Footer */}
            <div style={{
              padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', padding: '10px 24px', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.3s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
