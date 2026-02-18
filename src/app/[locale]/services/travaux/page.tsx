'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import Button from '@/components/atoms/Button';
import styles from '../ServiceHero.module.css';

export default function TravauxServicePage() {
    const t = useTranslations('services.travaux');
    const ts = useTranslations('servicePages');
    const locale = useLocale();

    const offerings = [
        { title: t('features.renovation'), desc: ts('travaux.offering1_desc') },
        { title: t('features.peinture'), desc: ts('travaux.offering2_desc') },
        { title: t('features.menuiserie'), desc: ts('travaux.offering3_desc') },
    ];

    const benefits = [
        { icon: '✦', title: ts('travaux.benefit1_title'), desc: ts('travaux.benefit1_desc') },
        { icon: '✨', title: ts('travaux.benefit2_title'), desc: ts('travaux.benefit2_desc') },
        { icon: '✓', title: ts('travaux.benefit3_title'), desc: ts('travaux.benefit3_desc') },
        { icon: '◆', title: ts('travaux.benefit4_title'), desc: ts('travaux.benefit4_desc') },
    ];

    return (
        <div>
            {/* Hero */}
            <section className={styles.heroSection}>
                <div className={styles.heroBackgroundImage}>
                    <Image
                        src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1920&q=80"
                        alt="Travaux et rénovation"
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
                    <Link href={`/${locale}/devis?service=travaux`} className={styles.heroCta}>{t('cta')}</Link>
                </div>
            </section>

            {/* Offering Cards */}
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

            {/* Benefits */}
            <section className={styles.benefitsSection}>
                <div className={styles.benefitsTitleSection}>
                    <h2 className={styles.benefitsMainTitle}>{ts('travaux.whyTitle')}</h2>
                    <p className={styles.benefitsSubtitle}>{ts('travaux.whySubtitle')}</p>
                </div>
                <div className={styles.benefitsGrid}>
                    {benefits.map((benefit, i) => (
                        <div key={i} className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>{benefit.icon}</div>
                            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                            <p className={styles.benefitDescription}>{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>{ts('ctaTitle')}</h2>
                    <p className={styles.ctaDescription}>{ts('travaux.ctaDesc')}</p>
                    <div className={styles.ctaButtons}>
                        <Link href={`/${locale}/devis?service=travaux`}>
                            <Button variant="primary">{t('cta')}</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
