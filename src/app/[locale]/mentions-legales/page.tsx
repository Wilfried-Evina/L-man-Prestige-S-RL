'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function MentionsLegalesPage() {
  const t = useTranslations('mentionsLegales');

  return (
    <div className="min-h-screen bg-[#051622] pt-20 sm:pt-28 md:pt-40 pb-12 sm:pb-16 md:pb-20 flex justify-center">
      <div className="w-full max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            {t('title')}
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12">
          {/* Section 1 */}
          <div className="bg-white/5 rounded-[8px] p-4 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold !text-white mb-4 sm:mb-6 text-center">
              {t('editor_title')}
            </h2>
            <div className="text-white/80 text-sm sm:text-base leading-relaxed space-y-2 sm:space-y-3 text-center w-full">
              <p className="font-medium text-white text-base sm:text-lg">{t('editor_company')}</p>
              <p>{t('editor_desc')}</p>
              <p>
                <span className="font-semibold text-white">{t('editor_email')}</span>
                <a href="mailto:contact@lemanprestige.ch" className="!text-white hover:!text-[#C5A059] hover:underline transition-colors duration-300 ml-2">
                  contact@lemanprestige.ch
                </a>
              </p>
              <p><span className="font-semibold text-white">{t('editor_phone')}</span> +41 76 523 24 31</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white/5 rounded-[8px] p-4 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold !text-white mb-4 sm:mb-6 text-center">
              {t('activity_title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed text-center">
              {t('activity_text')}
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white/5 rounded-[8px] p-4 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold !text-white mb-4 sm:mb-6 text-center">
              {t('hosting_title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed text-center">
              {t('hosting_text')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white/5 rounded-[8px] p-4 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold !text-white mb-4 sm:mb-6 text-center">
              {t('ip_title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed text-center">
              {t('ip_text')}
            </p>
          </div>

          {/* Section 5 */}
          <div className="bg-white/5 rounded-[8px] p-4 sm:p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold !text-white mb-4 sm:mb-6 text-center">
              {t('liability_title')}
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed text-center">
              {t('liability_text')}
            </p>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-br from-[#C5A059]/20 to-[#e8c16f]/20 rounded-[8px] p-4 sm:p-6 md:p-8 border border-[#C5A059]/30 w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-bold !text-white mb-4 sm:mb-6 text-center flex items-center justify-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('important_title')}
            </h2>
            <div className="space-y-3 sm:space-y-4 w-full">
              <div className="bg-white/10 rounded-[6px] p-3 sm:p-4 md:p-5 text-center w-full">
                <p className="font-semibold text-white text-sm sm:text-base mb-1 sm:mb-2">{t('insurance_title')}</p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base">{t('insurance_text')}</p>
              </div>
              <div className="bg-white/10 rounded-[6px] p-3 sm:p-4 md:p-5 text-center w-full">
                <p className="font-semibold text-white text-sm sm:text-base mb-1 sm:mb-2">{t('realestate_title')}</p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base">{t('realestate_text')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center w-full">
          <p className="text-xs sm:text-sm text-white/70">
            {t('lastUpdate')} <span className="font-semibold text-[#C5A059]">2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}
