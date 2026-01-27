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
        <div className="w-full p-4 sm:p-6 md:p-8 rounded-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {/* Transaction Type */}
                <div className="flex flex-col gap-2 w-full group">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-white group-focus-within:text-[#C5A059] transition-colors duration-500 min-h-[24px] sm:min-h-[32px] flex items-end">
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
                    placeholder="0"
                    value={filters.budgetMax}
                    onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
                />
            </div>
        </div>
    );
};

export default PropertyFilters;
