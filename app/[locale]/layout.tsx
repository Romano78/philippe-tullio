import type { Metadata } from "next";
import { Inter, Alfa_Slab_One, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/config/theme-provider";
import Nav from "@/components/nav";
import SmoothScroll from "@/components/SmoothScroll";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const alfaSlabOne = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-meta",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://philippetullio.com'),
  title: {
    template: '%s | Tullio Philippe',
    default: 'Tullio Philippe — Réalisateur',
  },
  description: 'Réalisateur basé à Paris. Films, publicités, clips musicaux.',
  keywords: [
    'Philippe Tullio', 'PhilippeTullio', 'Tullio Philippe', 'TullioPhilippe', 'P. Tullio', 'Tullio réalisateur',
    'réalisateur', 'réalisateur Paris', 'cinéaste', 'film d\'action', 'clip musical', 'publicité', 'court métrage',
  ],
  openGraph: {
    siteName: 'Tullio Philippe',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${alfaSlabOne.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <SmoothScroll>
              <NextTopLoader color="#B8FF00" height={2} showSpinner={false} />
              <Nav />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
