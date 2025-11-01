// src/app/games/sol-raiders/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookGameButton from "@/components/BookBtn";
import { Flag, Trophy, UserCog, Zap } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";
export const metadata: Metadata = {
  title: "Sol Raiders - Team PvP VR Battle | Zero Latency VR Houston, Webster",
  description:
    "Compete in team-vs-team PvP VR. Two squads of up to 4 battle for control of energy cores in futuristic arenas. High-adrenaline esports-style VR in Houston.",
  alternates: {
    canonical: "https://zlwebster.com/games/sol-raiders",
  },
  openGraph: {
    title: "Sol Raiders - Team PvP VR Battle | Zero Latency VR Houston, Webster",
    description:
      "Team-vs-team PvP VR. Two squads compete in an esports-style arena for up to 8 players.",
    url: "https://zlwebster.com/games/sol-raiders",
    type: "website",
    images: [
      {
        url: "https://zlwebster.com/game-sol-raiders.webp",
        width: 1200,
        height: 630,
        alt: "Sol Raiders PvP teams clash in a futuristic VR arena.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sol Raiders - Team PvP VR Battle | Zero Latency VR Houston, Webster",
    description: "Team-vs-team PvP VR. Compete in an esports-style arena for up to 8 players.",
    images: ["https://zlwebster.com/game-sol-raiders.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Reusable visual card (16:9 image, text below)
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

export default function SolRaidersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Games", url: "https://zlwebster.com/games" },
    { name: "Sol Raiders", url: "https://zlwebster.com/games/sol-raiders" },
  ]);

  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": "https://zlwebster.com/games/sol-raiders#game",
    "name": "Sol Raiders",
    "description": "Compete in Sol Raiders, a team-vs-team VR shootout. Two squads of up to 4 each battle across futuristic arenas in a quest for a precious energy source in this esports-style free-roam VR game.",
    "url": "https://zlwebster.com/games/sol-raiders",
    "image": "https://zlwebster.com/game-sol-raiders.webp",
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
      "ratingCount": "142"
    },
    "genre": ["PvP", "Competitive", "Shooter", "eSports"],
    "numberOfPlayers": "2-8",
    "playMode": "Multiplayer",
    "gameItem": "VR Experience"
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="game-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
      <article itemScope itemType="https://schema.org/VideoGame">
        <meta itemProp="name" content="Sol Raiders" />
        <main id="main-content">
      <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">
        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center text-center py-20 lg:py-0">
          <div className="absolute inset-0 z-0">
            <Image
              src="/sol-raiders-hero-bg.webp"
              alt="Neon-lit sci-fi arena with energy cores pulsing at center."
              layout="fill"
              objectFit="cover"
              className="opacity-25"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
              Sol Raiders <span className="text-stroke-blue">Competitive Team PvP VR Showdown</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              Two squads of up to 4 battle across futuristic arenas to capture the <strong>Sol</strong>,
              a priceless energy source. Cover, communicate, and outplay the opposition in an
              esports-style free-roam VR match.
            </p>
            <div className="mt-10">
              <BookGameButton label="ENTER THE ARENA" source="sol-raiders-hero" />
            </div>
          </div>
        </section>

        <section className="bg-gray-900/50 border-t border-b border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <Zap size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">High-Speed PvP</h3>
                <p className="text-sm text-gray-400">Adrenaline-Fueled Combat</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <UserCog size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Class-Based Heroes</h3>
                <p className="text-sm text-gray-400">Master Unique Abilities</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Flag size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Objective-Based Modes</h3>
                <p className="text-sm text-gray-400">Teamwork is Key</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Trophy size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Competitive eSports</h3>
                <p className="text-sm text-gray-400">Climb the Ranks</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/sol-raiders-trailer.mp4"
                                thumbnailSrc="/sol-raiders-trailer-thumbnail.webp"
                                thumbnailAlt="Sol Raiders trailer"
                            />
                        </div>
                    </section>

        {/* INTRO / CONCEPT */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                YOU’LL BE <span className="text-stroke-blue">UP AGAINST EACH OTHER</span>
              </h2>
            </div>

            <div className="space-y-8">
              <VisualFeatureCard
                imgSrc="/sol-raiders-team.webp"
                imgAlt="Two four-player VR teams facing off in a glowing arena."
                title="Build Your Crew, Claim the Sol"
              >
                In <strong>Sol Raiders</strong>, the galaxy’s most valuable energy source is up for grabs—and
                only one team walks away with it. Think laser tag or paintball reimagined in a massive
                sci-fi world with no physical barriers. It’s fast, frenetic, and as close to
                <em> VR esports </em> as it gets.
              </VisualFeatureCard>

              <div className="grid md:grid-cols-2 gap-8">
                <VisualFeatureCard
                  imgSrc="/sol-raiders-8p.webp"
                  imgAlt="Eight players split into two squads, red vs blue."
                  title="Up to 8 Players (4v4)"
                >
                  Split into two squads and spawn on opposite sides of the map. Capture objectives, move the
                  Sol energy core, or lock down control points. Get tagged? No stress—quick respawns keep the
                  action flowing so the next push is never far away.
                </VisualFeatureCard>

                <VisualFeatureCard
                  imgSrc="/sol-raiders-commms.webp"
                  imgAlt="Players calling positions and coordinating flanks."
                  title="Teamwork > Lone-Wolf"
                >
                  Communication wins matches. Call enemy positions, coordinate flanks, set bait, and trade
                  eliminations. Strategy, timing, and positioning beat raw aim every time.
                </VisualFeatureCard>
              </div>
            </div>
          </div>
        </section>

        {/* MAPS & OBJECTIVES */}
        <section className="py-20 sm:py-24 bg-gray-900/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                THREE <span className="text-stroke-blue">UNIQUE WORLDS</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Every arena brings a fresh objective—but the mission never changes: outscore the other team.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <VisualFeatureCard
                imgSrc="/sol-raiders-turbine.webp"
                imgAlt="Wind-swept industrial platform of Turbine Station."
                title="Turbine Station"
              >
                Keep your nerves in cross-breezes and tight catwalks. Hold zones, deny routes, and time your
                pushes to break through rotating cover.
              </VisualFeatureCard>

              <VisualFeatureCard
                imgSrc="/sol-raiders-dark-wreck.webp"
                imgAlt="Derelict hulk packed with cover and sightlines."
                title="Dark Wreck"
              >
                Embrace deception. Lurk among wreckage for ambushes, run decoys, and collapse on exposed carriers.
              </VisualFeatureCard>

              <VisualFeatureCard
                imgSrc="/sol-raiders-mining.webp"
                imgAlt="Sun-baked canyon with bridges and vertical lanes."
                title="Mining Canyon"
              >
                Vertical lanes and long sightlines make every peek a commitment. Control bridges, rotate fast,
                and escort the Sol all the way home.
              </VisualFeatureCard>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <Image
                  src="/sol-raiders-objectives.webp"
                  alt="Players escorting the Sol core through fire under cover."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-3xl font-poppins font-bold text-white">
                  THREE <span className="text-stroke-blue">OBJECTIVE TYPES</span>
                </h3>
                <p className="mt-4 text-lg text-gray-300">
                  Defend your carrier, capture and hold, or run misdirection as a decoy—each scenario demands
                  different tactics. Swap roles, try new strats, and run it back for bragging rights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPETITIVE / ESPORTS */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                BUILT FOR <span className="text-stroke-blue">COMPETITION</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Sol Raiders feels like a <strong>VR eSport</strong>: fast rounds, balanced loadouts, constant
                respawns, and a scoreboard that fuels the rivalry. Perfect for mini-tournaments and office
                showdowns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <VisualFeatureCard
                imgSrc="/sol-raiders-esports.webp"
                imgAlt="Teams huddled up before a match."
                title="Run a Bracket"
              >
                Bring a big group and we’ll help seed squads. Winners advance—losers cheer (and buy the next round).
              </VisualFeatureCard>

              <VisualFeatureCard
                imgSrc="/sol-raiders-leaderboard.webp"
                imgAlt="Glowing leaderboard with match stats."
                title="Chase the Glory"
              >
                Avenge losses, prove wins, and keep iterating strategies until your squad tops the board.
              </VisualFeatureCard>

              <VisualFeatureCard
                imgSrc="/sol-raiders-gear.webp"
                imgAlt="Players sprinting and ducking behind cover in free-roam space."
                title="Free-Roam Intensity"
              >
                This is warehouse-scale VR. You’ll physically duck, flank, and push objectives together—VR PvP that
                feels real.
              </VisualFeatureCard>
            </div>
          </div>
        </section>

        {/* AUDIENCE + CROSS-LINKS */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/50 p-8 rounded-lg border border-gray-800">
              <div className="prose prose-invert max-w-none text-center lg:text-left">
                <h2 className="text-3xl font-poppins text-white font-black sm:text-4xl">
                  READY TO <span className="text-stroke-blue">RAID THE SOL?</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-200">
                  Perfect for competitive gamers, friend groups, bachelor parties, and company team events
                  (Sales vs Engineering, anyone?). Want co-op instead? Try{" "}
                  <Link href="/games/outbreak" className="font-bold text-cyan-400 hover:underline">
                    Outbreak
                  </Link>{" "}
                  or{" "}
                  <Link href="/games/far-cry-vr" className="font-bold text-cyan-400 hover:underline">
                    Far Cry VR
                  </Link>
                  .
                </p>
                <div className="mt-6 p-4 rounded-md bg-cyan-900/30 border border-cyan-800">
                  <p className="text-gray-200">
                    VR PvP game • team deathmatch VR • VR tournament Houston • player vs player VR in Houston
                  </p>
                </div>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/sol-raiders-raided.webp"
                  alt="A Girl Raiding SOL"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">
              HOUSTON’S ULTIMATE <span className="text-stroke-blue">VR SHOWDOWN</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Do you have what it takes to conquer the arena? Gather your squad and step into Sol Raiders.
              Loser buys the next round—so fight hard and have a blast!
            </p>
            <BookGameButton label="BOOK YOUR PVP MATCH" source="sol-raiders-final-cta" />
          </div>
        </section>
      </div>
    </main>
    </article>
    </>
  );
}
