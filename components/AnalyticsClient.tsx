'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { pageview, track } from '@/lib/ga';
import { buildEnvParams, enrichWithClientHints } from '@/lib/env';
import { fbqTrack } from '@/lib/meta';

export default function AnalyticsClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const qs = searchParams?.toString();
    const url = pathname + (qs ? `?${qs}` : '');
    const ref = document.referrer || undefined;
    

    // Fire the GA4 pageview
    track('zlwebster', { page_location: url });
    pageview(url);
    

    // Enriched page_view
    const env = buildEnvParams(url, ref);
    track('page_view_enriched', env);
    fbqTrack('PageView', env);

    // Optional client hints update
    enrichWithClientHints(env).then((updates) => {
      if (Object.keys(updates).length) {
        track('env_enriched_ch', updates);
      }
    });

    // 🔹 Add the interaction ping here
    const start = performance.now();
    const timer = setTimeout(() => {
      track('interaction_ping', {
        engagement_time_msec: Math.round(performance.now() - start),
      });
    }, 5000);

    // Cleanup: if user navigates away before 5s, don’t fire
    return () => clearTimeout(timer);

  }, [pathname, searchParams]);

  return null;
}
