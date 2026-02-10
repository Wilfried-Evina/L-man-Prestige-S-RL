'use client';

import { useTranslations } from '@/hooks/useTranslations';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

// Images d'arrière-plan liées aux services de relocation/immobilier en Suisse
const backgroundImages = [
  {
    src: '/images/appartements.jpg',
    alt: 'Appartements'
  },
  {
    src: '/images/Déménagement.jpg',
    alt: 'Déménagement'
  },
  {
    src: '/images/nettoyage.jpg',
    alt: 'Nettoyage'
  },
  {
    src: '/images/accompagnement-administratif.jpg',
    alt: 'Accompagnement administratif'
  },
  {
    src: '/images/Assurances.jpg',
    alt: 'Assurances'
  }
];

export default function Hero() {
  const t = useTranslations();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Background Images Carousel */}
      <div className={styles.heroBackground}>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`${styles.backgroundImage} ${
              index === currentImageIndex ? styles.active : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              quality={85}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
        <div className={styles.heroOverlay}></div>
      </div>

      {/* Content Container */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
        <p className={styles.heroSubtitle}>Travaux, ménage, relocation à Genève et Suisse romande</p>
        <button className={styles.heroCta}>{t('hero.cta')}</button>
      </div>

      {/* Image Indicators */}
      <div className={styles.imageIndicators}>
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentImageIndex ? styles.indicatorActive : ''
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
