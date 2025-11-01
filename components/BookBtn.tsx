"use client";

import { useRef, useCallback } from "react";
import { BOOKING_URL } from "@/lib/navData";
import { track } from "@/lib/ga";
import { fbqTrack } from "@/lib/meta";

export default function BookGameButton({
  className = "",
  label = "BOOK A GAME",
  source = "header",
  link = BOOKING_URL
}: {
  className?: string;
  label?: string;
  source?: string; // where the CTA lives (header/hero/footer)
  link?: string;
}) {
  const hasTracked = useRef<boolean>(false);

  const trackCTA = useCallback(() => {
    // Only track once
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Fire analytics events
    track?.("cta_click", { source, label });
    fbqTrack('Book Now Clicked', { value: 0, currency: 'USD' });
    
    // Track for dashboard analytics
    const trackingUUID = typeof window !== 'undefined' ? (window as Window & { trackingUUID?: string }).trackingUUID : undefined;
    if (trackingUUID) {
      const trackingData = JSON.stringify({
        uuid: trackingUUID,
        type: "cta",
        source: source,
        label: label,
        ctaType: "booking",
        url: link,
      });
      
      // Use sendBeacon - it's guaranteed to complete even if page navigates
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/visits",
          new Blob([trackingData], { type: "application/json" })
        );
      } else if (navigator.sendBeacon === undefined) {
        // Fallback: use fetch with keepalive
        fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: trackingData,
          keepalive: true,
        }).catch(() => {});
      }
    }
  }, [source, label, link]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Mark element immediately to prevent global handler from tracking
    e.currentTarget.setAttribute('data-cta-tracked', 'true');
    
    // Track the CTA
    trackCTA();
    
    // Open link after a tiny delay to ensure beacon is sent
    setTimeout(() => {
      window.open(link, '_blank', 'noopener,noreferrer');
    }, 50);
  }, [link, trackCTA]);

  return (
    <a
      href={link}
      rel="external nofollow noopener noreferrer"
      onClick={handleClick}
      data-cta-handled="true"
      data-cta-source={source}
      className={`
        inline-flex items-center justify-center
        bg-transparent
        hover:bg-[#00bcd4]
        text-[#00bcd4]
        hover:text-white
        font-semibold
        p-4
        mt-4
        border-2
        border-[#00bcd4]
        text-xl
        rounded-full
        transition-colors
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-[#00bcd4]
        ${className}
      `}
    >
      {label}
    </a>
  );
}
