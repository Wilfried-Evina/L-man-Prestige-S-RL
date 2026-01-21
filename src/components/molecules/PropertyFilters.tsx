'use client';

import React, { useState } from 'react';
import Input from '@/components/atoms/Input';

export interface FilterValues {
    transaction: 'sale' | 'rent' | 'all';
    location: string;
    budgetMin: string;
    budgetMax: string;
}

interface PropertyFiltersProps {
    onFilterChange?: (filters: FilterValues) => void;
    translations: {
        transaction: string;
        sale: string;
        rent: string;
        all: string;
        location: string;
        locationPlaceholder: string;
        budget: string;
        budgetMin: string;
        budgetMax: string;
    };
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
    onFilterChange,
    translations,
}) => {
    const [filters, setFilters] = useState<FilterValues>({
        transaction: 'all',
        location: '',
        budgetMin: '',
        budgetMax: '',
    });

    const handleFilterChange = (
        key: keyof FilterValues,
        value: string
    ) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    return (
        <div className="w-full bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Transaction Type */}
                <div className="flex flex-col gap-2 w-full group">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 group-focus-within:text-[#C5A059] transition-colors duration-500">
                        {translations.transaction}
                    </label>
                    <select
                        value={filters.transaction}
                        onChange={(e) =>
                            handleFilterChange('transaction', e.target.value)
                        }
                        className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:border-[#C5A059] focus:outline-none transition-all duration-700 cursor-pointer"
                    >
                        <option value="all" className="bg-black text-white">
                            {translations.all}
                        </option>
                        <option value="sale" className="bg-black text-white">
                            {translations.sale}
                        </option>
                        <option value="rent" className="bg-black text-white">
                            {translations.rent}
                        </option>
                    </select>
                </div>

                {/* Location */}
                <Input
                    label={translations.location}
                    placeholder={translations.locationPlaceholder}
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                />

                {/* Budget Min */}
                <Input
                    label={translations.budgetMin}
                    type="number"
                    placeholder="0"
                    value={filters.budgetMin}
                    onChange={(e) => handleFilterChange('budgetMin', e.target.value)}
                />

                {/* Budget Max */}
                <Input
                    label={translations.budgetMax}
                    type="number"
                    placeholder="∞"
                    value={filters.budgetMax}
                    onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
                />
            </div>
        </div>
    );
};

export default PropertyFilters;
