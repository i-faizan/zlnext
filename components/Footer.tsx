'use client';

import React, { useRef, useCallback } from 'react';
import Link from 'next/link';
import Container from './Container';
import { BOOKING_URL } from '@/lib/navData';
import { track } from '@/lib/ga';
import { fbqTrack } from '@/lib/meta';
import Counter from './Counter';
import { Instagram, Facebook, Music2, Youtube } from 'lucide-react';

const socials = [
  { name: 'Instagram', href: 'https://instagram.com/zerolatencywebstr', icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/zerolatencywebstr', icon: Facebook },
  { name: 'TikTok', href: 'https://tiktok.com/@zerolatencywebstr', icon: Music2 },
  { name: 'YouTube', href: 'https://youtube.com/@ZeroLatencyWebster', icon: Youtube },
];


export default function Footer() {
  const hasTracked = useRef<boolean>(false);

  const trackCTA = useCallback(() => {
    // Only track once
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Fire analytics events
    track('zl_bn_footer', { link_url: BOOKING_URL });
    fbqTrack('zl_bn_footer', { value: 0, currency: 'USD' });
    
    // Track for dashboard analytics
    const trackingUUID = (window as any).trackingUUID;
    if (trackingUUID) {
      const trackingData = JSON.stringify({
        uuid: trackingUUID,
        type: "cta",
        source: "footer",
        label: "Book a Game",
        ctaType: "booking",
        url: BOOKING_URL,
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
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
    }, 50);
  }, [trackCTA]);


  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="relative border-t border-white/10 bg-gradient-to-b from-[#0b0f14] to-black">
        <Container>
          <div className="grid gap-10 py-12 md:grid-cols-12 p-4">
            {/* Brand / about */}
            <div className="md:col-span-5">
              <div className="mb-4 flex  items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-brand shadow-[0_0_24px_-6px] shadow-brand/60" />
                <span className="text-sm font-semibold uppercase tracking-wide text-white">
                  Zero Latency VR Webster
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Houston&apos;s premier free-roam VR arena. Experience immersive virtual reality adventures with friends, family, and colleagues.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/experiences" className="text-gray-400 hover:text-white transition">Experiences</Link></li>
                <li><Link href="/games" className="text-gray-400 hover:text-white transition">Games</Link></li>
                <li><Link href="/what-to-expect" className="text-gray-400 hover:text-white transition">What to Expect</Link></li>
                <li><Link href="/private-events" className="text-gray-400 hover:text-white transition">Private Events</Link></li>
                <li><Link href="/contact-us" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Hours */}
            <div className="md:col-span-4">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Hours</h3>
              <dl className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <dt>Monday</dt><dd className="text-right"><time dateTime="15:00">3:00pm</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
                <div className="flex justify-between">
                  <dt>Tuesday</dt><dd className="text-right"><time dateTime="15:00">3:00pm</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
                <div className="flex justify-between">
                  <dt>Wednesday</dt><dd className="text-right"><time dateTime="15:00">3:00pm</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
                <div className="flex justify-between">
                  <dt>Thursday</dt><dd className="text-right"><time dateTime="15:00">3:00pm</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
                <div className="flex justify-between">
                  <dt>Friday</dt><dd className="text-right"><time dateTime="15:00">3:00pm</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
                <div className="flex justify-between">
                  <dt>Saturday</dt><dd className="text-right"><time dateTime="11:00">11:00am</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
                <div className="flex justify-between">
                  <dt>Sunday</dt><dd className="text-right"><time dateTime="11:00">11:00am</time> - <time dateTime="23:00">11:00pm</time></dd>
                </div>
              </dl>
            </div>

            {/* Book */}
            <div className="md:col-span-12">
              <div className="mt-2 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Ready to squad up?
                  </p>
                  <p className="text-sm text-gray-300">
                    Reserve your arena and jump into the action.
                  </p>
                </div>
                <button
                  onClick={handleClick}
                  data-cta-handled="true"
                  data-cta-source="footer"
                  className="inline-flex items-center justify-center rounded-full
                             bg-brand px-6 py-3 text-sm font-semibold text-white
                             shadow-[0_8px_30px_rgba(0,200,255,.25)]
                             transition hover:shadow-[0_8px_36px_rgba(0,200,255,.35)]"
                >
                  Book a Game
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-gray-400 sm:flex-row">
            <p>© {year} Zero Latency Webster. All rights reserved.</p>
            {<Counter />}
            <ul className="flex items-center gap-4">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition hover:text-white"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
