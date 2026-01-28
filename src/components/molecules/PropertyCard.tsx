'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        location: string;
        city: string;
        price: string;
        type: string;
        status: 'available' | 'reserved' | 'rented';
        sqm: number;
        rooms: number;
        baths: number;
        image: string;
    };
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const t = useTranslations('properties');

    // Couleurs et textes selon le statut
    const statusConfig = {
        available: {
            bg: 'rgba(16, 185, 129, 0.2)',
            border: 'rgba(16, 185, 129, 0.5)',
            dot: '#34d399',
            text: '#34d399',
            label: t('statusAvailable')
        },
        reserved: {
            bg: 'rgba(245, 158, 11, 0.2)',
            border: 'rgba(245, 158, 11, 0.5)',
            dot: '#fbbf24',
            text: '#fbbf24',
            label: t('statusReserved')
        },
        rented: {
            bg: 'rgba(239, 68, 68, 0.2)',
            border: 'rgba(239, 68, 68, 0.5)',
            dot: '#f87171',
            text: '#f87171',
            label: t('statusRented')
        }
    };

    const currentStatus = statusConfig[property.status] || statusConfig.available;

    // Message WhatsApp
    const whatsappMessage = encodeURIComponent(
        `Bonjour, je suis intéressé(e) par le bien "${property.title}" situé à ${property.location} au prix de ${property.price}. Pouvez-vous me donner plus d'informations ?`
    );
    const whatsappNumber = '41XXXXXXXXX'; // Remplacer par le vrai numéro
    const phoneNumber = '+41XXXXXXXXX'; // Remplacer par le vrai numéro

    return (
        <div 
            className={`group relative overflow-hidden transition-all duration-500 rounded-xl ${property.status !== 'available' ? 'opacity-85' : ''}`}
            style={{
                background: 'linear-gradient(to bottom, #0a1f2e, #051622)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div 
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #051622, rgba(5,22,34,0.2), transparent)' }}
                />

                {/* Badges Container */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {/* Type Badge */}
                    <span 
                        className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg rounded"
                        style={{ backgroundColor: '#C5A059', color: '#051622' }}
                    >
                        {t(property.type)}
                    </span>

                    {/* Status Badge */}
                    <span 
                        className="backdrop-blur-sm text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 font-bold rounded flex items-center gap-2"
                        style={{ 
                            backgroundColor: currentStatus.bg,
                            border: `1px solid ${currentStatus.border}`,
                            color: currentStatus.text
                        }}
                    >
                        <span 
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: currentStatus.dot }}
                        />
                        {currentStatus.label}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 relative">
                {/* Location */}
                <p 
                    className="text-[11px] uppercase tracking-[0.25em] font-medium mb-2"
                    style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                >
                    {property.location}
                </p>
                
                {/* Title */}
                <h3 
                    className="text-lg font-semibold leading-tight mb-4 group-hover:text-[#C5A059] transition-colors duration-300"
                    style={{ color: '#ffffff' }}
                >
                    {property.title}
                </h3>

                {/* Specs */}
                <div className="flex items-center gap-5 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold" style={{ color: '#ffffff' }}>{property.sqm}</span>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('sqm')}</span>
                    </div>
                    <div className="h-8 w-px" style={{ backgroundColor: 'rgba(197, 160, 89, 0.3)' }} />
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold" style={{ color: '#ffffff' }}>{property.rooms}</span>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('rooms')}</span>
                    </div>
                    <div className="h-8 w-px" style={{ backgroundColor: 'rgba(197, 160, 89, 0.3)' }} />
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold" style={{ color: '#ffffff' }}>{property.baths}</span>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('baths')}</span>
                    </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                    <span 
                        className="text-xl font-bold tracking-tight"
                        style={{ color: '#C5A059' }}
                    >
                        {property.price}
                    </span>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col gap-2.5">
                    {/* WhatsApp Button - Primary */}
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 w-full py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        style={{ backgroundColor: '#25D366', color: '#ffffff' }}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="text-sm font-semibold uppercase tracking-wider">{t('contactWhatsApp')}</span>
                    </a>

                    {/* Call & Visit Buttons Row */}
                    <div className="flex gap-2.5">
                        {/* Call Button */}
                        <a
                            href={`tel:${phoneNumber}`}
                            className="flex items-center justify-center gap-2 flex-1 py-3 rounded-lg transition-all duration-300 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10"
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.08)', 
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#ffffff'
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-xs font-semibold uppercase tracking-wider">{t('contactCall')}</span>
                        </a>

                        {/* Visit Button */}
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, je souhaite planifier une visite pour le bien "${property.title}" à ${property.location}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 flex-1 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            style={{ backgroundColor: '#C5A059', color: '#051622' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wider">{t('contactVisit')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
