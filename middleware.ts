import { NextRequest, NextResponse } from 'next/server';

// Langues supportées
const SUPPORTED_LOCALES = ['fr', 'en', 'es'];
const DEFAULT_LOCALE = 'fr';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Vérifier si le chemin commence déjà par une locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Extraire la langue préférée du navigateur
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLocale = acceptLanguage
    .split(',')[0]
    .split('-')[0]
    .toLowerCase();

  const locale = SUPPORTED_LOCALES.includes(preferredLocale)
    ? preferredLocale
    : DEFAULT_LOCALE;

  // Rediriger vers l'URL avec la locale
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Skip les routes système
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
