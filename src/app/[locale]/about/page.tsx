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
        <div className="min-h-screen bg-[#051622] pt-32 pb-32">
            <div className="max-w-[1800px] mx-auto px-4 md:px-12">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                                {t('title')}
                            </h1>
                            <p className="text-[#C5A059] text-xl font-light tracking-wide">
                                {t('subtitle')}
                            </p>
                        </div>
                        <p className="text-white text-lg leading-relaxed max-w-xl">
                            {t('description')}
                        </p>
                    </div>
                    <div className="relative h-[500px] w-full overflow-hidden rounded-sm border border-white/5">
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
                <div className="mb-24">
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
                        {t('values.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div 
                                key={index} 
                                className="p-8 border border-white/10 rounded-sm hover:border-[#C5A059]/50 transition-all duration-500 group"
                            >
                                <span className="text-4xl mb-6 block">{value.icon}</span>
                                <h3 className="text-white text-xl font-bold mb-4 group-hover:text-[#C5A059] transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border border-white/10 rounded-sm">
                        <h3 className="text-[#C5A059] text-lg font-bold uppercase tracking-widest mb-6">
                            Coordonnées
                        </h3>
                        <div className="flex flex-col gap-4 text-white">
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
                    <div className="p-8 border border-white/10 rounded-sm">
                        <h3 className="text-[#C5A059] text-lg font-bold uppercase tracking-widest mb-6">
                            Zone d&apos;intervention
                        </h3>
                        <p className="text-white leading-relaxed">
                            Nous intervenons dans toute la région lémanique : Genève, Lausanne, Nyon, Vaud, et communes environnantes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
