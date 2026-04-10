import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';

  if (host === 'soproductions.fr' || host === 'www.soproductions.fr') {
    const pathname = request.nextUrl.pathname;
    const locale = pathname.startsWith('/en') ? '/en' : '';
    return NextResponse.redirect(`https://philippetullio.com${locale}/soproductions`, { status: 301 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
