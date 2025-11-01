// src/app/games/undead-arena/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookGameButton from "@/components/BookBtn";
import { Skull, Swords, Users, Zap } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";

export const metadata: Metadata = {
  title: "Undead Arena - Zombie Wave VR Shooter | Zero Latency VR Houston, Webster",
  description:
    "Step into Undead Arena, a post-apocalyptic game show where you battle zombies for fame! Only at Zero Latency Houston, this free-roam VR shooter pits up to 8 players against waves of undead in an arena packed with surprises. Compete for the high score and survive live on (virtual) TV. It’s gruesome, action-packed fun – do you have what it takes to be the champion of the Undead Arena?",
  alternates: {
    canonical: "https://zlwebster.com/games/undead-arena",
  },
  openGraph: {
    title: "Undead Arena - Zombie Wave VR Shooter | Zero Latency VR Houston, Webster",
    description:
      "Contestants wanted! Battle waves of zombies for glory in a post-apocalyptic game show. Up to 8 players. Free-roam VR.",
    url: "https://zlwebster.com/games/undead-arena",
    type: "website",
    images: [
      {
        url: "https://zlwebster.com/game-undead-arena.webp",
        width: 1200,
        height: 630,
        alt: "Undead Arena contestants fighting zombies under neon spotlights.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Undead Arena - Zombie Wave VR Shooter | Zero Latency VR Houston, Webster",
    description: "Contestants wanted! Battle waves of zombies for glory in a post-apocalyptic game show. Up to 8 players.",
    images: ["https://zlwebster.com/game-undead-arena.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Shared visual card (16:9 media, text below)
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

export default function UndeadArenaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Games", url: "https://zlwebster.com/games" },
    { name: "Undead Arena", url: "https://zlwebster.com/games/undead-arena" },
  ]);

  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": "https://zlwebster.com/games/undead-arena#game",
    "name": "Undead Arena",
    "description": "Step into Undead Arena, a post-apocalyptic game show where you battle zombies for fame! This free-roam VR shooter pits up to 8 players against waves of undead in an arena packed with surprises.",
    "url": "https://zlwebster.com/games/undead-arena",
    "image": "https://zlwebster.com/game-undead-arena.webp",
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
      "ratingCount": "158"
    },
    "genre": ["Arcade", "Wave Shooter", "Zombie", "Horror"],
    "numberOfPlayers": "1-8",
    "playMode": "Multiplayer",
    "gameItem": "VR Experience"
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="game-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
      <article itemScope itemType="https://schema.org/VideoGame">
        <meta itemProp="name" content="Undead Arena" />
        <main id="main-content">
      <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">
        {/* HERO */}
        <section className="relative min-h-[90vh] flex items-center justify-center text-center py-20 lg:py-0">
          <div className="absolute inset-0 z-0">
            <Image
              src="/undead-hero-bg.webp"
              alt="Neon-lit arena with flaming billboards and a roaring post-apocalyptic crowd."
              layout="fill"
              objectFit="cover"
              className="opacity-25"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-8 sm:px-0">
            <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
              Undead Arena <br />{" "}
              <span className="text-stroke-blue">Fight Zombies in a Post Apocalyptic Arena</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
              Welcome, contestants! Team up (up to 8 players) and survive wave after wave of zombies under
              the spotlight. Score big, trigger traps, and put on a show for the fans.
            </p>
            <div className="mt-10">
              <BookGameButton label="JOIN THE SHOW" source="undead-hero" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/undead-arena-trailer.mp4"
                                thumbnailSrc="/undead-arena-trailer-thumbnail.jpg"
                                thumbnailAlt="Undead Arena trailer"
                            />
                        </div>
                    </section>

        <section className="bg-gray-900/50 border-t border-b border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <Swords size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Arena Combat</h3>
                <p className="text-sm text-gray-400">Wave-Based Survival</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Users size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Co-op Survival</h3>
                <p className="text-sm text-gray-400">1-4 Player Squads</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Skull size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Undead Hordes</h3>
                <p className="text-sm text-gray-400">Zombies, Skeletons & More</p>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Zap size={32} className="text-cyan-400 mb-2" />
                <h3 className="text-lg font-bold font-poppins text-white">Arcade Action</h3>
                <p className="text-sm text-gray-400">High Scores & Leaderboards</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONCEPT / TONE */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                MORE THAN A GAME, <span className="text-stroke-blue">ROAD TO GLORY</span>
              </h2>
            </div>

            <div className="space-y-8">
              <VisualFeatureCard
                imgSrc="/undead-arena-stage.webp"
                imgAlt="Contestants posing in a retro 80s-styled TV arena surrounded by undead."
                title="Apocalypse Meets Game Show"
              >
                In <strong>Undead Arena</strong>, you’re the star of a tongue-in-cheek reality TV spectacle.
                The crowd wants carnage—and comedy. Fight flesh-hungry zombies, dodge hazards, and entertain the
                masses to become champions. Think <em>American Gladiators</em> meets a zombie apocalypse… in VR.
              </VisualFeatureCard>

              <div className="grid md:grid-cols-2 gap-8">
                <VisualFeatureCard
                  imgSrc="/undead-arena-weapons.webp"
                  imgAlt="Assault rifle, shotgun, and crossbow loadouts on a rack between rounds."
                  title="Pick Your Loadout"
                >
                  Choose your favorite weapon—assault rifle for sustained fire, shotgun for close-range
                  devastation, or crossbow for precision headshots. Between rounds you may snag power-ups and
                  upgrades to amp your score.
                </VisualFeatureCard>

                <VisualFeatureCard
                  imgSrc="/undead-arena-commentator.webp"
                  imgAlt="Big screens, booming host, and score overlays as zombies pour in."
                  title="Lights, Camera, Mayhem"
                >
                  An in-game commentator cheers (and jeers) your every move while spectators watch the action on
                  screens. Expect callouts, bonus objectives, and cheeky show moments.
                </VisualFeatureCard>
              </div>
            </div>
          </div>
        </section>

        {/* GAMEPLAY: WAVES / TRAPS / MOVEMENT */}
        <section className="py-20 sm:py-24 bg-gray-900/50 space-y-20">
          {/* Waves & Scoring */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <Image
                  src="/undead-arena-waves.webp"
                  alt="Contestants holding a chokepoint as tougher zombie waves approach."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-3xl font-poppins font-bold text-white">
                  WAVE-BASED <span className="text-stroke-blue">SHOWDOWN</span>
                </h3>
                <p className="mt-4 text-lg text-gray-300">
                  Survive progressively tougher waves and rack up points with kill streaks and headshots. It’s
                  cooperative survival with a twist: you’re also competing for the high score and MVP bragging
                  rights.
                </p>
              </div>
            </div>
          </div>

          {/* Traps & Neon Interactables */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="prose prose-invert max-w-none lg:order-last">
                <h3 className="text-3xl font-poppins font-bold text-white">
                  TRAPS, <span className="text-stroke-blue">TRICKS & EXPLOSIONS</span>
                </h3>
                <p className="mt-4 text-lg text-gray-300">
                  Interact with neon signs to spring booby traps, trigger satisfying chain reactions, and thin
                  the herd. Time it right to save teammates—or steal that last-hit for the leaderboard.
                </p>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <Image
                  src="/undead-arena-traps.webp"
                  alt="Players activating neon trap signage that detonates barrels around zombies."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Free-Roam Platforms */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                <Image
                  src="/undead-arena-platforms.webp"
                  alt="Moving bridges and platforms opening new angles inside the arena."
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className="prose prose-invert max-w-none">
                <h3 className="text-3xl font-poppins font-bold text-white">
                  THE ARENA IS <span className="text-stroke-blue">YOUR STAGE</span>
                </h3>
                <p className="mt-4 text-lg text-gray-300">
                  Moving platforms and bridges mean you’re never stuck in one spot. This is warehouse-scale,
                  free-roam VR—duck, flank, rotate, and keep the crowd on its feet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE & COMPETITION */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">
                WHO WILL BE <span className="text-stroke-blue">CHAMPION?</span>
              </h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                Perfect for competitive friends, family outings (teens+), and team events. Easy to learn for
                VR first-timers—hard to put down once the scoreboard lights up.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <VisualFeatureCard
                imgSrc="/undead-arena-8p.webp"
                imgAlt="Eight players clearing a wave together."
                title="Up to 8 Players"
              >
                Jump in as a full squad. Survive, revive, and combo abilities to keep the momentum rolling.
              </VisualFeatureCard>

              <VisualFeatureCard
                imgSrc="/undead-arena-score.webp"
                imgAlt="End-of-match board with kills, headshots, and MVP crown."
                title="Claim Your Crown"
              >
                Check the scores at the end and start the banter. Avenge losses, prove wins, and run it back.
              </VisualFeatureCard>

              <VisualFeatureCard
                imgSrc="/undead-arena-vibe.webp"
                imgAlt="Contestants laughing as the commentator hypes the crowd."
                title="Scares + Laughs"
              >
                Gory arcade thrills with a lighter, tongue-in-cheek tone. Less horror than Outbreak—more
                game-show chaos.
              </VisualFeatureCard>
            </div>
          </div>
        </section>

        {/* CROSS-LINKS */}
        <section className="py-20 sm:py-24 bg-gray-900/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/50 p-8 rounded-lg border border-gray-800">
              <div className="prose prose-invert max-w-none text-center lg:text-left">
                <h2 className="text-3xl font-poppins text-white font-black sm:text-4xl">
                  ZOMBIE FAN? <span className="text-stroke-blue">TRY THESE TOO</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-200">
                  Want a story-driven survival epic?{" "}
                  <Link href="/games/outbreak" className="font-bold text-cyan-400 hover:underline">
                    Outbreak
                  </Link>{" "}
                  is our cinematic co-op campaign. Prefer PvP rivalry instead of waves? Jump into{" "}
                  <Link href="/games/sol-raiders" className="font-bold text-cyan-400 hover:underline">
                    Sol Raiders
                  </Link>
                  .
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/undead-arena-group.webp"
                  alt="Friends high-fiving after surviving the final wave."
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
              SIGN UP FOR THE <span className="text-stroke-blue">UNDEAD ARENA</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Book this thrilling zombie VR shooter in Houston and find out if you have what it takes to be a
              champion—or become zombie chow. Loser buys the next round!
            </p>
            <BookGameButton label="BOOK YOUR SPOTLIGHT" source="undead-final-cta" />
          </div>
        </section>
      </div>
    </main>
    </article>
    </>
  );
}
