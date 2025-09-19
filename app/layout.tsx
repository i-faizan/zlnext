import type { Metadata } from "next";
import "./globals.css";
import { seoKeywords } from "@/lib/seoKeywords";
import Script from "next/script";
import { montserrat, poppins } from './fonts'
import HeaderV3 from "@/components/HeaderV3";
import Footer from "@/components/Footer";
import AnalyticsClient from "@/components/AnalyticsClient";
import { Suspense } from "react";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";
import { Partytown } from "@qwik.dev/partytown/react";

// const GA_ID = process.env.NEXT_PUBLIC_GA_ID
// const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

const siteUrl = "https://zlwebster.com";


export const metadata: Metadata = {
  title: "Virtual Reality Gaming Arena in Greater Houston | Zero Latency VR Houston, Webster",
  description: "Experience the world's most advanced VR Adventure in Webster serving Greater Houston. Up to 8 players. Zombie survival, sci-fi missions, PvP esports, and family-friendly worlds.",
  keywords: seoKeywords,
  authors: [{ name: "Zero Latency VR Houston, Webster" }],
  creator: "Zero Latency VR Houston, Webster",
  publisher: "Zero Latency VR Houston, Webster",
  applicationName: "Zero Latency VR Houston, Webster",
  generator: "Next.js",
  metadataBase: new URL("https://zlwebster.com/"),
  referrer: "origin-when-cross-origin",
  alternates: {
    languages: {
      "en-US": "https://zlwebster.com/",
    },
  },
  openGraph: {
    title: "Virtual Reality Gaming Arena in Greater Houston | Zero Latency VR Houston, Webste",
    description:
      "Experience the world's most advanced VR Adventure in Webster serving Greater Houston. Up to 8 players. Zombie survival, sci-fi missions, PvP esports, and family-friendly worlds.",
    siteName: "Zero Latency VR Webster",
    images: [
      {
        url: "https://zlwebster.com/OG.jpg",
        width: 1200,
        height: 630,
        alt: "Players enjoying a VR Game experience at Zero Latency VR Webster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const navSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "SiteNavigationElement",
        "name": "Experiences",
        "url": `${siteUrl}/experiences`
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "SiteNavigationElement",
        "name": "What to Expect",
        "url": `${siteUrl}/what-to-expect`
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "SiteNavigationElement",
        "name": "Games",
        "url": `${siteUrl}/games`,
        "hasPart": [
          { "@type": "SiteNavigationElement", "name": "Overview", "url": `${siteUrl}/games` },
          { "@type": "SiteNavigationElement", "name": "Space Marine VR", "url": `${siteUrl}/games/space-marine-vr` },
          { "@type": "SiteNavigationElement", "name": "Outbreak", "url": `${siteUrl}/games/outbreak` },
          { "@type": "SiteNavigationElement", "name": "Far Cry VR", "url": `${siteUrl}/games/far-cry-vr` },
          { "@type": "SiteNavigationElement", "name": "Undead Arena", "url": `${siteUrl}/games/undead-arena` },
          { "@type": "SiteNavigationElement", "name": "Singularity", "url": `${siteUrl}/games/singularity` },
          { "@type": "SiteNavigationElement", "name": "Sol Raiders", "url": `${siteUrl}/games/sol-raiders` },
          { "@type": "SiteNavigationElement", "name": "Engineerium", "url": `${siteUrl}/games/engineerium` }
        ]
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "SiteNavigationElement",
        "name": "Private Events",
        "url": `${siteUrl}/private-events`
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "SiteNavigationElement",
        "name": "Contact Us",
        "url": `${siteUrl}/contact-us`
      }
    }
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="999B6B7BDDC8D9C46D790CCA519C9266" />
        <Partytown
          debug={false}
          forward={['dataLayer.push', 'fbq']}
          resolveUrl={(url: URL, location: Location, _type) => {
            const h = url.hostname;
            if (
              h === 'connect.facebook.net' ||
              h === 'www.googletagmanager.com' ||
              h === 'www.google-analytics.com'
            ) {
              return new URL(
                `/api/partytown-proxy?url=${encodeURIComponent(url.href)}`,
                location.href
              );
            }
            return url;
          }}
        />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
        <Suspense><AnalyticsClient /></Suspense>
        <ThirdPartyScripts />
        <HeaderV3 />
        <Script id="nav-schema-ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }} />
        <main id="main-content" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
