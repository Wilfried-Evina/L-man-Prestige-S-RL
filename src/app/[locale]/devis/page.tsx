'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function DevisPage() {
    const t = useTranslations('devis');
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get('service') || '';

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: preselectedService,
        address: '',
        city: '',
        date: '',
        description: '',
        privacy: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        // Validation spéciale pour le champ date
        if (name === 'date' && value) {
            const selectedDate = new Date(value);
            const year = selectedDate.getFullYear();

            // Limiter les années entre 2024 et 2030
            if (year < 2024 || year > 2030) {
                return; // Ne pas mettre à jour si l'année est invalide
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulation d'envoi
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Pour l'instant, on simule un succès
        setSubmitStatus('success');
        setIsSubmitting(false);
    };

    const serviceOptions = [
        { value: '', label: t('form.serviceOptions.select') },
        { value: 'travaux', label: t('form.serviceOptions.travaux') },
        { value: 'nettoyageBail', label: t('form.serviceOptions.nettoyageBail') },
        { value: 'nettoyageChantier', label: t('form.serviceOptions.nettoyageChantier') },
        { value: 'vitres', label: t('form.serviceOptions.vitres') },
        { value: 'demenagement', label: t('form.serviceOptions.demenagement') },
        { value: 'debarras', label: t('form.serviceOptions.debarras') },
        { value: 'relocation', label: t('form.serviceOptions.relocation') },
        { value: 'souslocation', label: t('form.serviceOptions.souslocation') },
        { value: 'administratif', label: t('form.serviceOptions.administratif') },
        { value: 'assurances', label: t('form.serviceOptions.assurances') },
    ];

    if (submitStatus === 'success') {
        return (
            <div className="min-h-screen bg-[#051622] pt-32 pb-32">
                <div className="max-w-[800px] mx-auto px-4 md:px-12">
                    <div className="text-center p-12 border border-[#C5A059]/30 rounded-[4px] bg-[#C5A059]/5">
                        <span className="text-6xl mb-6 block">✅</span>
                        <h2 className="text-white text-2xl font-bold mb-4">{t('form.success')}</h2>
                        <p className="text-white/70">
                            Nous avons bien reçu votre demande et vous recontacterons très rapidement.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#051622] flex items-center justify-center p-4">
            <div className="w-full max-w-[800px] mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-12 text-center">
                    <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight">
                        {t('title')}
                    </h1>
                    <p className="text-white/70 text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm uppercase tracking-widest text-center">
                                {t('form.firstName')} *
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm uppercase tracking-widest text-center">
                                {t('form.lastName')} *
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm uppercase tracking-widest text-center">
                                {t('form.email')} *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm uppercase tracking-widest text-center">
                                {t('form.phone')} *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm uppercase tracking-widest text-center">
                            {t('form.service')} *
                        </label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                        >
                            {serviceOptions.map(option => (
                                <option key={option.value} value={option.value} className="bg-[#051622]">
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm uppercase tracking-widest text-center">
                                {t('form.address')}
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm uppercase tracking-widest text-center">
                                {t('form.city')}
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm uppercase tracking-widest text-center">
                            {t('form.date')}
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min="2024-01-01"
                            max="2030-12-31"
                            className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(197,160,89,0.2)] text-center hover:border-[#C5A059]/50 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:saturate-[3] [&::-webkit-calendar-picker-indicator]:hue-rotate-[15deg] [&::-webkit-calendar-picker-indicator]:brightness-[1.2] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm uppercase tracking-widest text-center">
                            {t('form.description')} *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-white focus:border-[#C5A059] focus:outline-none transition-colors resize-none"
                        />
                    </div>



                    {/* Privacy */}
                    <div className="flex items-center justify-center gap-3 w-full">
                        <input
                            type="checkbox"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            required
                            className="w-5 h-5 accent-[#C5A059]"
                        />
                        <label className="text-white/70 text-sm">
                            {t('form.privacy')} *
                        </label>
                    </div>

                    <div className="mt-12 flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-6 bg-[#C5A059] text-white px-6 py-3 text-base uppercase tracking-widest font-medium rounded-[4px] hover:bg-[#C5A059]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
                            >
                                {isSubmitting ? 'Envoi en cours...' : t('form.submit')}
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
