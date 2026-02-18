"use client"
import React, { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

const PHONE = '+41 76 523 24 31'
const EMAIL = 'info@lemanprestige.com'
const PHONE_TEL = 'tel:+41765232431'
const WHATSAPP_NUMBER = '41765232431'

interface ContactModalProps {
  propertyTitle?: string
  propertyLocation?: string
  propertyRooms?: number | string
  propertyPrice?: string
  propertyType?: string
  propertyId?: string
}

export default function ContactModal({ propertyTitle, propertyLocation, propertyRooms, propertyPrice, propertyType, propertyId }: ContactModalProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('contactModal')
  const locale = useLocale()

  // Build pre-filled message for WhatsApp and email
  const hasProperty = !!propertyTitle
  const isRental = propertyType === 'rent'
  const propertyLine = hasProperty
    ? `${propertyTitle}${propertyLocation ? ` – ${propertyLocation}` : ''}${propertyRooms ? ` – ${propertyRooms} ${t('rooms')}` : ''}${propertyPrice ? ` – ${propertyPrice}` : ''}`
    : ''

  // Build the property page URL
  const propertyUrl = hasProperty && propertyId
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://lemanprestige.com'}/${locale}/properties/${propertyId}`
    : ''

  const whatsappText = hasProperty
    ? encodeURIComponent(t('whatsappProperty', { property: propertyLine, url: propertyUrl }))
    : encodeURIComponent(t('whatsappGeneral'))
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`

  // Email pre-fill with client's document checklist for rentals
  const emailSubject = hasProperty
    ? encodeURIComponent(t('emailSubjectProperty', { title: propertyTitle }))
    : encodeURIComponent(t('emailSubjectGeneral'))

  const rentalEmailBody = hasProperty && isRental
    ? encodeURIComponent(
`Bonjour,

Je suis intéressé(e) par le bien suivant :
${propertyLine}

🔗 Voir l'annonce : ${propertyUrl}

Pour faciliter ma demande, voici mes informations :

1. Nom et prénom : 
2. Type d'appartement souhaité : ${propertyTitle} – ${propertyLocation || ''} – ${propertyRooms || ''} pièces – ${propertyPrice || ''}
3. Type de permis de séjour : 
4. Budget maximum : 

Je joins à cet email les documents suivants en PDF :
• Les trois dernières fiches de salaire
• Une attestation de l'employeur
• Une copie de mon permis de séjour
• Une attestation de poursuites récente
• En cas de garant : ses fiches de salaire, une attestation de l'employeur, une copie de sa pièce d'identité ou de son permis, une attestation de poursuites

Cordialement`
    )
    : hasProperty
      ? encodeURIComponent(
`Bonjour,

Je suis intéressé(e) par le bien suivant :
${propertyLine}

🔗 Voir l'annonce : ${propertyUrl}

Merci de me recontacter.

Cordialement`
      )
      : ''
  const emailHref = `mailto:${EMAIL}?subject=${emailSubject}${rentalEmailBody ? `&body=${rentalEmailBody}` : ''}`

  return (
    <>
      <button onClick={() => setOpen(true)} style={{
        display: 'inline-block', background: '#C5A059', color: '#051622',
        fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' as const,
        letterSpacing: '0.1em', padding: '12px 28px', borderRadius: '8px',
        border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
      }}>
        {t('button')}
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
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{t('title')}</h2>
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
                {t('subtitle')}
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
                  <p style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{t('byPhone')}</p>
                  <p style={{ margin: '4px 0 0', color: '#C5A059', fontSize: '0.85rem' }}>{PHONE}</p>
                </div>
              </a>

              {/* WhatsApp option */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  textDecoration: 'none', marginBottom: '12px', transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(37,211,102,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(37,211,102,0.15)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{t('byWhatsApp')}</p>
                  <p style={{ margin: '4px 0 0', color: '#25D366', fontSize: '0.85rem' }}>{PHONE}</p>
                </div>
              </a>

              {/* Email option */}
              <a
                href={emailHref}
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
                  <p style={{ margin: 0, color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{t('byEmail')}</p>
                  <p style={{ margin: '4px 0 0', color: '#C5A059', fontSize: '0.85rem' }}>{EMAIL}</p>
                </div>
              </a>

              {/* Commission info for rentals */}
              {hasProperty && isRental && (
                <div style={{
                  marginTop: '16px', padding: '14px 16px', borderRadius: '12px',
                  background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.15)',
                }}>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    📌 <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{t('commission')}</strong> — {t('commissionText')}
                  </p>
                </div>
              )}
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
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
