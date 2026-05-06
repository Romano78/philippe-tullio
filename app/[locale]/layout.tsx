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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr ? 'Tullio Philippe — Réalisateur' : 'Tullio Philippe — Director';
  const description = isFr
    ? 'Réalisateur basé à Paris. Films d\'action, horreur, drame, satire.'
    : 'Film director based in Paris. Action, horror, drama, satire.';

  const canonicalUrl = isFr ? BASE_URL : `${BASE_URL}/en`;
  const ogUrl = isFr ? BASE_URL : `${BASE_URL}/en`;
  const ogLocale = isFr ? 'fr_FR' : 'en_US';

  const keywords = isFr
    ? ['Philippe Tullio', 'PhilippeTullio', 'Tullio Philippe', 'TullioPhilippe', 'P. Tullio', 'Tullio réalisateur', 'réalisateur', 'réalisateur Paris', 'cinéaste', "film d'action", 'clip musical', 'publicité', 'court métrage']
    : ['Philippe Tullio', 'PhilippeTullio', 'Tullio Philippe', 'TullioPhilippe', 'P. Tullio', 'Tullio director', 'film director', 'Paris director', 'filmmaker', 'action film', 'music video', 'commercial', 'short film'];

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: '%s | Tullio Philippe',
      default: title,
    },
    description,
    authors: [{ name: 'Philippe Tullio', url: BASE_URL }],
    creator: 'Philippe Tullio',
    publisher: 'Philippe Tullio',
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: BASE_URL,
        en: `${BASE_URL}/en`,
      },
    },
    openGraph: {
      siteName: 'Tullio Philippe',
      type: 'website',
      locale: ogLocale,
      url: ogUrl,
      title,
      description,
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@philippetullio',
      title,
      description,
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isFr = locale === 'fr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Philippe Tullio',
        alternateName: ['Tullio Philippe', 'PhilippeTullio', 'TullioPhilippe'],
        url: BASE_URL,
        image: `${BASE_URL}/opengraph-image.png`,
        jobTitle: isFr ? 'Réalisateur' : 'Film Director',
        description: isFr
          ? 'Réalisateur basé à Paris. Films d\'action, horreur, drame, satire.'
          : 'Film director based in Paris. Action, horror, drama, satire.',
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
        description: isFr
          ? 'Réalisateur basé à Paris. Films d\'action, horreur, drame, satire.'
          : 'Film director based in Paris. Action, horror, drama, satire.',
        author: { '@type': 'Person', name: 'Philippe Tullio' },
      },
    ],
  };

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
