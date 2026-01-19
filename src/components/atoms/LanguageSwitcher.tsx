'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
    { code: 'fr', name: 'Français', flag: '🇨🇭' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = useLocale();
    const currentLang = languages.find(lang => lang.code === currentLocale) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code: string) => {
        const newPath = pathname.replace(/^\/(fr|en|es)(?=\/|$)/, `/${code}`);
        router.push(newPath);
        router.refresh();
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
            >
                <span className="text-xl">{currentLang.flag}</span>
                <span className="text-sm font-medium uppercase text-white">{currentLang.code}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-300 text-white ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[var(--color-primary)] border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${currentLocale === lang.code ? 'bg-white/10 text-[var(--color-accent)]' : 'text-white'
                                }`}
                        >
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
