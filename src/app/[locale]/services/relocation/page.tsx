'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function RelocationServicePage() {
    const t = useTranslations('services.relocation');
    const locale = useLocale();

    const features = [
        { label: 'Recherche', value: t('features.recherche') },
        { label: 'Présélection', value: t('features.preselection') },
        { label: 'Visites', value: t('features.visites') },
        { label: 'Dossier', value: t('features.dossier') },
        { label: 'Mise en relation', value: t('features.miseenrelation') },
        { label: 'Coordination', value: t('features.coordination') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/services/relocation/recherche`}
            imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2670&auto=format&fit=crop"
            disclaimer={t('disclaimer')}
        />
    );
}
