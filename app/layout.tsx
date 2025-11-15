import type { Metadata } from "next";
import "./globals.css";
import { seoKeywords } from "@/lib/seoKeywords";
import Script from "next/script";
import { montserrat, poppins } from './fonts'
import Footer from "@/components/Footer";
import AnalyticsClient from "@/components/AnalyticsClient";
import EnhancedTracking from "@/components/EnhancedTracking";
import { Suspense } from "react";
import ConditionalHeader from "@/components/ConditionalHeader";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
// const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

const siteUrl = "https://zlwebster.com";


export const metadata: Metadata = {
  title: "VR Arena Houston | Zero Latency VR Webster",
  description: "Free-roam VR in Webster, Houston. Up to 8 players. Zombie survival, sci-fi missions, PvP esports, and family-friendly worlds. Book now.",
  keywords: seoKeywords,
  authors: [{ name: "Zero Latency VR Houston, Webster" }],
  creator: "Zero Latency VR Houston, Webster",
  publisher: "Zero Latency VR Houston, Webster",
  applicationName: "Zero Latency VR Houston, Webster",
  generator: "Next.js",
  metadataBase: new URL("https://zlwebster.com/"),
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "VR Arena Houston | Zero Latency VR Webster",
    description:
      "Free-roam VR in Webster, Houston. Up to 8 players. Zombie survival, sci-fi missions, PvP esports, and family-friendly worlds. Book now.",
    siteName: "Zero Latency VR Webster",
    url: "https://zlwebster.com/",
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
  twitter: {
    card: "summary_large_image",
    title: "VR Arena Houston | Zero Latency VR Webster",
    description: "Free-roam VR in Webster, Houston. Up to 8 players. Zombie survival, sci-fi missions, PvP esports, and family-friendly worlds.",
    images: ["https://zlwebster.com/OG.jpg"],
    creator: "@zlwebster",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://zlwebster.com/",
    languages: {
      "en-US": "https://zlwebster.com/",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://zlwebster.com/#organization",
  "name": "Zero Latency VR Houston, Webster",
  "legalName": "Zero Latency VR Houston, Webster",
  "url": "https://zlwebster.com/",
  "logo": "https://zlwebster.com/ZL-W.png",
  "foundingDate": "2025",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+14694049149",
    "contactType": "Customer Service",
    "email": "zero@zlwebster.com",
    "areaServed": "US",
    "availableLanguage": "en"
  },
  "sameAs": [
    "https://www.facebook.com/zerolatencywebstr",
    "https://www.instagram.com/zerolatencywebstr",
    "https://www.tiktok.com/@zerolatencywebstr",
    "https://www.youtube.com/@ZeroLatencyWebster",
    "https://twitter.com/zlwebster"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "BayWay Village Shopping Center, 20801 Gulf Fwy suite 5",
    "addressLocality": "Webster",
    "addressRegion": "TX",
    "postalCode": "77598",
    "addressCountry": "US"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://zlwebster.com/#website",
  "url": "https://zlwebster.com/",
  "name": "Zero Latency VR Houston, Webster",
  "description": "Free-roam VR in Webster, Houston. Up to 8 players. Zombie survival, sci-fi missions, PvP esports, and family-friendly worlds.",
  "publisher": { "@id": "https://zlwebster.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://zlwebster.com/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
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
        <script async src='https://ob.roundprincemusic.com/i/60cfd871c3e2b06cd7d075be4ab3c0b8.js' data-ch='zlwebster.com' className='ct_clicktrue_92592' data-jsonp='onCheqResponse'></script>
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1446504206776301');
      fbq('track', 'PageView');
    `,
          }}
        />

        {GA_ID && (
          <>
            <Script
              id="ga4"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <noscript><iframe src='https://obs.roundprincemusic.com/ns/60cfd871c3e2b06cd7d075be4ab3c0b8.html?ch=zlwebster.com' width='0' height='0' style={{display:'none'}}></iframe></noscript>
        {/* Create session immediately - before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Skip dashboard pages
                if (window.location.pathname.startsWith('/dashboard')) return;
                
                // Check if session already exists in localStorage
                var storedUuid = localStorage.getItem('tracking_session_uuid');
                var storedTimestamp = localStorage.getItem('tracking_session_timestamp');
                var SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
                
                if (storedUuid && storedTimestamp) {
                  var timestamp = parseInt(storedTimestamp, 10);
                  var now = Date.now();
                  if (now - timestamp < SESSION_TIMEOUT) {
                    // Valid session exists, set it on window for React component
                    window.trackingUUID = storedUuid;
                    window.trackingInitialized = true;
                    return;
                  }
                }
                
                // Create new session immediately
                var path = window.location.pathname;
                var fullUrl = window.location.href;
                var referrer = document.referrer || '';
                
                // Minimal device info (can be enriched later)
                var deviceInfo = {
                  device_type: window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop',
                  os_name: 'Unknown',
                  os_version: 'unknown',
                  browser_name: navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Safari') ? 'Safari' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Unknown',
                  browser_version: '',
                  is_webview: 'false',
                  webview_host: '',
                  screen_resolution: window.screen ? window.screen.width + 'x' + window.screen.height : '',
                  viewport: window.innerWidth + 'x' + window.innerHeight,
                  device_pixel_ratio: String(window.devicePixelRatio || 1),
                  language: navigator.language || '',
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
                  hardware_concurrency: String(navigator.hardwareConcurrency || ''),
                  device_memory_gb: String(navigator.deviceMemory || ''),
                  network_effective_type: navigator.connection?.effectiveType || '',
                  save_data: String(navigator.connection?.saveData || false),
                  touch_support: String('ontouchstart' in window || navigator.maxTouchPoints > 0),
                  page_location: fullUrl,
                  page_referrer: referrer
                };
                
                // Track if page has loaded (will be set to true after 2 seconds)
                window.trackingPageLoaded = false;
                var pageLoadTimeout = setTimeout(function() {
                  window.trackingPageLoaded = true;
                }, 2000);
                
                // Fire request immediately - don't wait for anything
                fetch('/api/visits', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ path: path, deviceInfo: deviceInfo }),
                  keepalive: true
                })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                  if (data.uuid) {
                    window.trackingUUID = data.uuid;
                    window.trackingInitialized = true;
                    localStorage.setItem('tracking_session_uuid', data.uuid);
                    localStorage.setItem('tracking_session_timestamp', Date.now().toString());
                  }
                })
                .catch(function(err) {
                  console.error('Failed to initialize tracking:', err);
                });
                
                // Handle early exit - if user leaves before page loads
                var handleUnload = function() {
                  clearTimeout(pageLoadTimeout);
                  // If page didn't load and we have a UUID, mark as leftBeforeLoad
                  if (!window.trackingPageLoaded && window.trackingUUID) {
                    var statusData = JSON.stringify({
                      uuid: window.trackingUUID,
                      type: 'status',
                      leftBeforeLoad: true
                    });
                    
                    if (navigator.sendBeacon) {
                      navigator.sendBeacon('/api/visits', new Blob([statusData], { type: 'application/json' }));
                    } else {
                      fetch('/api/visits', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: statusData,
                        keepalive: true
                      }).catch(function() {});
                    }
                  }
                };
                
                // Add unload listeners
                window.addEventListener('beforeunload', handleUnload);
                window.addEventListener('pagehide', handleUnload);
                document.addEventListener('visibilitychange', function() {
                  if (document.visibilityState === 'hidden' && !window.trackingPageLoaded && window.trackingUUID) {
                    handleUnload();
                  }
                });
              })();
            `,
          }}
        />
        <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
        <Suspense><AnalyticsClient /></Suspense>
        <Suspense><EnhancedTracking /></Suspense>
        <Suspense><ConditionalHeader /></Suspense>
        <Script id="organization-schema-ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Script id="website-schema-ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <Script id="nav-schema-ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }} />
        <main id="main-content" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
