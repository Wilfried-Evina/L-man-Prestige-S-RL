import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ErrorSilencer from '@/components/dev/ErrorSilencer'

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'Léman Prestige SÀRL',
    template: '%s | Léman Prestige',
  },
  description: 'Agence immobilière de prestige sur le Léman — ventes & locations à Genève, Montreux, Lausanne.',
  keywords: ['immobilier', 'Genève', 'Léman', 'villa', 'appartement', 'luxury real estate'],
  authors: [{ name: 'Léman Prestige SÀRL' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lemanprestige.ch'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Léman Prestige SÀRL',
    description: 'Agence immobilière de prestige sur le Léman — ventes & locations à Genève, Montreux, Lausanne.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lemanprestige.ch',
    siteName: 'Léman Prestige',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Léman Prestige SÀRL",
    "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://lemanprestige.ch',
    "logo": process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png` : '/favicon.png',
    "telephone": "+41 76 523 24 31",
    "email": "info@lemanprestige.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Genève",
      "addressLocality": "Genève",
      "addressRegion": "GE",
      "postalCode": "1200",
      "addressCountry": "CH"
    },
    "areaServed": "Léman",
    "priceRange": "€€€",
  };

  return (
    <html lang="fr" suppressHydrationWarning className={`${lato.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-body">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-LHC5LGV8HR" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LHC5LGV8HR');
          `}
        </Script>
        {process.env.NODE_ENV !== 'production' && <ErrorSilencer />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        {children}
      </body>
    </html>
  );
}
