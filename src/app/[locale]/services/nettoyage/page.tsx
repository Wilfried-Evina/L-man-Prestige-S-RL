'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';

export default function NettoyageServicePage() {
    const t = useTranslations('services.nettoyage');
    const locale = useLocale();

    const features = [
        { label: 'Fin de bail', value: t('features.finbail') },
        { label: 'Fin de chantier', value: t('features.finchantier') },
        { label: 'Vitres', value: t('features.vitres') },
        { label: 'Entretien', value: t('features.entretien') },
        { label: 'Désinfection', value: t('features.desinfection') },
    ];

    return (
        <ServicePageTemplate
            title={t('title')}
            subtitle={t('subtitle')}
            description={t('description')}
            features={features}
            ctaLabel={t('cta')}
            ctaHref={`/${locale}/devis?service=nettoyage`}
            imageSrc="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2670&auto=format&fit=crop"
        />
    );
}
