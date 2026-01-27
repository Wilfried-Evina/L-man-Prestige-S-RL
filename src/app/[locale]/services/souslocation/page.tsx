'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function SouslocationServicePage() {
    const t = useTranslations('services.souslocation');
    const locale = useLocale();

    const features = [
        { label: 'Recherche', value: t('features.recherche') },
        { label: 'Visites', value: t('features.visites') },
        { label: 'Autorisation', value: t('features.autorisation') },
        { label: 'Contrat', value: t('features.contrat') },
        { label: 'Coordination', value: t('features.coordination') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/devis?service=souslocation`}
            imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2670&auto=format&fit=crop"
            disclaimer={t('disclaimer')}
        />
    );
}
