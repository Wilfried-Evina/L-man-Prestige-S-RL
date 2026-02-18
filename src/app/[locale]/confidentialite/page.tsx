'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ConfidentialitePage() {
    const t = useTranslations('confidentialite');

    const dataItems: string[] = t.raw('data_items');
    const usageItems: string[] = t.raw('usage_items');
    const rightsItems: string[] = t.raw('rights_items');

    return (
        <div className="min-h-screen bg-[#051622] pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
            <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-12">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 sm:mb-8 md:mb-12">
                    {t('title')}
                </h1>

                <div className="flex flex-col gap-6 sm:gap-8 text-white/80 text-sm sm:text-base leading-relaxed">
                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('intro_title')}</h2>
                        <p>{t('intro_text')}</p>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('data_title')}</h2>
                        <p>{t('data_text')}</p>
                        <ul className="list-disc list-inside mt-3 sm:mt-4 flex flex-col gap-2">
                            {dataItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('usage_title')}</h2>
                        <p>{t('usage_text')}</p>
                        <ul className="list-disc list-inside mt-3 sm:mt-4 flex flex-col gap-2">
                            {usageItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('retention_title')}</h2>
                        <p>{t('retention_text')}</p>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('security_title')}</h2>
                        <p>{t('security_text')}</p>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('rights_title')}</h2>
                        <p>{t('rights_text')}</p>
                        <ul className="list-disc list-inside mt-3 sm:mt-4 flex flex-col gap-2">
                            {rightsItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p className="mt-3 sm:mt-4">
                            {t('rights_contact')} <a href="mailto:contact@lemanprestige.ch" className="text-[#C5A059] hover:underline">contact@lemanprestige.ch</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('cookies_title')}</h2>
                        <p>{t('cookies_text')}</p>
                    </section>

                    <section>
                        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t('contact_title')}</h2>
                        <p>
                            {t('contact_text')}<br /><br />
                            <strong>{t('contactCompany')}</strong><br />
                            {t('contactEmail')} <a href="mailto:contact@lemanprestige.ch" className="text-[#C5A059] hover:underline">contact@lemanprestige.ch</a><br />
                            {t('contactLocation')}
                        </p>
                    </section>

                    <p className="text-white/50 text-xs sm:text-sm mt-6 sm:mt-8">
                        {t('lastUpdate')}
                    </p>
                </div>
            </div>
        </div>
    );
}
