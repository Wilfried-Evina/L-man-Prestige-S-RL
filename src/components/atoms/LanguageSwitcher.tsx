'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const languages = [
    { code: 'fr', name: 'Français', flag: '🇨🇭', country: 'CH' },
    { code: 'en', name: 'English', flag: '🇬🇧', country: 'GB' },
    { code: 'es', name: 'Español', flag: '🇪🇸', country: 'ES' },
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

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside as any);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside as any);
        };
    }, [isOpen]);

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
                className={`
                    group flex items-center gap-4 px-6 py-2.5 transition-all duration-500 rounded-full
                    border border-white/10 bg-white/[0.04] backdrop-blur-xl
                    hover:border-[#C5A059]/40 hover:bg-white/[0.1] shadow-2xl
                    ${isOpen ? 'border-[#C5A059]/60 bg-white/[0.15]' : ''}
                `}
            >
                <span className="text-2xl grayscale-[0.05] group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                    {currentLang.flag}
                </span>
                <span className="text-[14px] uppercase tracking-[0.3em] font-bold !text-white group-hover:text-[#C5A059] transition-colors duration-500">
                    {currentLang.country}
                </span>
                <svg
                    className={`w-4 h-4 transition-all duration-700 !text-white/40 group-hover:!text-[#C5A059] ${isOpen ? 'rotate-180 scale-125' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded bg-[#0B1A23]/95 backdrop-blur-lg border border-white/5 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200 ${currentLocale === lang.code
                                ? 'bg-[#C5A059]/10 text-[#C5A059]'
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className="text-base">{lang.flag}</span>
                            <span className="text-xs uppercase tracking-wide font-medium">
                                {lang.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
