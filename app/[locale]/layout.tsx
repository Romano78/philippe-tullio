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

const BASE_URL = "https://philippetullio.com";
const DESCRIPTION = "Réalisateur basé à Paris. Films d'action, horreur, drame, satire.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Tullio Philippe',
    default: 'Tullio Philippe — Réalisateur',
  },
  description: DESCRIPTION,
  authors: [{ name: 'Philippe Tullio', url: BASE_URL }],
  creator: 'Philippe Tullio',
  publisher: 'Philippe Tullio',
  keywords: [
    'Philippe Tullio', 'PhilippeTullio', 'Tullio Philippe', 'TullioPhilippe', 'P. Tullio', 'Tullio réalisateur',
    'réalisateur', 'réalisateur Paris', 'cinéaste', "film d'action", 'clip musical', 'publicité', 'court métrage',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    siteName: 'Tullio Philippe',
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    title: 'Tullio Philippe — Réalisateur',
    description: DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Tullio Philippe — Réalisateur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@philippetullio',
    title: 'Tullio Philippe — Réalisateur',
    description: DESCRIPTION,
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Philippe Tullio',
      alternateName: ['Tullio Philippe', 'PhilippeTullio', 'TullioPhilippe'],
      url: BASE_URL,
      image: `${BASE_URL}/opengraph-image.png`,
      jobTitle: 'Réalisateur',
      description: DESCRIPTION,
      sameAs: [
        'https://www.imdb.com/name/nm3634035/',
        'https://www.linkedin.com/in/philippe-tullio-985190141/',
        'https://www.instagram.com/philippetullio/',
        'https://www.youtube.com/@philmmaker4ever',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Tullio Philippe',
      url: BASE_URL,
      description: DESCRIPTION,
      author: { '@type': 'Person', name: 'Philippe Tullio' },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
