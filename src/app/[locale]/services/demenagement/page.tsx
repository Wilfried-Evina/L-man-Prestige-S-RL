'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/atoms/Button';
import styles from '../ServiceHero.module.css';

export default function DemenagementServicePage() {
    const t = useTranslations('services.demenagement');
    const ts = useTranslations('servicePages');
    const locale = useLocale();

    const offerings = [
        { title: t('features.prive'), desc: ts('demenagement.offering1_desc') },
        { title: t('features.emballage'), desc: ts('demenagement.offering2_desc') },
        { title: t('features.montage'), desc: ts('demenagement.offering3_desc') },
    ];

    const benefits = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M3 7h18M3 12h12M3 17h18" />
                </svg>
            ),
            title: ts('demenagement.benefit1_title'),
            desc: ts('demenagement.benefit1_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" />
                </svg>
            ),
            title: ts('demenagement.benefit2_title'),
            desc: ts('demenagement.benefit2_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="36" height="36" aria-hidden>
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            ),
            title: ts('demenagement.benefit3_title'),
            desc: ts('demenagement.benefit3_desc')
        },
    ];

    return (
        <div>
            <section className={styles.heroSection}>
                <div className={styles.heroBackgroundImage}>
                    <Image
                        src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1920&q=80"
                        alt="Déménagement et logistique"
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
                    <Link href={`/${locale}/devis?service=demenagement`} className={styles.heroCta}>{t('cta')}</Link>
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
                    <h2 className={styles.benefitsMainTitle}>{ts('demenagement.whyTitle')}</h2>
                    <p className={styles.benefitsSubtitle}>{ts('demenagement.whySubtitle')}</p>
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
                    <p className={styles.ctaDescription}>{ts('demenagement.ctaDesc')}</p>
                    <div className={styles.ctaButtons}>
                        <Link href={`/${locale}/devis?service=demenagement`}>
                            <Button variant="primary">{t('cta')}</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
