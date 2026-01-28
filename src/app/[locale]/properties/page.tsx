'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import propertiesData from '@/data/properties.json';
import { PropertyCard } from '@/components/molecules/PropertyCard';
import PropertyFilters, { FilterValues } from '@/components/molecules/PropertyFilters';

export default function PropertiesPage() {
    const t = useTranslations('properties');
    const tFilters = useTranslations('filters');

    const [filters, setFilters] = useState<FilterValues>({
        transaction: 'all',
        city: '',
        rooms: '',
        budgetMin: '',
        budgetMax: '',
        status: 'all',
    });

    // Extraire les villes uniques
    const cities = useMemo(() => {
        const citySet = new Set(propertiesData.map((p) => p.city));
        return Array.from(citySet).sort();
    }, []);

    const parsePrice = (priceString: string): number => {
        const cleanString = priceString.replace(/CHF|\/ mois|,|\s/g, '');
        return parseInt(cleanString, 10) || 0;
    };

    const filteredProperties = propertiesData.filter((property) => {
        // Filter by transaction type
        if (filters.transaction !== 'all' && property.type !== filters.transaction) {
            return false;
        }

        // Filter by city
        if (filters.city && property.city !== filters.city) {
            return false;
        }

        // Filter by rooms
        if (filters.rooms) {
            const filterRooms = filters.rooms === '8+' ? 8 : parseInt(filters.rooms, 10);
            if (filters.rooms === '8+') {
                if (property.rooms < 8) return false;
            } else {
                if (property.rooms !== filterRooms) return false;
            }
        }

        // Filter by status
        if (filters.status !== 'all' && property.status !== filters.status) {
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
        city: tFilters('city'),
        cityPlaceholder: tFilters('cityPlaceholder'),
        rooms: tFilters('rooms'),
        roomsPlaceholder: tFilters('roomsPlaceholder'),
        budget: tFilters('budget'),
        budgetMin: tFilters('budgetMin'),
        budgetMax: tFilters('budgetMax'),
        status: tFilters('status'),
        statusAll: tFilters('statusAll'),
        statusAvailable: tFilters('statusAvailable'),
        statusReserved: tFilters('statusReserved'),
        statusRented: tFilters('statusRented'),
    };

    return (
        <div className="min-h-screen bg-[#051622] pt-24 sm:pt-28 pb-16 sm:pb-24 md:pb-32">
            {/* Header Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                <div className="flex flex-col gap-6 sm:gap-8 w-full">
                    <div className="text-center sm:text-left">
                        <span className="text-[#C5A059] text-xs uppercase tracking-[0.3em] font-medium mb-3 block">
                            {t('subtitle')}
                        </span>
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            {t('title')}
                        </h1>
                    </div>

                    {/* Filters */}
                    <div className="w-full">
                        <PropertyFilters
                            translations={filterTranslations}
                            onFilterChange={setFilters}
                            cities={cities}
                        />
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between">
                        <p className="text-white/60 text-sm">
                            {filteredProperties.length} {filteredProperties.length === 1 ? t('resultSingular') : t('resultPlural')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} property={property as any} />
                    ))}
                    {filteredProperties.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <p className="text-white/60 text-lg mb-2">
                                {t('noResults')}
                            </p>
                            <p className="text-white/40 text-sm">
                                {t('noResultsHint')}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
