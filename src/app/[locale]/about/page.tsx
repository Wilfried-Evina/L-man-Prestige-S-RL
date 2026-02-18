'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    const t = useTranslations('about');
    const locale = useLocale();

    return (
        <div style={{ background: '#051622', marginTop: '-64px', paddingTop: 0 }}>

            {/* ===================== HERO ===================== */}
            <section style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}>
                {/* Background image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                        alt="Bureau Léman Prestige"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        unoptimized
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to bottom, rgba(5,22,34,0.92) 0%, rgba(5,22,34,0.80) 50%, rgba(5,22,34,0.95) 100%)',
                    }} />
                </div>

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 1,
                    width: '100%', maxWidth: '900px',
                    margin: '0 auto', padding: '160px 24px 100px',
                    textAlign: 'center',
                }}>
                    {/* Badge removed as requested */}

                    <h1 style={{
                        color: '#ffffff', fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                        fontWeight: 800, lineHeight: 1.1, marginBottom: '20px',
                        fontFamily: 'var(--font-heading)',
                    }}>
                        {t('title')}
                    </h1>

                    <p style={{
                        color: '#C5A059', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
                        fontWeight: 300, marginBottom: '20px',
                    }}>
                        {t('subtitle')}
                    </p>

                    <p style={{
                        color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                        lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 48px',
                    }}>
                        {t('description')}
                    </p>

                    {/* Buttons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                        <Link href={`/${locale}/devis`} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '16px 36px', background: '#C5A059', color: '#051622',
                            fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' as const,
                            letterSpacing: '0.12em', borderRadius: '10px', textDecoration: 'none',
                            boxShadow: '0 8px 24px rgba(197,160,89,0.3)',
                            transition: 'all 0.3s',
                        }}>
                            {t('requestQuote')}
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <a href="tel:+41765232431" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '16px 36px', background: 'transparent', color: '#ffffff',
                            fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' as const,
                            letterSpacing: '0.12em', borderRadius: '10px', textDecoration: 'none',
                            border: '2px solid rgba(255,255,255,0.3)',
                            transition: 'all 0.3s',
                        }}>
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +41 76 523 24 31
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats section removed as requested */}

            {/* ===================== NOS VALEURS ===================== */}
            <section style={{ padding: '100px 24px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{
                            color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 800, marginBottom: '20px', fontFamily: 'var(--font-heading)',
                        }}>
                            {t('values.title')}
                        </h2>
                        <div style={{ width: '80px', height: '3px', background: '#C5A059', margin: '0 auto', borderRadius: '99px' }} />
                    </div>

                    {/* Cards */}
                    <div className="about-values-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '32px',
                    }}>
                        {[
                            {
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                                title: t('values.proximity.title'),
                                desc: t('values.proximity.description'),
                            },
                            {
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
                                title: t('values.quality.title'),
                                desc: t('values.quality.description'),
                            },
                            {
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
                                title: t('values.transparency.title'),
                                desc: t('values.transparency.description'),
                            },
                        ].map((v, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '20px', padding: '48px 32px', textAlign: 'center',
                                transition: 'all 0.3s',
                            }}>
                                {/* Numéro */}
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%', background: '#C5A059',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#051622', fontWeight: 800, fontSize: '18px',
                                    margin: '0 auto 24px',
                                }}>
                                    {i + 1}
                                </div>

                                {/* Icon */}
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '16px',
                                    background: 'rgba(197,160,89,0.12)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 24px',
                                }}>
                                    <svg width="32" height="32" fill="none" stroke="#C5A059" viewBox="0 0 24 24">
                                        {v.icon}
                                    </svg>
                                </div>

                                <h3 style={{
                                    color: '#ffffff', fontSize: '1.35rem', fontWeight: 700,
                                    marginBottom: '12px', fontFamily: 'var(--font-heading)',
                                }}>
                                    {v.title}
                                </h3>

                                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== MISSION ===================== */}
            <section style={{
                padding: '100px 24px',
                background: 'linear-gradient(180deg, #051622 0%, #0a1f2e 100%)',
            }}>
                <div className="about-mission-grid" style={{
                    maxWidth: '1100px', margin: '0 auto',
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: '64px', alignItems: 'center',
                }}>
                    {/* Image */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'relative', aspectRatio: '4/3', borderRadius: '20px', overflow: 'hidden',
                        }}>
                            <Image
                                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2674&auto=format&fit=crop"
                                alt="Notre équipe"
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                        {/* Floating card */}
                        <div className="about-floating-card" style={{
                            position: 'absolute', bottom: '-20px', right: '-20px',
                            background: '#C5A059', borderRadius: '16px', padding: '24px 28px',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
                        }}>
                            <div style={{ color: '#051622', fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>100%</div>
                            <div style={{ color: 'rgba(5,22,34,0.7)', fontSize: '0.85rem', fontWeight: 600, marginTop: '4px' }}>{t('mission_satisfaction')}</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <span style={{
                            display: 'inline-block', color: '#C5A059', fontSize: '13px',
                            textTransform: 'uppercase' as const, letterSpacing: '0.3em', fontWeight: 600, marginBottom: '16px',
                        }}>
                            {t('mission_label')}
                        </span>
                        <h2 style={{
                            color: '#ffffff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                            fontWeight: 800, lineHeight: 1.2, marginBottom: '24px',
                            fontFamily: 'var(--font-heading)',
                        }}>
                            {t('mission_title')}
                        </h2>
                        <p style={{
                            color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem',
                            lineHeight: 1.8, marginBottom: '36px',
                        }}>
                            {t('mission_text')}
                        </p>

                        {/* Features */}
                        <div className="about-features-grid" style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px',
                        }}>
                            {(t.raw('mission_features') as string[]).map((item: string, i: number) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%', background: '#C5A059',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                        <svg width="14" height="14" fill="#051622" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link href={`/${locale}/services`} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            color: '#C5A059', fontWeight: 700, fontSize: '0.95rem',
                            textDecoration: 'none', letterSpacing: '0.05em',
                        }}>
                            {t('discover_services')}
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== CONTACT ===================== */}
            <section style={{ padding: '100px 24px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{
                            color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 800, marginBottom: '20px', fontFamily: 'var(--font-heading)',
                        }}>
                            {t('contact_title')}
                        </h2>
                        <div style={{ width: '80px', height: '3px', background: '#C5A059', margin: '0 auto', borderRadius: '99px' }} />
                    </div>

                    {/* Contact cards */}
                    <div className="about-contact-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px', marginBottom: '64px',
                    }}>
                        {[
                            {
                                href: 'tel:+41765232431',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                                label: t('contact_phone'),
                                value: '+41 76 523 24 31',
                            },
                            {
                                href: 'mailto:info@lemanprestige.com',
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                                label: t('contact_email'),
                                value: 'info@lemanprestige.com',
                            },
                            {
                                href: undefined,
                                icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                                label: t('contact_address'),
                                value: 'Rue de la Servette 11, 1201 Genève',
                            },
                        ].map((card, i) => {
                            const inner = (
                                <div style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '20px', padding: '40px 24px', textAlign: 'center',
                                    transition: 'all 0.3s', height: '100%',
                                }}>
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '50%',
                                        background: 'rgba(197,160,89,0.12)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 20px',
                                    }}>
                                        <svg width="28" height="28" fill="none" stroke="#C5A059" viewBox="0 0 24 24">
                                            {card.icon}
                                        </svg>
                                    </div>
                                    <h3 style={{
                                        color: '#ffffff', fontSize: '1.2rem', fontWeight: 700,
                                        marginBottom: '8px', fontFamily: 'var(--font-heading)',
                                    }}>
                                        {card.label}
                                    </h3>
                                    <p style={{ color: '#C5A059', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
                                        {card.value}
                                    </p>
                                </div>
                            );
                            return card.href ? (
                                <a key={i} href={card.href} style={{ textDecoration: 'none' }}>{inner}</a>
                            ) : (
                                <div key={i}>{inner}</div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.18) 50%, rgba(197,160,89,0.08) 100%)',
                        border: '1px solid rgba(197,160,89,0.3)',
                        borderRadius: '24px', padding: '56px 40px', textAlign: 'center',
                    }}>
                        <h3 style={{
                            color: '#ffffff', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                            fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-heading)',
                        }}>
                            {t('cta_title')}
                        </h3>
                        <p style={{
                            color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem',
                            lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 36px',
                        }}>
                            {t('cta_text')}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                            <Link href={`/${locale}/devis`} style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                padding: '16px 36px', background: '#C5A059', color: '#051622',
                                fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' as const,
                                letterSpacing: '0.12em', borderRadius: '10px', textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(197,160,89,0.3)',
                            }}>
                                {t('cta_quote')}
                            </Link>
                            <a href="https://wa.me/41765232431" target="_blank" rel="noopener noreferrer" style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                padding: '16px 36px', background: '#25D366', color: '#ffffff',
                                fontWeight: 700, fontSize: '14px', textTransform: 'uppercase' as const,
                                letterSpacing: '0.12em', borderRadius: '10px', textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                            }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== RESPONSIVE STYLES ===================== */}
            <style>{`
                @media (max-width: 768px) {
                    .about-values-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-mission-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    .about-features-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-contact-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .about-floating-card {
                        position: relative !important;
                        bottom: auto !important;
                        right: auto !important;
                        margin-top: 16px !important;
                        text-align: center !important;
                    }
                }
                @media (min-width: 769px) and (max-width: 1024px) {
                    .about-values-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .about-contact-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
            `}</style>
        </div>
    );
}
