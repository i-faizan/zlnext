// src/app/games/singularity/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Shield, Sparkles, Swords, Orbit } from "lucide-react";
import BookGameButton from "@/components/BookBtn";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";

export const metadata: Metadata = {
    title: "Singularity - Battle Robots & AI in VR Space Station | Zero Latency VR Houston, Webster",
    description: "Investigate a secret research facility in Singularity, a futuristic VR shooter at Zero Latency Houston, Webster. In this free-roam adventure, up to 8 players explore a space station overrun by rogue robots and AI defenses. Wield high-tech weapons, navigate zero-gravity environments, and survive ambushes by drones and cyborgs. Sci-fi action meets mystery – can your team shut down the rogue AI?",
    alternates: {
        canonical: "https://zlwebster.com/games/singularity",
    },
    openGraph: {
        title: "Singularity - Battle Robots & AI in VR Space Station | Zero Latency VR Houston, Webster",
        description: "Your team must investigate a military space station that&apos;s gone dark. But you&apos;re not alone. A rogue AI is in control.",
        url: "https://zlwebster.com/games/singularity",
        type: "website",
        images: [
            {
                url: "https://zlwebster.com/game-singularity.webp",
                width: 1200,
                height: 630,
                alt: "A team of players in futuristic gear battles robots inside a high-tech space station.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Singularity - Battle Robots & AI in VR Space Station | Zero Latency VR Houston, Webster",
        description: "Your team must investigate a military space station that's gone dark. But you're not alone. A rogue AI is in control.",
        images: ["https://zlwebster.com/game-singularity.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Card component with text below the image
const VisualFeatureCard = ({ imgSrc, imgAlt, title, children }: { imgSrc: string, imgAlt: string, title: string, children: React.ReactNode }) => (
    <div className="rounded-lg overflow-hidden group border-2 border-gray-800/50 bg-gray-900/50 flex flex-col transition-all duration-300 hover:border-cyan-500/70 hover:shadow-2xl hover:shadow-cyan-900/40">
        <div className="relative w-full">
            <div style={{ paddingTop: '56.25%' }}></div> {/* 16:9 Aspect Ratio Box */}
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
            <p className="text-gray-300 text-sm leading-relaxed">
                {children}
            </p>
        </div>
    </div>
);


export default function SingularityPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Games", url: "https://zlwebster.com/games" },
        { name: "Singularity", url: "https://zlwebster.com/games/singularity" },
    ]);

    const gameSchema = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "@id": "https://zlwebster.com/games/singularity#game",
        "name": "Singularity",
        "description": "Investigate a secret research facility in Singularity, a futuristic VR shooter. Up to 8 players explore a space station overrun by rogue robots and AI defenses.",
        "url": "https://zlwebster.com/games/singularity",
        "image": "https://zlwebster.com/game-singularity.webp",
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
            "ratingCount": "165"
        },
        "genre": ["Sci-Fi", "Shooter", "Action"],
        "numberOfPlayers": "1-8",
        "playMode": "Multiplayer",
        "gameItem": "VR Experience"
    };

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="game-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
            <article itemScope itemType="https://schema.org/VideoGame">
                <meta itemProp="name" content="Singularity" />
                <main id="main-content">
            <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">

                {/* HERO SECTION */}
                <section className="relative min-h-[90vh] flex items-center justify-center text-center py-20 lg:py-0">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/singularity-hero-bg.webp"
                            alt="A vast, empty hangar bay of a futuristic space station."
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20"
                            priority
                        />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                        <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
                            SINGULARITY
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                            A lost military space station, no sign of human existence, mysterious events... Will you dare to accept the challenge?
                        </p>
                        <div className="mt-10">
                            <BookGameButton label="ACCEPT THE MISSION" source="singularity-hero" />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-900/50 border-t border-b border-gray-800">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="flex flex-col items-center justify-center p-2">
                                <Orbit size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Zero-G Combat</h3>
                                <p className="text-sm text-gray-400">Master Weightless Movement</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Swords size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Team vs. Team</h3>
                                <p className="text-sm text-gray-400">4v4 Competitive Matches</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Sparkles size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Sci-Fi Arsenal</h3>
                                <p className="text-sm text-gray-400">Unique High-Tech Weapons</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <BrainCircuit size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Tactical Gameplay</h3>
                                <p className="text-sm text-gray-400">Coordinate and Conquer</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/singularity-trailer.mp4"
                                thumbnailSrc="/singularity-trailer-thumbnail.jpg"
                                thumbnailAlt="Singularity trailer"
                            />
                        </div>
                    </section>

                {/* STORY SETUP SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative h-96 lg:h-[32rem] rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                <Image src="/singularity-station-exterior.webp" alt="A secret military space station floating silently in the depths of space." layout="fill" objectFit="cover" priority />
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-4xl font-poppins font-bold text-white">MAN VS <span className="text-stroke-blue">MACHINE</span></h2>
                                <p className="mt-4 text-lg text-gray-300">
                                    In Singularity, you and your team are sent to investigate a secret military space station that’s gone dark. As soon as you board, you realize you&apos;re not alone. An AI has taken over, and it has an army of killer robots at its command.
                                </p>
                                <p className="mt-4 text-lg text-gray-300">
                                    When the base is infiltrated and the power is cut, you&apos;ll have seconds to strategise. Brace yourself to make calls, or take orders from your team — for the sake of everyone&apos;s survival.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WEAPONS & TACTICS SECTION */}
                <section className="py-20 sm:py-24 bg-gray-900/50">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">FIGHT WITH <span className="text-stroke-blue">EVERYTHING YOU HAVE</span></h2>
                            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                                With groundbreaking technology, you’ll have four unique blaster modes and a deployable force shield at your disposal, each designed for specific combat situations.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <VisualFeatureCard imgSrc="/singularity-scatter.webp" imgAlt="A weapon firing a wide spray of energy pellets." title="Scatter">
                                Perfect for crowd control. The Scatter mode allows you to hit multiple drone targets at once.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/singularity-beam.webp" imgAlt="A focused, powerful laser beam weapon." title="Beam">
                                Need to punch through armor? The Beam will penetrate even the toughest defenses of hulking robots.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/singularity-pulse.webp" imgAlt="A rapid-fire plasma rifle in action." title="Pulse Rifle">
                                Your reliable, rapid-fire primary weapon. The Pulse Rifle will keep you alert to incoming threats.
                            </VisualFeatureCard>
                        </div>
                        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center bg-black/30 p-8 rounded-lg">
                            <div className="relative h-72 rounded-lg overflow-hidden">
                                <Image src="/singularity-shield.webp" alt="A glowing blue energy shield deflecting laser fire." layout="fill" objectFit="cover" priority />
                            </div>
                            <div className="prose prose-invert max-w-none text-center lg:text-left">
                                <Shield size={40} className="mx-auto lg:mx-0 text-cyan-400 mb-4" />
                                <h3 className="text-3xl font-poppins font-bold text-white">DEPLOYABLE FORCE SHIELD</h3>
                                <p className="mt-4 text-lg text-gray-300">
                                    When you come under heavy fire from turrets and flanking drones, your deployable force shield is your best friend. Use it to protect your team and advance on the enemy.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ENVIRONMENT SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">EXPLORE THE <span className="text-stroke-blue">UNKNOWN</span></h2>
                                <p className="mt-4 text-lg text-gray-300">
                                    This VR experience surrounds you with a classic sci-fi atmosphere. Weave through narrow steel corridors, risk your life in treacherous elevators, and even float in simulated zero gravity.
                                </p>
                                <p className="mt-4 text-lg text-gray-300">
                                    It’s a great showcase for sci-fi fans – like starring in your own Matrix or Terminator scenario.
                                </p>
                            </div>
                            <div className="relative h-96 lg:h-[32rem] rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                <Image src="/singularity-zerog.webp" alt="Players floating in a zero-gravity chamber inside the space station." layout="fill" objectFit="cover" priority/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AUDIENCE & CROSS-LINK SECTION */}
                <section className="py-20 sm:py-24 bg-gray-900/50">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                                <Image src="/singularity-team-playing.webp" alt="A team of colleagues strategizing during their Singularity VR session." layout="fill" objectFit="cover" priority />
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-3xl font-poppins text-white font-black sm:text-4xl">WHO IS THIS <span className="text-stroke-blue">MISSION FOR?</span></h2>
                                <p className="mt-4 text-lg leading-relaxed text-gray-200">
                                    Ideal for those who love sci-fi and action. If you’ve ever dreamed of battling robots or enjoyed movies like *Aliens* or *Tron*, you’ll love Singularity. It’s one of our most popular choices for gamers, tech enthusiasts, and team outings!
                                </p>
                                <div className="mt-6 p-4 rounded-md bg-cyan-900/30 border border-cyan-800">
                                    <p className="text-gray-200">
                                        For a lighter sci-fi experience without combat, <Link href="/games/engineerium" className="font-bold text-cyan-400 hover:underline">try Engineerium to cool down after Singularity’s intense action.</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="py-20 text-center">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6">
                        <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">GEAR UP, <span className="text-stroke-blue">SPACE SOLDIERS</span></h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                            The station needs reclaiming! Book Singularity at Zero Latency Houston and take on the ultimate man-vs-machine showdown. The future is in your hands.
                        </p>
                        <BookGameButton label="TAKE BACK THE STATION" source="singularity-final-cta" />
                    </div>
                </section>
            </div>
        </main>
        </article>
        </>
    );
}