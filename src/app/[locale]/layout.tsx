import { ReactNode } from 'react';
import Header from '@/components/organisms/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <Header key={locale} locale={locale} />
      <main className="pt-24">{children}</main>
    </NextIntlClientProvider>
  );
}
