'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
    const t = useTranslations('about');

    const values = [
        {
            icon: '🤝',
            title: t('values.proximity.title'),
            description: t('values.proximity.description')
        },
        {
            icon: '⭐',
            title: t('values.quality.title'),
            description: t('values.quality.description')
        },
        {
            icon: '📋',
            title: t('values.transparency.title'),
            description: t('values.transparency.description')
        }
    ];

    return (
        <div className="min-h-screen bg-[#051622] pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-24">
                    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
                        <div className="flex flex-col gap-2 sm:gap-4">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                                {t('title')}
                            </h1>
                            <p className="text-[#C5A059] text-base sm:text-lg md:text-xl font-light tracking-wide">
                                {t('subtitle')}
                            </p>
                        </div>
                        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                            {t('description')}
                        </p>
                    </div>
                    <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden rounded-sm border border-white/5">
                        <Image
                            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2674&auto=format&fit=crop"
                            alt="Léman Prestige Office"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-12 sm:mb-16 md:mb-24">
                    <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 md:mb-12">
                        {t('values.title')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {values.map((value, index) => (
                            <div 
                                key={index} 
                                className="p-4 sm:p-6 md:p-8 border border-white/10 rounded-sm hover:border-[#C5A059]/50 transition-all duration-500 group"
                            >
                                <span className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6 block">{value.icon}</span>
                                <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-[#C5A059] transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="p-4 sm:p-6 md:p-8 border border-white/10 rounded-sm">
                        <h3 className="text-[#C5A059] text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest mb-4 sm:mb-6">
                            Coordonnées
                        </h3>
                        <div className="flex flex-col gap-3 sm:gap-4 text-white text-sm sm:text-base">
                            <p>
                                <span className="text-white/50">Email:</span>{' '}
                                <a href="mailto:contact@lemanprestige.ch" className="hover:text-[#C5A059] transition-colors">
                                    contact@lemanprestige.ch
                                </a>
                            </p>
                            <p>
                                <span className="text-white/50">Téléphone:</span>{' '}
                                <a href="tel:+41XXXXXXXXX" className="hover:text-[#C5A059] transition-colors">
                                    +41 XX XXX XX XX
                                </a>
                            </p>
                            <p>
                                <span className="text-white/50">Adresse:</span>{' '}
                                Genève, Suisse
                            </p>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 md:p-8 border border-white/10 rounded-sm">
                        <h3 className="text-[#C5A059] text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest mb-4 sm:mb-6">
                            Zone d&apos;intervention
                        </h3>
                        <p className="text-white text-sm sm:text-base leading-relaxed">
                            Nous intervenons dans toute la région lémanique : Genève, Lausanne, Nyon, Vaud, et communes environnantes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
