import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';

  if (host === 'soproductions.fr' || host === 'www.soproductions.fr') {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    if (pathname === '/' || pathname === '') {
      url.pathname = '/soproductions';
      return NextResponse.rewrite(url);
    }
    if (pathname === '/en' || pathname === '/en/') {
      url.pathname = '/en/soproductions';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
