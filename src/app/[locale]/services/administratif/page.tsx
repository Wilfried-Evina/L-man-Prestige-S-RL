'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function AdministratifServicePage() {
    const t = useTranslations('services.administratif');
    const locale = useLocale();

    const features = [
        { label: 'Logement', value: t('features.logement') },
        { label: 'Services', value: t('features.services') },
        { label: 'Suivi', value: t('features.suivi') },
        { label: 'Documents', value: t('features.documents') },
        { label: 'Assistance', value: t('features.assistance') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/devis?service=administratif`}
            imageSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2670&auto=format&fit=crop"
        />
    );
}
