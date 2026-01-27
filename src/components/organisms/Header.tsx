'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

    // Main navigation links
    const navLinks = [
        { name: t('properties'), href: `/${locale}/properties` },
        { name: t('services'), href: `/${locale}/services` },
        { name: t('about'), href: `/${locale}/about` },
        { name: t('contact'), href: `/${locale}/devis` },
    ];

    const Logo = () => (
        <Link href={`/${locale}`} className="group flex items-center">
            <Image
                src="/leman-logo.png"
                alt="Léman Prestige SÀRL"
                width={90}
                height={45}
                className="object-contain group-hover:opacity-80 transition-opacity duration-700"
                priority
                unoptimized
            />
        </Link>
    );

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isScrolled
                    ? 'bg-[#051622]/95 backdrop-blur-xl py-1 shadow-[0_6px_20px_rgba(0,0,0,0.2)]'
                    : 'bg-[#051622]/85 py-1.5'
                    }`}
            >
                <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex flex-1 justify-center items-center gap-5">
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

                    {/* Right Section */}
                    <div className="flex-shrink-0 flex items-center justify-end gap-3 lg:pr-6">
                        <div className="hidden lg:block">
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
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-700 ${isMobileMenuOpen ? 'visible' : 'invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-[#051622]/98 backdrop-blur-xl transition-opacity duration-700 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Content */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-full bg-[#051622] p-4 sm:p-6 md:p-10 transition-transform duration-700 ease-out overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-between items-center mb-8 sm:mb-10 md:mb-16 pb-4 sm:pb-6 border-b border-white/10">
                        <Logo />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white hover:text-[#C5A059] transition-transform duration-500 hover:rotate-90 p-2"
                        >
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex flex-col gap-3 sm:gap-4 md:gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg sm:text-xl md:text-2xl font-heading text-white hover:text-[#C5A059] transition-all duration-500 block uppercase tracking-wider sm:tracking-widest py-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 sm:mt-12 md:mt-20 border-t border-white/5 pt-6 sm:pt-8 md:pt-12 flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
                        <LanguageSwitcher />
                        <div className="text-center">
                            <p className="text-[#C5A059] text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.8em] md:tracking-[1em] font-light mb-3 sm:mb-4">Excellence</p>
                            <p className="text-white/20 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.4em]">Genève • Lausanne • Montreux</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
