import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "L-man Prestige S.RL",
  description: "Design System et Architecture moderne",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;
  const currentLocale = locale || 'fr';

  return (
    <html lang={currentLocale} suppressHydrationWarning className={`${lato.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-body">
        {children}
      </body>
    </html>
  );
}
