// src/app/games/haunted-vr/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { Users, Ghost, Clock, HeartPulse } from "lucide-react"; // Changed icons for horror theme
import BookGameButton from "@/components/BookBtn";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";

// Metadata updated for Haunted VR
export const metadata: Metadata = {
    title: "Haunted VR - Dare to Enter, Hope to Escape | Zero Latency VR Houston, Webster",
    description: "Experience Haunted, the latest in full-body, ultra-immersive VR terror. A world that doesn't just look scary, it feels scary. Can you survive the house?",
    alternates: {
        canonical: "https://zlwebster.com/games/haunted-vr",
    },
    openGraph: {
        title: "Haunted VR – Immersive Horror Experience | Zero Latency VR Houston, Webster",
        description: "Experience Haunted, the latest in full-body, ultra-immersive VR terror. A world that doesn't just look scary, it feels scary. Can you survive the house?",
        url: "https://zlwebster.com/games/haunted-vr",
        type: "website",
        images: [{
            url: "https://zlwebster.com/game-haunted.webp",
            width: 1200,
            height: 630,
            alt: "A terrifying scene from the Haunted VR experience",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Haunted VR – Dare to Enter, Hope to Escape | Zero Latency VR Houston, Webster",
        description: "Experience Haunted, the latest in full-body, ultra-immersive VR terror. A world that doesn't just look scary, it feels scary.",
        images: ["https://zlwebster.com/game-haunted.webp"], // Placeholder image
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Card component remains the same, but we'll use a red hover effect
const VisualFeatureCard = ({ imgSrc, imgAlt, title, children }: { imgSrc: string, imgAlt: string, title: string, children: React.ReactNode }) => (
    <div className="relative rounded-lg overflow-hidden group border-2 border-gray-800/50 hover:border-red-500/70 transition-all duration-300 shadow-lg hover:shadow-red-900/40">

        {/* Aspect Ratio Box: 100% for a 1:1 square ratio. */}
        <div className="w-full" style={{ paddingTop: '100%' }}></div>

        {/* Content Container: Absolutely positioned to fill the space created above. */}
        <div className="absolute inset-0">
            {/* Background Image */}
            <Image
                src={imgSrc}
                alt={imgAlt}
                layout="fill"
                objectFit="cover"
                className="z-0 transition-transform duration-500 ease-in-out group-hover:scale-110"
                priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                <h3 className="text-xl font-poppins font-bold text-white mb-1 transition-colors duration-300 group-hover:text-red-400">{title}</h3>
                <p className="text-gray-200 leading-relaxed font-medium transition-all duration-300 opacity-90 group-hover:opacity-100 text-sm">
                    {children}
                </p>
            </div>
        </div>
    </div>
);


export default function HauntedPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Games", url: "https://zlwebster.com/games" },
        { name: "Haunted VR", url: "https://zlwebster.com/games/haunted-vr" }, // Updated
    ]);

    const gameSchema = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "@id": "https://zlwebster.com/games/haunted-vr#game", // Updated
        "name": "Haunted VR", // Updated
        "description": "A full-body, ultra-immersive VR terror experience. You'll need to stick together to survive the house. A heart-pounding, white-knuckle, group-based thrill ride.", // Updated
        "url": "https://zlwebster.com/games/haunted-vr", // Updated
        "image": "https://zlwebster.com/game-haunted.webp", // Updated
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
            "ratingValue": "4.9", // Adjusted rating for example
            "ratingCount": "189" // Adjusted count for example
        },
        "genre": ["Horror", "Survival", "Adventure"], // Updated
        "numberOfPlayers": "1-8", // Updated
        "playMode": "Multiplayer",
        "gameItem": "VR Experience"
    };

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="game-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />
            <article itemScope itemType="https://schema.org/VideoGame">
                <meta itemProp="name" content="Haunted VR" />
                <main id="main-content">
            {/* Using a darker, more ominous background color */}
            <div className="bg-black text-gray-200 font-montserrat overflow-x-hidden">

                {/* HERO SECTION - REVISED WITH CENTERED CONTENT */}
                <section className="relative min-h-[90vh] flex items-center justify-center text-center py-20 lg:py-0">
                    <div className="absolute inset-0 z-0 opacity-10">
                         <Image 
                            src="/haunted-house-bg.webp"
                            alt="Dark, ominous haunted house background"
                            layout="fill"
                            objectFit="cover"
                            priority
                         />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                        <p className="text-red-500 font-bold uppercase tracking-widest">Dare to Enter. Hope to Escape.</p>
                        <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
                            HAUNTED <span className="text-stroke-blue">VR</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
                            Let the future of virtual reality take your breath away. This is a heart-pounding, white-knuckle thrill ride where horror doesn’t just look scary, it *feels* scary.
                        </p>
                        <div className="mt-10">
                            <BookGameButton label="BOOK YOUR NIGHTMARE" source="haunted-hero-centered" />
                        </div>
                    </div>
                </section>

                {/* QUICK STATS / IMMERSION BAR */}
                <section className="bg-gray-900/50 border-t border-b border-red-900/50">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="flex flex-col items-center justify-center p-2">
                                <Users size={32} className="text-red-500 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">1-8 Players</h3>
                                <p className="text-sm text-gray-400">Survive Together</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Ghost size={32} className="text-red-500 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">Horror Survival</h3>
                                <p className="text-sm text-gray-400">Full-Body Terror</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <Clock size={32} className="text-red-500 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">15 Min Experience</h3>
                                <p className="text-sm text-gray-400">Intense Thrill Ride</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2">
                                <HeartPulse size={32} className="text-red-500 mb-2" />
                                <h3 className="text-lg font-bold font-poppins text-white">High Intensity</h3>
                                <p className="text-sm text-gray-400">Ages Varies by Venue</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Player Section */}
                <section className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/haunted-trailer.mp4" // Placeholder video
                                thumbnailSrc="/haunted-trailer-thumbnail.jpg" // Placeholder thumbnail
                                thumbnailAlt="Haunted VR trailer"
                            />
                        </div>
                    </section>

                {/* VISUAL INTRODUCTION SECTION - Using your 3 content blocks */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">WHO’S THE BRAVEST <span className="text-stroke-red">OF THEM ALL?</span></h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <VisualFeatureCard imgSrc="/haunted-survive.webp" imgAlt="A group of players huddling together in a dark virtual hallway." title="SURVIVE TOGETHER">
                                You enter as a group. But staying together? That’s another story. The house wants to get you alone. It whispers and twists, luring players into the dark. Whatever happens, don’t split up.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/haunted-virtual-horror.webp" imgAlt="A close-up of a terrifying ghost in the Haunted VR game." title="VIRTUAL HORROR. REAL FEAR.">
                                Haunted uses next-gen 360° immersion, spatial sound and 5K resolution to bring your darkest fears to life. It&apos;s the scariest, realest full-body immersive experience.
                            </VisualFeatureCard>
                            <VisualFeatureCard imgSrc="/haunted-terror.webp" imgAlt="A player in VR gear reacting in fear." title="STEP INTO TERROR">
                                This is a heart-pounding, white-knuckle, group-based thrill ride. A world where horror doesn’t just look scary, it feels scary. It’s time to find out for real.
                            </VisualFeatureCard>
                        </div>
                    </div>
                </section>

                {/* GAMEPLAY EXPERIENCE SECTION - Using your "Halloween Special" text */}
                <section className="py-20 sm:py-24 bg-gray-900/50">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative h-96 lg:h-[32rem] rounded-xl overflow-hidden shadow-2xl border-2 border-red-800/50">
                                <Image src="/haunted-main-gameplay.webp" alt="Players exploring a dark, haunted mansion in VR." layout="fill" objectFit="cover" priority/>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-4xl font-poppins font-bold sm:text-5xl">AWAKEN THE <span className="text-stroke-red">FEAR WITHIN</span></h2>
                                <p className="mt-4 text-lg text-gray-300">
                                    Haunted is the latest in full-body, ultra-immersive VR terror. A world that doesn’t just look scary, but feels scary. Your hands shake. Your heart races.
                                </p>
                                <p className="mt-4 text-lg text-gray-300">
                                     You&apos;ll need to stick together to survive. But be careful. The house will do anything to get you alone.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sections for "Tactical Combat" and "Game Modes" from Space Marine are removed as they don't match the provided "Haunted" content. */}

                {/* FINAL CTA SECTION */}
                <section className="py-20 sm:py-32">
                     <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-900/50 p-8 rounded-lg border border-gray-800">
                             <div className="prose prose-invert max-w-none text-center lg:text-left">
                                <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">DARE TO <span className="text-stroke-red">ENTER?</span></h2>
                                <p className="mt-6 text-xl leading-relaxed text-gray-200">
                                    The house is waiting. Assemble your squad, book your mission in Houston, and find out if you have what it takes to escape.
                                </p>
                                <div className="mt-8">
                                    <BookGameButton label="BOOK YOUR ESCAPE" source="haunted-final-cta" />
                                </div>
                            </div>
                            <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                                <Image src="/haunted-final-cta.webp" alt="A final, terrifying image of the haunted house." layout="fill" objectFit="cover" priority/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        </article>
        </>
    );
}