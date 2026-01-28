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

    // Configuration des statuts avec design premium
    const statusConfig = {
        available: {
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            shadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
            glow: 'rgba(16, 185, 129, 0.6)',
            label: t('statusAvailable')
        },
        reserved: {
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            shadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
            glow: 'rgba(245, 158, 11, 0.6)',
            label: t('statusReserved')
        },
        rented: {
            gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            shadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
            glow: 'rgba(239, 68, 68, 0.6)',
            label: t('statusRented')
        }
    };

    const currentStatus = statusConfig[property.status] || statusConfig.available;

    const whatsappMessage = encodeURIComponent(
        `Bonjour, je suis interesse(e) par le bien "${property.title}" situe a ${property.location} au prix de ${property.price}. Pouvez-vous me donner plus d'informations ?`
    );
    const whatsappNumber = '41XXXXXXXXX';
    const phoneNumber = '+41XXXXXXXXX';

    return (
        <div 
            className={`group relative overflow-hidden transition-all duration-500 rounded-2xl hover:shadow-2xl ${property.status !== 'available' ? 'opacity-90' : ''}`}
            style={{
                background: 'linear-gradient(165deg, #0d2438 0%, #051622 100%)',
                border: '1px solid rgba(197, 160, 89, 0.15)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }}
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div 
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #051622 0%, rgba(5,22,34,0.4) 50%, transparent 100%)' }}
                />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span 
                        className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 hover:scale-105"
                        style={{ 
                            background: 'linear-gradient(135deg, #C5A059 0%, #a38544 100%)',
                            color: '#051622',
                            boxShadow: '0 4px 15px rgba(197, 160, 89, 0.4)',
                            textShadow: '0 1px 2px rgba(255,255,255,0.2)'
                        }}
                    >
                        {t(property.type)}
                    </span>

                    <span 
                        className="px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-bold rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105"
                        style={{ 
                            background: currentStatus.gradient,
                            color: '#ffffff',
                            boxShadow: currentStatus.shadow
                        }}
                    >
                        <span 
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: '#ffffff', boxShadow: `0 0 8px ${currentStatus.glow}` }}
                        />
                        {currentStatus.label}
                    </span>
                </div>
            </div>

            <div className="p-5 relative">
                <p 
                    className="text-[11px] uppercase tracking-[0.25em] font-medium mb-2"
                    style={{ color: 'rgba(197, 160, 89, 0.8)' }}
                >
                    {property.location}
                </p>
                
                <h3 
                    className="text-lg font-semibold leading-tight mb-4 group-hover:text-[#C5A059] transition-colors duration-300"
                    style={{ color: '#ffffff' }}
                >
                    {property.title}
                </h3>

                <div className="flex items-center gap-5 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)' }}>
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold" style={{ color: '#ffffff' }}>{property.sqm}</span>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('sqm')}</span>
                    </div>
                    <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(197, 160, 89, 0.4), transparent)' }} />
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold" style={{ color: '#ffffff' }}>{property.rooms}</span>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('rooms')}</span>
                    </div>
                    <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(197, 160, 89, 0.4), transparent)' }} />
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold" style={{ color: '#ffffff' }}>{property.baths}</span>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>{t('baths')}</span>
                    </div>
                </div>

                <div className="mb-5">
                    <span 
                        className="text-xl font-bold tracking-tight"
                        style={{ color: '#C5A059' }}
                    >
                        {property.price}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        style={{ 
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.35)'
                        }}
                    >
                        <div 
                            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                            style={{ background: 'linear-gradient(135deg, #2be374 0%, #25D366 100%)' }}
                        />
                        <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="text-sm font-bold uppercase tracking-wider relative z-10" style={{ color: '#ffffff' }}>{t('contactWhatsApp')}</span>
                    </a>

                    <div className="flex gap-3">
                        <a
                            href={`tel:${phoneNumber}`}
                            className="group/call relative flex items-center justify-center gap-2 flex-1 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                            style={{ 
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <div 
                                className="absolute inset-0 opacity-0 group-hover/call:opacity-100 transition-opacity duration-300"
                                style={{ background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.2) 0%, rgba(197, 160, 89, 0.1) 100%)' }}
                            />
                            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wider relative z-10" style={{ color: '#ffffff' }}>{t('contactCall')}</span>
                        </a>

                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Bonjour, je souhaite planifier une visite pour le bien "${property.title}" a ${property.location}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/visit relative flex items-center justify-center gap-2 flex-1 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                            style={{ 
                                background: 'linear-gradient(135deg, #C5A059 0%, #a38544 100%)',
                                boxShadow: '0 4px 15px rgba(197, 160, 89, 0.3)'
                            }}
                        >
                            <div 
                                className="absolute inset-0 opacity-0 group-hover/visit:opacity-100 transition-opacity duration-300"
                                style={{ background: 'linear-gradient(135deg, #d4b068 0%, #C5A059 100%)' }}
                            />
                            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#051622' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wider relative z-10" style={{ color: '#051622' }}>{t('contactVisit')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
