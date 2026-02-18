'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/atoms/Button';
import styles from '../ServiceHero.module.css';

export default function NettoyageServicePage() {
    const t = useTranslations('services.nettoyage');
    const ts = useTranslations('servicePages');
    const locale = useLocale();

    const offerings = [
        { title: t('features.finbail'), desc: ts('nettoyage.offering1_desc') },
        { title: t('features.finchantier'), desc: ts('nettoyage.offering2_desc') },
        { title: t('features.vitres'), desc: ts('nettoyage.offering3_desc') },
    ];

    const benefits = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
                </svg>
            ),
            title: ts('nettoyage.benefit1_title'),
            desc: ts('nettoyage.benefit1_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M20.4 8.6c-1.6-1.6-4.4-1.6-6 0l-1.4 1.4-1.4-1.4c-1.6-1.6-4.4-1.6-6 0-1.6 1.6-1.6 4.4 0 6l7.4 7.4 7.4-7.4c1.6-1.6 1.6-4.4 0-6z" />
                </svg>
            ),
            title: ts('nettoyage.benefit2_title'),
            desc: ts('nettoyage.benefit2_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            ),
            title: ts('nettoyage.benefit3_title'),
            desc: ts('nettoyage.benefit3_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M3 7h18M3 12h12M3 17h18" />
                </svg>
            ),
            title: ts('nettoyage.benefit4_title'),
            desc: ts('nettoyage.benefit4_desc')
        },
    ];

    return (
        <div>
            <section className={styles.heroSection}>
                <div className={styles.heroBackgroundImage}>
                    <Image
                        src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1920&q=80"
                        alt="Nettoyage professionnel"
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
                    <Link href={`/${locale}/devis?service=nettoyage`} className={styles.heroCta}>{t('cta')}</Link>
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
                    <h2 className={styles.benefitsMainTitle}>{ts('nettoyage.whyTitle')}</h2>
                    <p className={styles.benefitsSubtitle}>{ts('nettoyage.whySubtitle')}</p>
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
                    <p className={styles.ctaDescription}>{ts('nettoyage.ctaDesc')}</p>
                    <div className={styles.ctaButtons}>
                        <Link href={`/${locale}/devis?service=nettoyage`}>
                            <Button variant="primary">{t('cta')}</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
