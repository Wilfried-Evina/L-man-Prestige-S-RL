'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Messages = Record<string, string>;

export default function Hero() {
  const params = useParams();
  const locale = (params?.locale as string) || 'fr';
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const msgs = await import(`@/messages/${locale}.json`);
        setMessages(msgs.default || msgs);
      } catch {
        const msgs = await import('@/messages/fr.json');
        setMessages(msgs.default || msgs);
      }
    };
    loadMessages();
  }, [locale]);

  const t = (key: string) => messages[key] || key;

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      {/* Content Container */}
      <div className="hero-content">
        <h1 className="hero-title">{t('hero.title')}</h1>
        <button className="hero-cta">{t('hero.cta')}</button>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Background with image */
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a2a43 0%, #1a4a63 50%, #0a2a43 100%),
                      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(197,160,89,0.1)" stroke-width="1"/></pattern></defs><rect width="1200" height="600" fill="%230A2A43"/><rect width="1200" height="600" fill="url(%23grid)"/></svg>');
          background-size: cover, 40px 40px;
          background-position: center, 0 0;
          background-attachment: fixed;
          z-index: 1;
        }

        /* Overlay for better text readability */
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(10, 42, 67, 0.4) 0%,
            rgba(10, 42, 67, 0.6) 50%,
            rgba(10, 42, 67, 0.8) 100%
          );
          z-index: 2;
        }

        /* Content positioned above background */
        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          animation: fadeInUp 1s ease-out;
        }

        /* H1 Title with gradient */
        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 8vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          background: linear-gradient(
            135deg,
            #c5a059 0%,
            #e8d4a8 50%,
            #c5a059 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          max-width: 90%;
        }

        /* CTA Button with animation */
        .hero-cta {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 600;
          color: var(--color-white);
          background: var(--color-accent);
          border: none;
          padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(197, 160, 89, 0.3);
          animation: slideUp 0.8s ease-out 0.3s both;
        }

        .hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .hero-cta:hover {
          background: linear-gradient(135deg, #c5a059, #e8d4a8);
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(197, 160, 89, 0.4);
        }

        .hero-cta:hover::before {
          left: 100%;
        }

        .hero-cta:active {
          transform: translateY(-1px);
          box-shadow: 0 5px 15px rgba(197, 160, 89, 0.3);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .hero-section {
            min-height: 60vh;
          }

          .hero-title {
            font-size: clamp(1.5rem, 6vw, 2.5rem);
            margin-bottom: 0.5rem;
          }

          .hero-content {
            gap: 1.5rem;
            padding: 1.5rem;
          }

          .hero-cta {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-section {
            min-height: 100vh;
          }

          .hero-background {
            background-attachment: fixed;
          }
        }
      `}</style>
    </section>
  );
}
