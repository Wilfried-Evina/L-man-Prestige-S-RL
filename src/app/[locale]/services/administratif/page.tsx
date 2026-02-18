'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/atoms/Button';
import styles from '../ServiceHero.module.css';

export default function AdministratifServicePage() {
    const t = useTranslations('services.administratif');
    const ts = useTranslations('servicePages');
    const locale = useLocale();

    const offerings = [
        { title: t('features.logement'), desc: ts('administratif.offering1_desc') },
        { title: t('features.services'), desc: ts('administratif.offering2_desc') },
        { title: t('features.documents'), desc: ts('administratif.offering3_desc') },
    ];

    const benefits = [
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('administratif.benefit1_title'),
            desc: ts('administratif.benefit1_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('administratif.benefit2_title'),
            desc: ts('administratif.benefit2_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('administratif.benefit3_title'),
            desc: ts('administratif.benefit3_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18v-6a9 9 0 0118 0v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 18v2a3 3 0 006 0v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('administratif.benefit4_title'),
            desc: ts('administratif.benefit4_desc')
        }
    ];

    return (
        <div>
            <section className={styles.heroSection}>
                <div className={styles.heroBackgroundImage}>
                    <Image
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
                        alt="Accompagnement administratif"
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroOrb1}></div>
                <div className={styles.heroOrb2}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t('title')}</h1>
                    <p className={styles.heroSubtitle}>{t('subtitle')}</p>
                    <Link href={`/${locale}/devis?service=administratif`} className={styles.heroCta}>{t('cta')}</Link>
                </div>
            </section>

            <section className={styles.offeringSection}>
                <div className={styles.offeringGrid}>
                    {offerings.map((offering, i) => (
                        <div key={i} className={styles.offeringCard}>
                            <div className={styles.offeringNumber}>{i + 1}</div>
                            <h3 className={styles.offeringTitle}>{offering.title}</h3>
                            <p className={styles.offeringDescription}>{offering.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.benefitsSection}>
                <div className={styles.benefitsTitleSection}>
                    <h2 className={styles.benefitsMainTitle}>{ts('administratif.whyTitle')}</h2>
                    <p className={styles.benefitsSubtitle}>{ts('administratif.whySubtitle')}</p>
                </div>
                <div className={styles.benefitsGrid}>
                    {benefits.map((b, i) => (
                        <div key={i} className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>{b.icon}</div>
                            <h3 className={styles.benefitTitle}>{b.title}</h3>
                            <p className={styles.benefitDescription}>{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>{ts('ctaTitle')}</h2>
                    <p className={styles.ctaDescription}>{ts('administratif.ctaDesc')}</p>
                    <div className={styles.ctaButtons}>
                        <Link href={`/${locale}/devis?service=administratif`}>
                            <Button variant="primary">{t('cta')}</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
