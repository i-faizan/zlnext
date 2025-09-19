// components/ThirdPartyScripts.tsx
'use client';
import Script from 'next/script';

export function ThirdPartyScripts() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* Meta Pixel via Partytown (runs after interactive) */}
      <Script
        id="fb-pt"
        type="text/partytown"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
            n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
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

      {/* ✅ CORRECTED Google Analytics Setup for Partytown */}
      {GA_ID && (
        <>
          {/* This script now initializes dataLayer and config inside the worker */}
          <Script
            id="ga-init-pt"
            type="text/partytown"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { 
                  send_page_view: false 
                });
              `,
            }}
          />
          {/* This script loads the external GA library into the worker */}
          <Script
            id="ga-loader-pt"
            type="text/partytown"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
        </>
      )}
    </>
  );
}
