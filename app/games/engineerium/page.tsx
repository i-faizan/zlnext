// src/app/games/engineerium/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookGameButton from "@/components/BookBtn";
import { Eye, Puzzle, Recycle, Users } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";

export const metadata: Metadata = {
  title: "Engineerium – Surreal Puzzle VR Adventure | Zero Latency VR Houston, Webster",
  description:
    "Family-friendly VR puzzle adventure. Walk among floating islands, solve mind-bending puzzles, and defy gravity. No guns, no gore. Perfect for all ages.",
  authors: [{ name: "Zero Latency VR Houston, Webster" }],
  creator: "Zero Latency VR Houston, Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/games/engineerium",
  },
  openGraph: {
    title: "Engineerium – Surreal Puzzle VR Adventure | Zero Latency VR Houston, Webster",
    description:
      "Family-friendly VR puzzle adventure. Explore floating islands and solve mind-bending challenges. No guns, no gore.",
    url: "https://zlwebster.com/games/engineerium",
    type: "website",
    images: [
      {
        url: "https://zlwebster.com/game-engineerium.webp",
        width: 1200,
        height: 630,
        alt:
          "Engineerium VR: floating islands and ancient machinery in a vibrant alien sky.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineerium – Surreal Puzzle VR Adventure | Zero Latency VR Houston, Webster",
    description: "Family-friendly VR puzzle adventure. Explore floating islands and solve mind-bending challenges.",
    images: ["https://zlwebster.com/game-engineerium.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Shared card: 16:9 media on top, copy below
const VisualFeatureCard = ({
  imgSrc,
  imgAlt,
  title,
  children,
}: {
  imgSrc: string;
  imgAlt: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg overflow-hidden group border-2 border-gray-800/50 bg-gray-900/50 flex flex-col transition-all duration-300 hover:border-cyan-500/70 hover:shadow-2xl hover:shadow-cyan-900/40">
    <div className="relative w-full">
      <div style={{ paddingTop: "56.25%" }} />
      <div className="absolute inset-0">
        <Image
          src={imgSrc}
          alt={imgAlt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          priority
        />
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-poppins font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{children}</p>
    </div>
  </div>
);

export default function EngineeriumPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Games", url: "https://zlwebster.com/games" },
    { name: "Engineerium", url: "https://zlwebster.com/games/engineerium" },
  ]);

  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": "https://zlwebster.com/games/engineerium#game",
    "name": "Engineerium",
    "description": "Enter the magical world of Engineerium, a family-friendly VR experience. Walk among floating islands and solve mind-bending puzzles in a beautiful alien realm – all in free-roam VR with no guns or gore.",
    "url": "https://zlwebster.com/games/engineerium",
    "image": "https://zlwebster.com/game-engineerium.webp",
    "gameLocation": {
      "@type": "Place",
      "name": "Zero Latency VR Houston, Webster",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BayWay Village Shopping Center, 20801 Gulf Fwy suite 5",
        "addressLocality": "Webster",
        "addressRegion": "TX",
        "postalCode": "77598",
        "addressCountry": "US"
      }
    },
    "applicationCategory": "Game",
    "operatingSystem": "VR Platform",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "url": "https://booking.zerolatencyvr.com/en/book-now/webster"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "175"
    },
    "genre": ["Puzzle", "Adventure", "Family-Friendly", "Exploration"],
    "numberOfPlayers": "1-8",
    "playMode": "Multiplayer",
    "gameItem": "VR Experience"
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Engineerium - Gravity-Defying VR Puzzle World Trailer | Zero Latency VR Houston, Webster",
    "description": "Watch the trailer for Engineerium, a family-friendly VR puzzle adventure with gravity-defying worlds.",
    "thumbnailUrl": "https://zlwebster.com/engineerium-trailer-thumbnail.jpg",
    "uploadDate": "2025-11-01",
    "contentUrl": "https://zlwebster.com/engineerium-trailer.mp4",
    "embedUrl": "https://zlwebster.com/games/engineerium#video",
    "duration": "PT1M10S",
    "publisher": {
      "@type": "Organization",
      "@id": "https://zlwebster.com/#organization",
      "name": "Zero Latency VR Houston, Webster",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zlwebster.com/ZL-W.png"
      }
    }
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="game-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
      <Script id="video-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <article itemScope itemType="https://schema.org/VideoGame">
        <meta itemProp="name" content="Engineerium" />
        <main id="main-content">
      <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">
        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center text-center py-20 lg:py-0">
          <div className="absolute inset-0 z-0">
            <Image
              src="/engineerium-hero-bg.webp"
              alt="A serene alien skyline with floating islands and ancient structures."
              layout="fill"
              objectFit="cover"
              className="opacity-25"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
              Engineerium<br /> <span className="text-stroke-blue">A Gravity-Defying VR Puzzle World</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              Walk among floating islands, solve mind-bending puzzles, and experience VR wonder—no guns, no gore.
              Perfect for first-timers, families, and anyone who loves exploration.
            </p>
            <div className="mt-10">
              <BookGameButton label="DEFY GRAVITY" source="engineerium-hero" />
            </div>
          </div>
        </section>

        <section className="bg-gray-900/50 border-t border-b border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <Puzzle size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Mind-Bending Puzzles</h3>
                <p className="text-sm text-gray-400">A Journey of Discovery</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Users size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Collaborative Play</h3>
                <p className="text-sm text-gray-400">Explore with Friends & Family</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Recycle size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Gravity-Defying World</h3>
                <p className="text-sm text-gray-400">Walk on Walls & Ceilings</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Eye size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">A Visual Spectacle</h3>
                <p className="text-sm text-gray-400">For All Ages & Abilities</p>
              </div>
            </div>
          </div>
        </section>

        <section id="video" className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/engineerium-trailer.mp4"
                                thumbnailSrc="/engineerium-trailer-thumbnail.jpg"
                                thumbnailAlt="Engineerium trailer"
                            />
                        </div>
                    </section>

        {/* CONCEPT / ATMOSPHERE */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                A <span className="text-stroke-blue">MAGICAL ANCIENT WORLD</span>
              </h2>
            </div>

            <div className="space-y-8">
              <VisualFeatureCard
                imgSrc="/engineerium-intro.webp"
                imgAlt="Floating walkways weave between sky islands and shimmering machinery."
                title="Discover a Place That Bends Reality"
              >
                Engineerium transports you to a gorgeous alien realm of floating islands, ancient machinery, and
                impossible architecture. Here, gravity doesn’t play by the rules—you may find yourself walking on
                walls or upside down as pathways twist into breathtaking vistas.
              </VisualFeatureCard>

              <div className="grid md:grid-cols-2 gap-8">
                <VisualFeatureCard
                  imgSrc="/engineerium-upside.webp"
                  imgAlt="Players strolling along a curving path that flips orientation mid-walk."
                  title="Turn the World Upside Down"
                >
                  Venture above a glistening ocean on levitating platforms and ramps that reorient your senses. Keep
                  calm, focus on your footing, and enjoy the view—way, way below.
                </VisualFeatureCard>

                <VisualFeatureCard
                  imgSrc="/engineerium-curiosity.webp"
                  imgAlt="Technicolor skies with gentle creatures drifting past."
                  title="Embrace Your Curiosity"
                >
                  This is a serene, wonder-filled journey. No zombies or gunfire—just discovery, vivid color,
                  friendly sky-creatures, and a mystical soundtrack that makes the world feel alive.
                </VisualFeatureCard>
              </div>
            </div>
          </div>
        </section>

        {/* GAMEPLAY / TEAMWORK */}
        <section className="py-20 sm:py-24 bg-gray-900/50 space-y-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <Image
                  src="/engineerium-puzzles.webp"
                  alt="Glowing symbols, rotating platforms, and paths that shift as puzzles are solved."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-3xl font-poppins font-bold text-white">
                  COOPERATIVE <span className="text-stroke-blue">PUZZLE ADVENTURE</span>
                </h3>
                <p className="mt-4 text-lg text-gray-300">
                  Progress by observing, communicating, and experimenting together. Align luminous symbols, activate
                  ancient mechanisms, and find the right path through walkways that twist in impossible ways. Two
                  heads—or eight—are better than one.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="prose prose-invert max-w-none lg:order-last">
                <h3 className="text-3xl font-poppins font-bold text-white">
                  SHORT, RELAXED, <span className="text-stroke-blue">AWE-FILLED</span>
                </h3>
                <p className="mt-4 text-lg text-gray-300">
                  Engineerium runs about <strong>15 minutes</strong> and is less physically demanding than our
                  shooters. It’s perfect as a gentle introduction to VR—or a calming cool-down between intense
                  games.
                </p>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <Image
                  src="/engineerium-scenery.webp"
                  alt="Players pausing on a floating platform to admire the sweeping view."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE / ACCESSIBILITY */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                MADE FOR <span className="text-stroke-blue">EVERYONE</span>
              </h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                Family-friendly, non-violent, and welcoming to newcomers. If you can walk, you can enjoy
                Engineerium. Great for kids, teens, parents, grandparents, school groups—and anyone who prefers
                exploration over combat.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/50 p-8 rounded-lg border border-gray-800">
              <div className="prose prose-invert max-w-none text-center lg:text-left">
                <h3 className="text-3xl font-poppins text-white font-black sm:text-4xl">
                  REUNITE THE <span className="text-stroke-blue">TRIBE</span>
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-200">
                  Work together to complete your journey, then celebrate with music, lights, and a satisfying
                  finale. We often recommend Engineerium for groups with younger players or anyone nervous about
                  VR—it’s gentle but utterly captivating.
                </p>
                <p className="mt-4 text-gray-300">
                  Looking for more adrenaline after your zen walk in the clouds? Try{" "}
                  <Link href="/games/outbreak" className="font-bold text-cyan-400 hover:underline">
                    Outbreak
                  </Link>{" "}
                  or{" "}
                  <Link href="/games/far-cry-vr" className="font-bold text-cyan-400 hover:underline">
                    Far Cry VR
                  </Link>
                  .
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/engineerium-group.webp"
                  alt="Friends smiling and pointing out landmarks in Engineerium’s sky islands."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-32 sm:py-40 text-center bg-gray-900/50">
          <div className="absolute inset-0 z-0">
            <Image
              src="/engineerium-final.webp"
              alt="Golden hour light across a chain of floating islands and arches."
              layout="fill"
              objectFit="cover"
              className="opacity-25"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">
              READY TO <span className="text-stroke-blue">DEFY GRAVITY?</span>
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-gray-200">
              Step into the magical world of Engineerium at our Houston location. Great for all ages and
              experience levels—prepare to be amazed!
            </p>
            <div className="mt-8">
              <BookGameButton label="BOOK ENGINEERIUM" source="engineerium-final-cta" />
            </div>
          </div>
        </section>
      </div>
    </main>
    </article>
    </>
  );
}
