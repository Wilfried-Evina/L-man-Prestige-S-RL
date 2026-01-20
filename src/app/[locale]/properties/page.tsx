import React from 'react';
import { useTranslations } from 'next-intl';
import propertiesData from '@/data/properties.json';
import { PropertyCard } from '@/components/molecules/PropertyCard';

export default function PropertiesPage() {
    const t = useTranslations('properties');

    return (
        <div className="min-h-screen bg-[#051622] pt-96 pb-32">
            {/* Header Section */}
            <section className="max-w-[1800px] mx-auto px-12 mb-16">
                <div className="flex flex-col gap-4 max-w-4xl">
                    <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        {t('title')}
                    </h1>
                </div>
            </section>

            {/* Grid Section */}
            <section className="max-w-[1800px] mx-auto px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {propertiesData.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </section>
        </div>
    );
}
