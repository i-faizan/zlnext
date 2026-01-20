
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Biohazard, Clock, Rocket } from "lucide-react"; // Added Clock for "30 min"
import BookGameButton from "@/components/BookBtn";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";
import OtherGames from "@/components/OtherGames";

export const metadata: Metadata = {
    title: "Outbreak 2: Mall Mayhem - Zombie Survival VR | Zero Latency VR Houston, Webster",
    description: "Survive the chaos at the mall in Outbreak 2: Mall Mayhem. 1-8 players, 30 min co-op mayhem. Battle mutant zombies in a crumbling shopping center.",
    authors: [{ name: "Zero Latency VR Houston, Webster" }],
    creator: "Zero Latency VR Houston, Webster",
    publisher: "Zero Latency VR Houston, Webster",
    alternates: {
        canonical: "https://zlwebster.com/games/outbreak-mall-mayhem",
    },
    openGraph: {
        title: "Outbreak 2: Mall Mayhem - Zombie Survival VR | Zero Latency VR Houston, Webster",
        description: "Step into the madness. Awaken your wild side. Can you survive the mayhem at the mall? Up to 8 players.",
        url: "https://zlwebster.com/games/outbreak-mall-mayhem",
        type: "website",
        images: [
            {
                url: "https://zlwebster.com/mm_banner.webp",
                width: 1200,
                height: 630,
                alt: "Players fighting mutant zombies in a ruined mall.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Outbreak 2: Mall Mayhem - Zombie Survival VR",
        description: "Survive the chaos at the mall. 1-8 players co-op mayhem.",
        images: ["https://zlwebster.com/mm_banner.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

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
                    priority={false} // Lazy load feature images usually
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


export default function OutbreakMallMayhemPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Games", url: "https://zlwebster.com/games" },
        { name: "Outbreak 2: Mall Mayhem", url: "https://zlwebster.com/games/outbreak-mall-mayhem" },
    ]);

    const gameSchema = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "@id": "https://zlwebster.com/games/outbreak-mall-mayhem#game",
        "name": "Outbreak 2: Mall Mayhem",
        "description": "Can you survive the chaos at the mall? Step into the madness in this 30-minute cooperative mayhem VR experience for 1-8 players.",
        "url": "https://zlwebster.com/games/outbreak-mall-mayhem",
        "image": "https://zlwebster.com/mm_image3.webp",
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
        "genre": ["Horror", "Survival", "Shooter", "Zombie", "Cooperative"],
        "numberOfPlayers": "1-8",
        "playMode": "Multiplayer",
        "gameItem": "VR Experience"
    };

    // Placeholder video schema - user to update
    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Outbreak 2: Mall Mayhem Trailer",
        "description": "Trailer for Outbreak 2: Mall Mayhem at Zero Latency VR Houston, Webster.",
        "thumbnailUrl": "https://zlwebster.com/mm_banner2.webp",
        "uploadDate": "2024-01-01",
        "contentUrl": "https://zlwebster.com/mm_video.mp4",
        "embedUrl": "https://zlwebster.com/games/outbreak-mall-mayhem#video",
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
                <meta itemProp="name" content="Outbreak 2: Mall Mayhem" />
                <main id="main-content">
                    <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">

                        {/* HERO SECTION */}
                        <section className="relative min-h-[90vh] flex items-center justify-center text-center pb-20 lg:pb-0">
                            <div className="absolute inset-0 z-0">
                                {/* Placeholder for Hero Image */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
                                    <Image
                                        src="/mm_banner.webp"
                                        alt="Chaos at the mall - Outbreak 2"
                                        layout="fill"
                                        objectFit="cover"
                                        className="opacity-40"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
                                <h2 className="text-xl md:text-2xl font-bold tracking-widest text-cyan-400 mb-2 uppercase">
                                    Step Into The Madness
                                </h2>
                                <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-8xl leading-tight">
                                    OUTBREAK <span className="text-stroke-blue block sm:inline">MALL MAYHEM</span>
                                </h1>
                                <p className="mt-6 text-xl md:text-3xl text-gray-200 leading-relaxed font-light">
                                    Awaken Your Wild Side
                                </p>
                                <div className="mt-10">
                                    <BookGameButton label="SURVIVE THE MALL" source="outbreak-mall-hero" />
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
                                        <h3 className="text-lg font-bold font-poppins text-white">1-8 Players</h3>
                                        <p className="text-sm text-gray-400">Cooperative Mayhem</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <Clock size={32} className="text-cyan-400 mb-2" />
                                        <h3 className="text-lg font-bold font-poppins text-white">30 Min</h3>
                                        <p className="text-sm text-gray-400">Experience Time</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-2">
                                        <Biohazard size={32} className="text-cyan-400 mb-2" />
                                        <h3 className="text-lg font-bold font-poppins text-white">Zombie Chaos</h3>
                                        <p className="text-sm text-gray-400">Havoc & Mayhem</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="video" className="py-16 md:py-24">
                            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                                {/* User to add video and thumbnail */}
                                <InteractiveVideoPlayer
                                    videoSrc="/mm_video.mp4"
                                    thumbnailSrc="/mm_vidthumb.webp"
                                    thumbnailAlt="Outbreak 2: Mall Mayhem Trailer"
                                />
                                {/* <p className="text-center text-gray-400 mt-2 text-sm italic">*Video coming soon*</p> */}
                            </div>
                        </section>

                        {/* INTRODUCTION SECTION */}
                        <section className="py-20 sm:py-24">
                            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">CAN YOU SURVIVE THE <span className="text-stroke-blue">CHAOS?</span></h2>
                                    <p className="mt-8 text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
                                        Are you ready to dive back into the chaos, to go back to where the infection started in Outbreak? Because the apocalypse has a new home. The mall. And the place is crawling. Wall to wall with mutant zombies. It&apos;s havoc. It&apos;s mayhem. Can you survive the mayhem?
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <VisualFeatureCard
                                        imgSrc="/mm_image1.webp"
                                        imgAlt="Mutated zombies in a shopping mall."
                                        title="NEXT LEVEL ZOMBIES"
                                    >
                                        Spitters, spewers, boomers, the further you go, the bigger and meaner the zombies get. The wildest mutations you have ever seen. Around every corner, there is a whole new level of fun.
                                    </VisualFeatureCard>

                                    <VisualFeatureCard
                                        imgSrc="/mm_image2.webp"
                                        imgAlt="Player shooting at mannequins and toys in a mall store."
                                        title="GET TRIGGER HAPPY"
                                    >
                                        Blast the toys. Torch the mannequins. It is like an end-of-the-world sale, and everything’s got to go! A day at the mall that&apos;s gone crazy. And it’s ridiculously fun.
                                    </VisualFeatureCard>

                                    <VisualFeatureCard
                                        imgSrc="/mm_image3.webp"
                                        imgAlt="Collapsed ceilings and fire in a mall corridor."
                                        title="PLAYGROUND OF CHAOS"
                                    >
                                        The mall is so much more than the dead. It&apos;s an obstacle course of shattering floors, falling ceilings, burning corridors. Stay sharp and you may just survive this playground of glass and fire.
                                    </VisualFeatureCard>
                                </div>
                            </div>
                        </section>

                        {/* IMMERSION/ATMOSPHERE SECTION */}
                        <section className="relative py-32 sm:py-40 text-center bg-gray-900/50">
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/mm_banner2.webp"
                                    alt="Atmospheric view of the mall in chaos."
                                    layout="fill"
                                    objectFit="cover"
                                    className="opacity-20"
                                />
                            </div>
                            <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                                <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">AN END-OF-THE-WORLD <span className="text-stroke-blue">SALE</span></h2>
                                <p className="mt-6 text-xl leading-relaxed text-gray-200">
                                    A day at the mall that&apos;s gone crazy. Everything has got to go, including the hordes of undead.
                                </p>
                                <div className="mt-8">
                                    <BookGameButton label="BOOK NOW" source="outbreak-mall-mid-cta" />
                                </div>
                            </div>
                        </section>

                        {/* AUDIENCE & CROSS-LINK SECTION */}
                        <section className="py-20 sm:py-24">
                            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                                <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/50 p-8 rounded-lg border border-gray-800">
                                    <div className="prose prose-invert max-w-none text-center lg:text-left">
                                        <h2 className="text-3xl font-poppins text-white font-black sm:text-4xl">MORE THAN <span className="text-stroke-blue">JUST SHOPPING</span></h2>
                                        <p className="mt-4 text-lg leading-relaxed text-gray-200">
                                            Outbreak 2: Mall Mayhem takes the intensity of the original Outbreak and dials it up to 11. Perfect for groups looking for high-energy, cooperative fun.
                                        </p>
                                        <div className="mt-6 p-4 rounded-md bg-cyan-900/30 border border-cyan-800">
                                            <p className="text-gray-200">
                                                Played the original? <Link href="/games/outbreak" className="font-bold text-cyan-400 hover:underline">Revisit where it all began in Outbreak.</Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                                        {/* Placeholder for group photo */}
                                        <Image src="/mm_image2.webp" alt="Group of friends ready to play Mall Mayhem." layout="fill" objectFit="cover" />
                                    </div>
                                </div>
                            </div>
                        </section>


                        {/* FINAL CTA SECTION */}
                        <section className="py-20 text-center">
                            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                                <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">READY FOR THE <span className="text-stroke-blue">MAYHEM?</span></h2>
                                <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Gather your squad. The mall is open, and the zombies are waiting.
                                </p>
                                <BookGameButton label="BOOK YOUR TICKETS" source="outbreak-mall-final-cta" />
                            </div>
                        </section>

                        <OtherGames currentGameSlug="outbreak-mall-mayhem" />
                    </div>
                </main>
            </article>
        </>
    );
}
