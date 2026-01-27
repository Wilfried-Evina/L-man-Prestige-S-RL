'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function AssurancesServicePage() {
    const t = useTranslations('services.assurances');
    const locale = useLocale();

    const features = [
        { label: 'LAMal', value: t('features.lamal') },
        { label: 'Prévoyance', value: t('features.prevoyance') },
        { label: 'Comparaison', value: t('features.comparaison') },
        { label: 'Accompagnement', value: t('features.accompagnement') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/devis?service=assurances`}
            imageSrc="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop"
            disclaimer={t('disclaimer')}
        />
    );
}
