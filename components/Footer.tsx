'use client';

import React from 'react';
import Link from 'next/link';
import Container from './Container';
import { BOOKING_URL } from '@/lib/navData';
import { track } from '@/lib/ga';
import { fbqTrack } from '@/lib/meta';
import Counter from './Counter';

const socials = [
  { name: 'Instagram', href: 'https://instagram.com/zerolatencywebstr', icon: InstaIcon },
  { name: 'Facebook', href: 'https://facebook.com/zerolatencywebstr', icon: FbIcon },
  { name: 'TikTok', href: 'https://tiktok.com/@zerolatencywebstr', icon: TiktokIcon },
  { name: 'YouTube', href: 'https://youtube.com/@ZeroLatencyWebster', icon: YtIcon },
];


export default function Footer() {

  const handleClick = () => {
    // Fire GA4 event
    track('zl_bn_footer', { link_url: BOOKING_URL });
    // Fire Meta Pixel event
    fbqTrack('zl_bn_footer', { value: 0, currency: 'USD' });
    setTimeout(() => {
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
    }, 200);
  };


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
                  Zero Latency Webster
                </span>
              </div>
              <p className="max-w-md text-sm leading-6 text-gray-300">
                Texas’ most immersive free-roam VR arena. Squad up for zombie
                survival, space ops, and more across a massive play area with
                no cables and no limits.
              </p>

              {/* Socials */}
              <div className="mt-5 flex items-center gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-full
                               bg-white/5 ring-1 ring-white/10 transition
                               hover:bg-white/10 hover:ring-white/20"
                  >
                    <Icon className="h-4 w-4 text-gray-300 transition group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>


            {/* Visit / Hours */}
            <div className="md:col-span-4">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Visit Us
              </h2>
              <ul className="space-y-2 text-sm text-gray-300" itemScope itemType="https://schema.org/PostalAddress">
                <li>
                  <span className="font-medium text-white">Address:</span>{' '}
                  <span itemProp="streetAddress">BayWay Village Shopping Center, 20801 Gulf Fwy suite 5</span>, <span itemProp="addressLocality">Webster</span>, <span itemProp="addressRegion">TX</span> <span itemProp="postalCode">77598</span>, <span itemProp="addressCountry">United States</span>
                </li>
                <li>
                  <span className="font-medium text-white">Phone:</span>{' '}
                  <a href="tel:+14694049149" className="hover:underline" itemProp="telephone">
                    (469) 404-9149
                  </a>
                </li>
                <li>
                  <span className="font-medium text-white">Email:</span>{' '}
                  <a href="mailto:zero@zlwebster.com" className="hover:underline" itemProp="email">
                    zero@zlwebster.com
                  </a>
                </li>
              </ul>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4" itemScope itemType="https://schema.org/OpeningHoursSpecification">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Hours
                </p>
                <dl className="grid grid-cols-2 gap-y-1 text-sm text-gray-300">
                  <dt>Monday</dt><dd className="text-right"><time dateTime="16:00">04:00pm</time> - <time dateTime="21:30">09:30pm</time></dd>
                  <dt>Tuesday</dt><dd className="text-right"><time dateTime="16:00">04:00pm</time> - <time dateTime="21:30">09:30pm</time></dd>
                  <dt>Wednesday</dt><dd className="text-right"><time dateTime="14:00">02:00pm</time> - <time dateTime="21:30">09:30pm</time></dd>
                  <dt>Thursday</dt><dd className="text-right"><time dateTime="14:00">02:00pm</time> - <time dateTime="21:30">09:30pm</time></dd>
                  <dt>Friday</dt><dd className="text-right"><time dateTime="11:00">11:00am</time> - <time dateTime="23:00">11:00pm</time></dd>
                  <dt>Saturday</dt><dd className="text-right"><time dateTime="11:00">11:00am</time> - <time dateTime="23:00">11:00pm</time></dd>
                  <dt>Sunday</dt><dd className="text-right"><time dateTime="11:00">11:00am</time> - <time dateTime="23:00">11:00pm</time></dd>
                </dl>
              </div>
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
              <li>
                {/* <Link href="/terms" className="hover:text-gray-200">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gray-200">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-gray-200">
                  Safety
                </Link> */}
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* ---- Icons (inline, no deps) ---- */
function InstaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function FbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14.5 8H16V5.2h-2c-2.2 0-3.5 1.3-3.5 3.5V11H8v2.7h2.5V21h3V13.7H16L16.5 11h-3V8.8c0-.7.3-1.2 1-1.2Z" fill="currentColor" />
    </svg>
  );
}
function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M17.5 7.2a5.9 5.9 0 0 0 3.8 1.3V11a8.3 8.3 0 0 1-3.9-1v5.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3a2.7 2.7 0 1 0 1.8 2.5V3.5h3.1v3.7Z" fill="currentColor" />
    </svg>
  );
}
function YtIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M22 12s0-3.1-.4-4.6a3.1 3.1 0 0 0-2.2-2.2C17.9 4.4 12 4.4 12 4.4s-5.9 0-7.4.8A3.1 3.1 0 0 0 2.4 7.4C2 8.9 2 12 2 12s0 3.1.4 4.6a3.1 3.1 0 0 0 2.2 2.2c1.5.8 7.4.8 7.4.8s5.9 0 7.4-.8a3.1 3.1 0 0 0 2.2-2.2c.4-1.5.4-4.6.4-4.6Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9.75v4.5l4-2.25-4-2.25Z" fill="currentColor" />
    </svg>
  );
}
