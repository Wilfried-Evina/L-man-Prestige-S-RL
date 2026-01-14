'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Messages = Record<string, string>;

export default function Footer() {
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

  const currentYear = new Date().getFullYear();

  // Menu columns with translation keys
  const servicesLinks = ['footer.sales', 'footer.rental', 'footer.management'];
  const aboutLinks = ['footer.ourStory', 'footer.team', 'footer.careers'];
  const legalLinks = ['footer.terms', 'footer.privacy', 'footer.legalNotice'];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main content */}
        <div className="footer-content">
          {/* Column 1: Services */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.services')}</h3>
            <ul className="footer-links">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#">{t(link)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: About */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.about')}</h3>
            <ul className="footer-links">
              {aboutLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#">{t(link)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.legal')}</h3>
            <ul className="footer-links">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a href="#">{t(link)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="footer-column">
            <h3 className="footer-title">{t('footer.contact')}</h3>
            <div className="footer-contact">
              <p>
                <span className="contact-label">{t('footer.email')}:</span>
                <a href="mailto:contact@lemanprestige.ch">contact@lemanprestige.ch</a>
              </p>
              <p>
                <span className="contact-label">{t('footer.phone')}:</span>
                <a href="tel:+41225551234">+41 22 555 1234</a>
              </p>
              <p>
                <span className="contact-label">{t('footer.address')}:</span>
                <span>Genève, Suisse</span>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="social-links">
              <p className="social-label">{t('footer.followUs')}</p>
              <div className="social-icons">
                <a href="#" className="social-icon linkedin" title="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
                <a href="#" className="social-icon instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm3.75 4.5h-7.5a2.25 2.25 0 0 0-2.25 2.25v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25zm0 1.5v7.5a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 .75.75zm-3.75 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="copyright">{t('footer.copyright')}</p>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #0a2a43 0%, #1a4a63 100%);
          color: var(--color-white);
          padding: 3rem 0 1rem;
          margin-top: 4rem;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
        }

        .footer-column {
          animation: fadeInUp 0.6s ease-out;
        }

        .footer-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-accent);
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: rgba(248, 249, 250, 0.8);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: color 0.3s ease, transform 0.3s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--color-accent);
          transform: translateX(5px);
        }

        .footer-contact {
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .contact-label {
          color: var(--color-accent);
          font-weight: 600;
          display: inline-block;
          min-width: 70px;
        }

        .footer-contact a {
          color: rgba(248, 249, 250, 0.8);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-contact a:hover {
          color: var(--color-accent);
        }

        .social-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          color: var(--color-accent);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 1rem 0 0.75rem 0;
          display: block;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 0.75rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.15);
          color: var(--color-accent);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(197, 160, 89, 0.3);
        }

        .social-icon:hover {
          background: var(--color-accent);
          color: var(--color-primary);
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(197, 160, 89, 0.3);
        }

        .social-icon svg {
          width: 20px;
          height: 20px;
        }

        .footer-bottom {
          text-align: center;
          padding: 1.5rem;
          border-top: 1px solid rgba(197, 160, 89, 0.1);
        }

        .copyright {
          margin: 0;
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: rgba(248, 249, 250, 0.6);
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer {
            padding: 2rem 0 1rem;
            margin-top: 2rem;
          }

          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }

          .footer-title {
            font-size: 1rem;
          }

          .social-icons {
            gap: 0.75rem;
          }

          .social-icon {
            width: 36px;
            height: 36px;
          }

          .social-icon svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 480px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .contact-label {
            min-width: auto;
          }

          .footer-contact p {
            margin: 0.5rem 0;
          }
        }
      `}</style>
    </footer>
  );
}
