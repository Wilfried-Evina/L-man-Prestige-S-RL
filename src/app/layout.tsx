import type { Metadata } from "next";
import "./globals.css";

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
    <html lang={currentLocale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
