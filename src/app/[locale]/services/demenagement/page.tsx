'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function DemenagementServicePage() {
    const t = useTranslations('services.demenagement');
    const locale = useLocale();

    const features = [
        { label: 'Service', value: t('features.prive') },
        { label: 'Emballage', value: t('features.emballage') },
        { label: 'Montage', value: t('features.montage') },
        { label: 'Mise en place', value: t('features.miseenplace') },
        { label: 'Débarras', value: t('features.debarras') },
        { label: 'Déchetterie', value: t('features.dechetterie') },
        { label: 'Clé en main', value: t('features.cleenmain') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/devis?service=demenagement`}
            imageSrc="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=2670&auto=format&fit=crop"
        />
    );
}
