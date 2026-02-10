'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        location: string;
        price: string;
        type: string;
        sqm: number;
        rooms: number;
        baths: number;
        image: string;
        images?: string[];
    };
}

function formatPrice(price: any, type: string) {
    if (!price) return '—';
    if (typeof price === 'string' && /[A-Za-z€$CHF]/.test(price)) return price;
    const num = Number(String(price).replace(/[^0-9.-]+/g, ''));
    if (Number.isNaN(num)) return String(price);
    const formatted = num.toLocaleString('en-US');
    if (type === 'rent') return `${formatted} CHF / mois`;
    return `${formatted} CHF`;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const t = useTranslations('properties');
    const locale = useLocale();
    const allImages = (property.images && property.images.length > 0) ? property.images : (property.image ? [property.image] : ['/images/placeholder.png']);
    const [currentIdx, setCurrentIdx] = useState(0);

    const goPrev = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIdx(prev => (prev - 1 + allImages.length) % allImages.length);
    }, [allImages.length]);

    const goNext = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIdx(prev => (prev + 1) % allImages.length);
    }, [allImages.length]);

    return (
        <div className="group relative overflow-hidden bg-[#051622] border border-white/5 transition-all duration-700 hover:border-[#C5A059]/30 w-full h-full flex flex-col">
            {/* Image Slider */}
            <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image
                    src={allImages[currentIdx]}
                    alt={property.title}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051622] via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />

                {/* Slider arrows — visible on hover, only if multiple images */}
                {allImages.length > 1 && (
                    <>
                        <button onClick={goPrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#C5A059]/80" aria-label="Précédent">‹</button>
                        <button onClick={goNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#C5A059]/80" aria-label="Suivant">›</button>
                        {/* Dots */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {allImages.map((_, i) => (
                                <button key={i} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIdx(i); }} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-[#C5A059] w-3' : 'bg-white/50 hover:bg-white/80'}`} aria-label={`Image ${i + 1}`} />
                            ))}
                        </div>
                        {/* Counter */}
                        <div className="absolute top-6 right-6 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">{currentIdx + 1}/{allImages.length}</div>
                    </>
                )}

                {/* Type Badge */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-[#C5A059] text-white text-[10px] uppercase tracking-[0.2em] px-4 py-2 font-body font-bold shadow-[0_4px_20px_rgba(197,160,89,0.3)]">
                        {t(property.type)}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 relative flex-1 flex flex-col">
                <div className="flex flex-col gap-1.5 mb-4">
                    <p className="!text-white text-[10px] uppercase tracking-[0.2em] font-light">
                        {property.location}
                    </p>
                    <h3 className="!text-white text-base font-semibold leading-tight group-hover:text-[#C5A059] transition-colors duration-500">
                        {property.title}
                    </h3>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-white text-[10px] uppercase tracking-[0.05em] mb-4 border-t border-white/5 pt-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white font-bold">{property.sqm}</span>
                        <span className="text-white/70">{t('sqm')}</span>
                    </div>
                    <div className="h-4 w-[0.5px] bg-white/10" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white font-bold">{property.rooms}</span>
                        <span className="text-white/70">{t('rooms')}</span>
                    </div>
                    <div className="h-4 w-[0.5px] bg-white/10" />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-white font-bold">{property.baths}</span>
                        <span className="text-white/70">{t('baths')}</span>
                    </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-white font-body text-base tracking-tight font-medium">
                        {formatPrice(property.price, property.type)}
                    </span>
                    <Link href={`/${locale}/properties/${property.id}`} className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-bold relative group/btn overflow-hidden pt-1 hover:text-white hover:bg-[#C5A059]/10 transition-all duration-300 px-2 py-1 rounded">
                        <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-full block">
                            {t('viewDetails')}
                        </span>
                        <span className="absolute top-full left-0 z-10 transition-transform duration-500 group-hover:-translate-y-full block text-white">
                            {t('viewDetails')}
                        </span>
                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#C5A059]/30 group-hover/btn:bg-[#C5A059]" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
