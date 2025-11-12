// src/app/games/outbreak/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Biohazard, Crosshair, Rocket } from "lucide-react";
import BookGameButton from "@/components/BookBtn";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";
import OtherGames from "@/components/OtherGames";

export const metadata: Metadata = {
    title: "Outbreak - Zombie Survival VR | Zero Latency VR Houston, Webster",
    description: "Survive a zombie apocalypse in Outbreak VR. Team up with up to 8 players in this heart-pounding co-op shooter. Fight through undead hordes in Houston.",
    authors: [{ name: "Zero Latency VR Houston, Webster" }],
    creator: "Zero Latency VR Houston, Webster",
    publisher: "Zero Latency VR Houston, Webster",
    alternates: {
        canonical: "https://zlwebster.com/games/outbreak",
    },
    openGraph: {
        title: "Outbreak - Zombie Survival VR | Zero Latency VR Houston, Webster",
        description: "Team up to fight hordes of the undead in a hyper-realistic free-roam VR experience. Up to 8 players.",
        url: "https://zlwebster.com/games/outbreak",
        type: "website",
        images: [
            {
                url: "https://zlwebster.com/game-outbreak.webp",
                width: 1200,
                height: 630,
                alt: "A squad of players stands back-to-back against a zombie horde in the Outbreak VR game.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Outbreak - Zombie Survival VR | Zero Latency VR Houston, Webster",
        description: "Team up to fight hordes of the undead in a hyper-realistic free-roam VR experience. Up to 8 players.",
        images: ["https://zlwebster.com/game-outbreak.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Card component with text below the image for maximum image visibility
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


export default function OutbreakPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Games", url: "https://zlwebster.com/games" },
        { name: "Outbreak", url: "https://zlwebster.com/games/outbreak" },
    ]);

    const gameSchema = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "@id": "https://zlwebster.com/games/outbreak#game",
        "name": "Outbreak",
        "description": "Survive a zombie apocalypse in Outbreak, a heart-pounding free-roam VR game. Team up with up to 8 survivors, fight through undead-infested streets, and uncover the source of the outbreak.",
        "url": "https://zlwebster.com/games/outbreak",
        "image": "https://zlwebster.com/game-outbreak.webp",
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
            "ratingCount": "229"
        },
        "genre": ["Horror", "Survival", "Shooter", "Zombie"],
        "numberOfPlayers": "1-8",
        "playMode": "Multiplayer",
        "gameItem": "VR Experience"
    };

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Outbreak - Zombie Survival VR Trailer | Zero Latency VR Houston, Webster",
        "description": "Watch the trailer for Outbreak, a heart-pounding zombie survival co-op shooter in free-roam VR in Houston.",
        "thumbnailUrl": "https://zlwebster.com/outbreak-trailer-thumbnail.jpg",
        "uploadDate": "2025-11-01",
        "contentUrl": "https://zlwebster.com/outbreak-trailer.mp4",
        "embedUrl": "https://zlwebster.com/games/outbreak#video",
        "duration": "PT1M15S",
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
                <meta itemProp="name" content="Outbreak" />
                <main id="main-content">
            <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">

                {/* HERO SECTION */}
                <section className="relative min-h-[90vh] flex items-center justify-center text-center py-20 lg:py-0">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/outbreak-hero-bg.webp"
                            alt="A dark, desolate city street during a zombie apocalypse."
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20"
                            priority
                        />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                        <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
                            OUTBREAK <span className="text-stroke-blue">VR</span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                            Sabotage, stolen medicine, and hordes of zombies. Only your skills stand between life and death. Will you survive?
                        </p>
                        <div className="mt-10">
                            <BookGameButton label="FIGHT THE UNDEAD" source="outbreak-hero" />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-900/50 border-t border-b border-gray-800">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="flex flex-col items-center justify-center p-2">
                                <Rocket size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Free-Roam VR</h3>
                                <p className="text-sm text-gray-400">Unrestricted Exploration</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Users size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Team-Based Co-op</h3>
                                <p className="text-sm text-gray-400">Up to 4 Survivors</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Biohazard size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Zombie Apocalypse</h3>
                                <p className="text-sm text-gray-400">A World in Chaos</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Crosshair size={32} className="text-cyan-400 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Realistic Arsenal</h3>
                                <p className="text-sm text-gray-400">Modern Weaponry</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="video" className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/outbreak-trailer.mp4"
                                thumbnailSrc="/outbreak-trailer-thumbnail.jpg"
                                thumbnailAlt="Outbreak trailer"
                            />
                        </div>
                    </section>

                {/* INTRODUCTION SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">THE CITY HAS <span className="text-stroke-blue">FALLEN</span></h2>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <VisualFeatureCard imgSrc="/outbreak-horde.webp" imgAlt="A massive horde of zombies swarming through a city street." title="UNITE AND FIGHT">
                                    Experience first-hand what it’s like to fight for your life in an apocalyptic world full of the undead.
                                </VisualFeatureCard>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <VisualFeatureCard imgSrc="/outbreak-cure.webp" imgAlt="A tense scene inside a research lab with flickering lights." title="GUARD THE CURE">
                                    You and your team are guarding a research facility with the only cure for an insidious zombie virus.
                                </VisualFeatureCard>
                                <VisualFeatureCard imgSrc="/outbreak-mercenaries.webp" imgAlt="Armed mercenaries moving through a dark corridor." title="FIGHT THE LIVING">
                                    The undead aren&apos;t your only threat. Ruthless mercenaries crave the cure and will stop at nothing to get it.
                                </VisualFeatureCard>
                            </div>
                        </div>
                    </div>
                </section>

                {/* GAMEPLAY MOMENTS SECTION */}
                <section className="py-20 sm:py-24 bg-gray-900/50 space-y-20">
                    {/* Scene 1: Sewers */}
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                <Image src="/outbreak-sewers.webp" alt="Players navigating a dark, grimy sewer as zombies emerge from the shadows." layout="fill" objectFit="cover" priority/>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-3xl font-poppins font-bold text-white">ESCAPE THE <span className="text-stroke-blue">SEWERS</span></h3>
                                <p className="mt-4 text-lg text-gray-300">
                                    The only thing worse than the grimy depths of a city&apos;s sewer system is surviving it with an endless torrent of vicious zombies. Protect your friends, or fend for yourself — just get out of there alive!
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Scene 2: Helicopter */}
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="prose prose-invert max-w-none lg:order-last">
                                <h3 className="text-3xl font-poppins font-bold text-white">TAKE <span className="text-stroke-blue">FLIGHT</span></h3>
                                <p className="mt-4 text-lg text-gray-300">
                                    Awaken your inner hero and feel breathlessly alive as you jump into a helicopter, flying high over a ravaged city full of burning buildings and the sounds of distant gunfire.
                                </p>
                            </div>
                            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                <Image src="/outbreak-helicopter.webp" alt="View from inside a helicopter, looking down at a burning, zombie-infested city." layout="fill" objectFit="cover" priority/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TACTICAL FEATURES SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">SURVIVAL IS A <span className="text-stroke-blue">TEAM SPORT</span></h2>
                            <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                                Watch each other’s backs—the undead can come from any direction in 360° VR. Communication is key to avoid being overrun.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <VisualFeatureCard imgSrc="/outbreak-team.webp" imgAlt="A team of players in VR gear fighting zombies back-to-back." title="Squad Up (1-8 Players)">
                                Form a squad of up to 8 survivors. You&apos;ll need every last one of you to make it through this zombie survival game.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/outbreak-zombies.webp" imgAlt="A variety of different zombie types, including fast and large ones." title="Face the Horde">
                                Battle relentless hordes of lifelike, flesh-hungry zombies, including some nasty surprises that will get your adrenaline pumping.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/outbreak-weapons.webp" imgAlt="A close-up of the different virtual reality rifles and shotguns available in the game." title="Advanced Arsenal">
                                Gear up with a powerful arsenal of weapons. From assault rifles to shotguns, you&apos;ll need the right tool for the job.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/outbreak-immersion.webp" imgAlt="A player wearing a VR headset looking terrified and amazed." title="Total Immersion">
                                With realistic graphics and surround sound, you&apos;ll hear the eerie groans of the undead and feel like they&apos;re truly closing in.
                            </VisualFeatureCard>
                        </div>
                    </div>
                </section>

                {/* FINAL BATTLE SECTION */}
                <section className="relative py-32 sm:py-40 text-center bg-gray-900/50">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/outbreak-final-battle.webp"
                            alt="An epic final battle scene against a helicopter and mercenaries."
                            layout="fill"
                            objectFit="cover"
                            className="opacity-25"
                            priority
                        />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                        <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">A GLORIOUS <span className="text-stroke-blue">FINAL BATTLE</span></h2>
                        <p className="mt-6 text-xl leading-relaxed text-gray-200">
                            It’s not just the undead you have to worry about. Keep your wits about you, fend off armed mercenaries, and face down an attack helicopter in an epic final boss fight.
                        </p>
                    </div>
                </section>

                {/* AUDIENCE & CROSS-LINK SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/50 p-8 rounded-lg border border-gray-800">
                            <div className="prose prose-invert max-w-none text-center lg:text-left">
                                <h2 className="text-3xl font-poppins text-white font-black sm:text-4xl">ARE YOU <span className="text-stroke-blue">BRAVE ENOUGH?</span></h2>
                                <p className="mt-4 text-lg leading-relaxed text-gray-200">
                                    If you love horror movies or games like Resident Evil, this zombie VR game is a must-play. Outbreak is a popular choice for bachelor parties, birthdays, and team-building groups who want a scary good time.
                                </p>
                                <div className="mt-6 p-4 rounded-md bg-cyan-900/30 border border-cyan-800">
                                    <p className="text-gray-200">
                                        Want more zombie action? If you prefer a competitive, arcade-style wave shooter, <Link href="/games/undead-arena" className="font-bold text-cyan-400 hover:underline">check out Undead Arena!</Link>
                                    </p>
                                </div>
                            </div>
                            <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                                <Image src="/outbreak-group-fun.webp" alt="A group of friends laughing and high-fiving after their VR experience." layout="fill" objectFit="cover" priority/>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="py-20 text-center">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6">
                        <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">THINK YOU CAN SURVIVE THE <span className="text-stroke-blue">OUTBREAK?</span></h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                            Bring your bravest friends—it’s going to take all of you to make it through alive.
                        </p>
                        <BookGameButton label="BOOK YOUR SURVIVAL" source="outbreak-final-cta" />
                    </div>
                </section>

                <OtherGames currentGameSlug="outbreak" />
            </div>
        </main>
        </article>
        </>
    );
}