'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function TravauxServicePage() {
    const t = useTranslations('services.travaux');
    const locale = useLocale();

    const features = [
        { label: 'Rénovation', value: t('features.renovation') },
        { label: 'Peinture', value: t('features.peinture') },
        { label: 'Menuiserie', value: t('features.menuiserie') },
        { label: 'Plomberie', value: t('features.plomberie') },
        { label: 'Coordination', value: t('features.coordination') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/devis?service=travaux`}
            imageSrc="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2670&auto=format&fit=crop"
        />
    );
}
