'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/atoms/Button';
import styles from '../ServiceHero.module.css';

export default function AssurancesServicePage() {
    const t = useTranslations('services.assurances');
    const ts = useTranslations('servicePages');
    const locale = useLocale();

    const offerings = [
        { title: t('features.lamal'), desc: ts('assurances.offering1_desc') },
        { title: t('features.prevoyance'), desc: ts('assurances.offering2_desc') },
        { title: t('features.comparaison'), desc: ts('assurances.offering3_desc') },
    ];

    const benefits = [
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('assurances.benefit1_title'),
            desc: ts('assurances.benefit1_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.5 13.5l1.8 1.8 4.2-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('assurances.benefit2_title'),
            desc: ts('assurances.benefit2_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('assurances.benefit3_title'),
            desc: ts('assurances.benefit3_desc')
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: ts('assurances.benefit4_title'),
            desc: ts('assurances.benefit4_desc')
        }
    ];

    return (
        <div>
            <section className={styles.heroSection}>
                <div className={styles.heroBackgroundImage}>
                    <Image
                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
                        alt="Assurances et prévoyance"
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
                    <Link href={`/${locale}/devis?service=assurances`} className={styles.heroCta}>{t('cta')}</Link>
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
                    <h2 className={styles.benefitsMainTitle}>{ts('assurances.whyTitle')}</h2>
                    <p className={styles.benefitsSubtitle}>{ts('assurances.whySubtitle')}</p>
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
                    <p className={styles.ctaDescription}>{ts('assurances.ctaDesc')}</p>
                    <div className={styles.ctaButtons}>
                        <Link href={`/${locale}/devis?service=assurances`}>
                            <Button variant="primary">{t('cta')}</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
