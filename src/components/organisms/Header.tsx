'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '../atoms/LanguageSwitcher';
import Button from '../atoms/Button';

interface HeaderProps {
    locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale: propLocale }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const hookLocale = useLocale();
    const locale = propLocale || hookLocale;
    const t = useTranslations('header');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Debug: afficher les valeurs
    const properties = t('properties');
    const services = t('services');
    const about = t('about');
    const contact = t('contact');

    // Créer les liens directement dans le rendu pour forcer la mise à jour
    const navLinks = [
        { name: properties, href: `/${locale}/properties` },
        { name: services, href: `/${locale}/services` },
        { name: about, href: `/${locale}/about` },
        { name: contact, href: `/${locale}/contact` },
    ];

    const Logo = () => (
        <Link href={`/${locale}`} className="group flex flex-col items-center pt-2">
            <span className="!text-white font-heading text-2xl tracking-[0.15em] leading-none mb-1 group-hover:text-[#C5A059] transition-colors duration-700 uppercase italic">
                Léman Property
            </span>
            <div className="flex items-center gap-3 w-full justify-center">
                <div className="h-[0.5px] w-8 bg-gradient-to-l from-[#C5A059]/50 to-transparent" />
                <span className="text-[#C5A059] text-[9px] uppercase tracking-[0.6em] font-light">
                    Prestige
                </span>
                <div className="h-[0.5px] w-8 bg-gradient-to-r from-[#C5A059]/50 to-transparent" />
            </div>
        </Link>
    );

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${isScrolled
                    ? 'py-6 bg-[#051622]/95 backdrop-blur-2xl border-b border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
                    : 'pt-96 pb-16 bg-transparent'
                    }`}
            >
                <div className="max-w-[1800px] mx-auto px-12 flex items-center justify-between">
                    {/* Extreme Left: Logo */}
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    {/* Extreme Right: Nav */}
                    <div className="flex items-center gap-14">
                        <nav className="hidden lg:flex items-center gap-14">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="!text-white font-body text-[12px] uppercase tracking-[0.3em] font-bold relative group pt-1"
                                >
                                    <span className="relative z-10 opacity-100">{link.name}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-500 group-hover:w-full shadow-[0_0_10px_#C5A059]" />
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden lg:flex items-center gap-10">
                            <div className="h-8 w-[0.5px] bg-white/20 mx-2" />
                            <LanguageSwitcher />
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="flex flex-col gap-2 p-2 group"
                            >
                                <span className="w-8 h-[1px] bg-white group-hover:bg-[#C5A059] transition-all" />
                                <span className="w-5 h-[1px] bg-[#C5A059] self-end group-hover:w-8 transition-all" />
                                <span className="w-8 h-[1px] bg-white group-hover:bg-[#C5A059] transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-1000 ${isMobileMenuOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-[#051622]/98 backdrop-blur-3xl transition-opacity duration-1000 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Content */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-full bg-[#051622] p-16 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-between items-center mb-24 pb-8 border-b border-white/10">
                        <Logo />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white hover:text-[#C5A059] transition-transform duration-500 hover:rotate-90"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-12 text-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-5xl font-heading text-white hover:text-[#C5A059] transition-all duration-700 hover:scale-110 block uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-32 border-t border-white/5 pt-16 flex flex-col items-center gap-12">
                        <LanguageSwitcher />
                        <div className="text-center">
                            <p className="text-[#C5A059] text-[10px] uppercase tracking-[1em] font-light mb-4">Excellence</p>
                            <p className="text-white/20 text-[9px] uppercase tracking-[0.4em]">Genève • Lausanne • Montreux</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
