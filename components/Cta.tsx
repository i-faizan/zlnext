"use client";

import { track } from "@/lib/ga";
import { fbqTrack } from "@/lib/meta";
import {EXPERIENCE_URL } from "@/lib/navData";
import React, { useEffect, useRef, useCallback } from "react";
import YouTubeEmbed from "./YoutubeEmbed";

export default function CTA() {
  const hasTracked = useRef<boolean>(false);

  const trackCTA = useCallback(() => {
    // Only track once
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Fire analytics events
    track('challenge', { link_url: EXPERIENCE_URL });
    fbqTrack('challenge', { value: 0, currency: 'USD' });
    
    // Track for dashboard analytics
    const trackingUUID = typeof window !== 'undefined' ? (window as Window & { trackingUUID?: string }).trackingUUID : undefined;
    if (trackingUUID) {
      const trackingData = JSON.stringify({
        uuid: trackingUUID,
        type: "cta",
        source: "challenge",
        label: "TAKE THE CHALLENGE",
        ctaType: "other",
        url: EXPERIENCE_URL,
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
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Mark element immediately to prevent global handler from tracking
    e.currentTarget.setAttribute('data-cta-tracked', 'true');
    
    // Track the CTA
    trackCTA();
    
    // Open link after a tiny delay to ensure beacon is sent
    setTimeout(() => {
      window.open(EXPERIENCE_URL, '_blank', 'noopener,noreferrer');
    }, 50);
  }, [trackCTA]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center blur-2xl scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-4xl font-poppins text-stroke-blue font-black sm:text-6xl">
          NOT JUST VIRTUAL
        </h1>
        <h2 className="text-5xl font-montserrat font-black text-white sm:text-7xl">
          TRULY REAL
        </h2>
        <div className="relative w-full overflow-hidden rounded-2xl border mt-10 border-white/10 bg-black/20">
                      <div className="aspect-[16/9]">
                        <YouTubeEmbed videoId="1_1-uJXPIRE" />
                      </div>
                    </div>
        <button
          onClick={handleClick}
          data-cta-handled="true"
          data-cta-source="challenge"
          rel="noopener noreferrer"
          className="btn text-xl p-8 mt-10 btn-outline text-white rounded-3xl border-[#00bcd4]"
        >
          TAKE THE CHALLENGE
        </button>
      </div>
    </section>
  );
}
