import Link from 'next/link'
import Container from './Container'
import { BOOKING_URL } from '@/lib/navData'


export default function Hero() {
  return (
    <section className="section relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            
            <h1 className="h1">
              Step into <span className="text-brand">limitless</span> worlds —
              <br className="hidden sm:block" /> book your squad today.
            </h1>
            <p className="mt-4 text-base text-gray-300">
              {/* TODO: Marketing subheadline */}
              Ditch the cables. No lanes. No limits. Run, dodge, and squad up across elite VR missions built for 2–8 players.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={BOOKING_URL} className="btn btn-primary">Book Now</Link>
              <a href="#video" className="btn btn-ghost">Watch Trailer</a>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-400 sm:grid-cols-3">
              <li>✔️ 229+ ★★★★★ reviews</li>
              <li>✔️ 2–8 players</li>
              <li>✔️ 30–45 min sessions</li>
            </ul>
          </div>


          {/* Video block */}
          <div id="video" className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {/* Replace with an actual embed or local video */}
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" /* TODO: replace */
              title="Arena Trailer"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-[size:24px_24px]" />
    </section>
  )
}