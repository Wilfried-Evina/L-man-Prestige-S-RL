'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PropertyCard } from '@/components/molecules/PropertyCard';
import PropertyFilters, { FilterValues } from '@/components/molecules/PropertyFilters';

type Property = {
    id: string;
    title: string;
    location: string;
    price: string;
    type: string;
    sqm: number;
    rooms: number;
    baths: number;
    image: string;
    description?: string;
};

export default function PropertiesPage() {
    const t = useTranslations('properties');
    const tFilters = useTranslations('filters');

    const [propertiesData, setPropertiesData] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState<FilterValues>({
        transaction: 'all',
        location: '',
        budgetMin: '',
        budgetMax: '',
    });

    useEffect(() => {
        fetch('/api/properties')
            .then(res => res.json())
            .then(data => {
                setPropertiesData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const parsePrice = (priceString: string): number => {
        // Remove 'CHF', '/ mois', commas, and whitespace
        const cleanString = priceString.replace(/CHF|\/ mois|,|\s/g, '');
        return parseInt(cleanString, 10) || 0;
    };

    const filteredProperties = propertiesData.filter((property) => {
        // Filter by transaction type
        if (filters.transaction !== 'all' && property.type !== filters.transaction) {
            return false;
        }

        // Filter by location
        if (
            filters.location &&
            !property.location.toLowerCase().includes(filters.location.toLowerCase())
        ) {
            return false;
        }

        const propertyPrice = parsePrice(property.price);

        // Filter by budget min
        if (filters.budgetMin) {
            const minPrice = parseInt(filters.budgetMin, 10);
            if (!isNaN(minPrice) && propertyPrice < minPrice) {
                return false;
            }
        }

        // Filter by budget max
        if (filters.budgetMax) {
            const maxPrice = parseInt(filters.budgetMax, 10);
            if (!isNaN(maxPrice) && propertyPrice > maxPrice) {
                return false;
            }
        }

        return true;
    });

    const filterTranslations = {
        transaction: tFilters('transaction'),
        sale: tFilters('sale'),
        rent: tFilters('rent'),
        all: tFilters('all'),
        location: tFilters('location'),
        locationPlaceholder: tFilters('locationPlaceholder'),
        budget: tFilters('budget'),
        budgetMin: tFilters('budgetMin'),
        budgetMax: tFilters('budgetMax'),
    };

    return (
        <div className="min-h-screen bg-[#051622] pt-16 sm:pt-20 pb-16 sm:pb-24 md:pb-32">
            {/* Header Section */}
            <section style={{ marginLeft: '22px', marginRight: '20px' }}>
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">
                    <div className="max-w-4xl">
                        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight leading-tight">
                            {t('title')}
                        </h1>
                    </div>

                    {/* Filters */}
                    <div className="w-full">
                        <PropertyFilters
                            translations={filterTranslations}
                            onFilterChange={setFilters}
                        />
                    </div>
                </div>
            </section>

            {/* Spacer */}
            <div className="h-8 sm:h-12 md:h-16 w-full" />

            {/* Grid Section */}
            <section style={{ marginLeft: '18px', marginRight: '20px' }}>
                {loading ? (
                    <p className="text-white/60 text-center py-20">Chargement...</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                    {filteredProperties.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-white/60 text-lg">
                                {t('noResults')}
                            </p>
                        </div>
                    )}
                </div>
                )}
            </section>
        </div>
    );
}
