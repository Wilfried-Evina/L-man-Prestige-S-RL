'use client';

import React, { useState } from 'react';

export interface FilterValues {
    transaction: 'sale' | 'rent' | 'all';
    city: string;
    rooms: string;
    budgetMin: string;
    budgetMax: string;
    status: 'all' | 'available' | 'reserved' | 'rented';
}

interface PropertyFiltersProps {
    onFilterChange?: (filters: FilterValues) => void;
    translations: {
        transaction: string;
        sale: string;
        rent: string;
        all: string;
        city: string;
        cityPlaceholder: string;
        rooms: string;
        roomsPlaceholder: string;
        budget: string;
        budgetMin: string;
        budgetMax: string;
        status: string;
        statusAll: string;
        statusAvailable: string;
        statusReserved: string;
        statusRented: string;
    };
    cities: string[];
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
    onFilterChange,
    translations,
    cities = [],
}) => {
    const [filters, setFilters] = useState<FilterValues>({
        transaction: 'all',
        city: '',
        rooms: '',
        budgetMin: '',
        budgetMax: '',
        status: 'all',
    });

    const handleFilterChange = (
        key: keyof FilterValues,
        value: string
    ) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const roomsOptions = ['1', '2', '3', '4', '5', '6', '7', '8+'];

    return (
        <div 
            className="w-full p-4 sm:p-6 rounded-xl"
            style={{ 
                background: 'linear-gradient(to bottom, rgba(10, 31, 46, 0.8), rgba(5, 22, 34, 0.9))',
                border: '1px solid rgba(197, 160, 89, 0.2)'
            }}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {/* Transaction Type */}
                <div className="flex flex-col gap-2">
                    <label 
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                    >
                        {translations.transaction}
                    </label>
                    <select
                        value={filters.transaction}
                        onChange={(e) => handleFilterChange('transaction', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300 cursor-pointer"
                        style={{ 
                            backgroundColor: '#051622',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: '16px'
                        }}
                    >
                        <option value="all" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.all}</option>
                        <option value="sale" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.sale}</option>
                        <option value="rent" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.rent}</option>
                    </select>
                </div>

                {/* City */}
                <div className="flex flex-col gap-2">
                    <label 
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                    >
                        {translations.city}
                    </label>
                    <select
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300 cursor-pointer"
                        style={{ 
                            backgroundColor: '#051622',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: '16px'
                        }}
                    >
                        <option value="" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.cityPlaceholder}</option>
                        {cities.map((city) => (
                            <option key={city} value={city} style={{ backgroundColor: '#051622', color: '#ffffff' }}>{city}</option>
                        ))}
                    </select>
                </div>

                {/* Rooms */}
                <div className="flex flex-col gap-2">
                    <label 
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                    >
                        {translations.rooms}
                    </label>
                    <select
                        value={filters.rooms}
                        onChange={(e) => handleFilterChange('rooms', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300 cursor-pointer"
                        style={{ 
                            backgroundColor: '#051622',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: '16px'
                        }}
                    >
                        <option value="" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.roomsPlaceholder}</option>
                        {roomsOptions.map((room) => (
                            <option key={room} value={room} style={{ backgroundColor: '#051622', color: '#ffffff' }}>{room} {room === '1' ? 'pièce' : 'pièces'}</option>
                        ))}
                    </select>
                </div>

                {/* Budget Min */}
                <div className="flex flex-col gap-2">
                    <label 
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                    >
                        {translations.budgetMin}
                    </label>
                    <input
                        type="number"
                        placeholder="0 CHF"
                        value={filters.budgetMin}
                        onChange={(e) => handleFilterChange('budgetMin', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                        style={{ 
                            backgroundColor: '#051622',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Budget Max */}
                <div className="flex flex-col gap-2">
                    <label 
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                    >
                        {translations.budgetMax}
                    </label>
                    <input
                        type="number"
                        placeholder="∞ CHF"
                        value={filters.budgetMax}
                        onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300"
                        style={{ 
                            backgroundColor: '#051622',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: '16px'
                        }}
                    />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                    <label 
                        className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                        style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                    >
                        {translations.status}
                    </label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all duration-300 cursor-pointer"
                        style={{ 
                            backgroundColor: '#051622',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#ffffff',
                            fontSize: '16px'
                        }}
                    >
                        <option value="all" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.statusAll}</option>
                        <option value="available" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.statusAvailable}</option>
                        <option value="reserved" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.statusReserved}</option>
                        <option value="rented" style={{ backgroundColor: '#051622', color: '#ffffff' }}>{translations.statusRented}</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PropertyFilters;
