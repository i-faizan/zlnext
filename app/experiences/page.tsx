// src/app/experiences/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Move3d, BrainCircuit, Users } from "lucide-react";
import BookGameButton from "@/components/BookBtn"; // Assuming this is the path to your button
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";


const experienceJsonLd =
    [
        {
            "@context": "https://schema.org",
            "@type": ["WebPage", "CollectionPage"],
            "@id": "https://zlwebster.com/experiences",
            "url": "https://zlwebster.com/experiences",
            "name": "VR Experiences & Immersive Adventures for Every Group | Zero Latency VR Houston, Webster",
            "description": "Explore the thrilling VR experiences at Zero Latency Webster. Fight zombies in apocalyptic arenas, brave outer space missions, compete in esports-style shootouts, or roam fantasy worlds. Immersive free-roam VR adventures perfect for friends, families, and team events.",
            "inLanguage": "en",
            "isPartOf": { "@id": "https://zlwebster.com/#website" },
            "publisher": { "@id": "https://zlwebster.com/#localbusiness" },
            "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": "https://zlwebster.com/og-experiences.webp",
                "width": 1200,
                "height": 630
            },
            "about": { "@id": "https://zlwebster.com/#localbusiness" },
            "hasPart": [
                {
                    "@type": "ItemList",
                    "@id": "https://zlwebster.com/experiences#zombie-apocalypse-adventures",
                    "name": "Zombie Apocalypse Adventures",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "item": { "@type": "WebPage", "name": "Outbreak", "url": "https://zlwebster.com/games/outbreak" } },
                        { "@type": "ListItem", "position": 2, "item": { "@type": "WebPage", "name": "Undead Arena", "url": "https://zlwebster.com/games/undead-arena" } }
                    ]
                },
                {
                    "@type": "ItemList",
                    "@id": "https://zlwebster.com/experiences#sci-fi-space-missions",
                    "name": "Sci-Fi & Space Missions",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "item": { "@type": "WebPage", "name": "Singularity", "url": "https://zlwebster.com/games/singularity" } },
                        { "@type": "ListItem", "position": 2, "item": { "@type": "WebPage", "name": "Space Marine VR", "url": "https://zlwebster.com/games/space-marine-vr" } }
                    ]
                },
                {
                    "@type": "ItemList",
                    "@id": "https://zlwebster.com/experiences#pvp-competitions",
                    "name": "Player vs Player (PvP) Competitions",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "item": { "@type": "WebPage", "name": "Sol Raiders", "url": "https://zlwebster.com/games/sol-raiders" } }
                    ]
                },
                {
                    "@type": "ItemList",
                    "@id": "https://zlwebster.com/experiences#family-friendly-fantasy",
                    "name": "Family-Friendly Fantasy",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "item": { "@type": "WebPage", "name": "Engineerium", "url": "https://zlwebster.com/games/engineerium" } }
                    ]
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "@id": "https://zlwebster.com/experiences#video",
            "name": "Zero Latency Webster – VR Experiences Overview",
            "description": "What you’ll experience across zombie survival, sci-fi, PvP, and family-friendly free-roam VR at Zero Latency Webster.",
            "thumbnailUrl": ["https://zlwebster.com/experience.webp"],
            "contentUrl": "https://zlwebster.com/experience.mp4",
            "embedUrl": "https://zlwebster.com/experiences#video",
            "uploadDate": "2025-09-13T14:00:00Z",
            "duration": "PT1M",
            "inLanguage": "en",
            "publisher": { "@id": "https://zlwebster.com/#localbusiness" }
        }
    ];


export const metadata: Metadata = {
    title: "VR Experiences & Immersive Adventures | Zero Latency VR Houston, Webster",
    description: "Explore VR experiences in Webster, Houston. Zombie survival, space missions, PvP battles, and fantasy worlds. Free-roam adventures for groups.",
    alternates: {
        canonical: "https://zlwebster.com/experiences",
    },
    openGraph: {
        title: "VR Experiences & Immersive Adventures | Zero Latency VR Houston, Webster",
        description: "Explore VR experiences: zombie survival, space missions, PvP battles, and more. Free-roam adventures in Houston.",
        url: "https://zlwebster.com/experiences",
        type: "website",
        images: [
            {
                url: "https://zlwebster.com/experience.jpg",
                width: 1200,
                height: 630,
                alt: "A collage of different VR experiences at Zero Latency Webster.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "VR Experiences & Immersive Adventures | Zero Latency VR Houston, Webster",
        description: "Explore VR experiences: zombie survival, space missions, PvP battles. Free-roam adventures in Houston.",
        images: ["https://zlwebster.com/experience.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

const experienceCategories = [
    {
        title: "Zombie Apocalypse Adventures",
        id: "zombie-apocalypse-adventures",
        description: "Face the undead in heart-pounding zombie VR adventures. Team up with friends armed with VR rifles to survive against hordes of zombies in realistic apocalyptic settings. These experiences test your courage and teamwork as waves of undead creatures surround you.",
        games: [
            { name: "Outbreak", href: "/games/outbreak" },
            { name: "Undead Arena", href: "/games/undead-arena" },
        ],
        keywords: ["zombie virtual reality", "VR zombie game Houston", "horror VR experience"],
        imageSrc: "/zombie-experience.webp",
        imageAlt: "Players fighting off a horde of zombies in a Zero Latency VR survival game.",
    },
    {
        title: "Sci-Fi & Space Missions",
        id: "sci-fi-space-missions",
        description: "Dive into futuristic worlds and outer space in our sci-fi VR experiences. Ever wonder what battling robots on a space station or exploring alien worlds feels like? With our VR tech, you’ll fight alongside your squad in zero-gravity environments and high-tech facilities.",
        games: [
            { name: "Singularity", href: "/games/singularity" },
            { name: "Space Marine VR", href: "/games/space-marine-vr" },
        ],
        keywords: ["VR space game", "sci-fi VR shooter", "alien shooter VR"],
        imageSrc: "/sci-fi-experience.webp",
        imageAlt: "A team of players exploring a futuristic space station in a sci-fi VR mission.",
    },
    {
        title: "Player vs Player (PvP) Competitions",
        id: "pvp-competitions",
        description: "Crave competition? We offer VR PvP experiences where you can battle your friends (or coworkers) in adrenaline-fueled arenas. Experience virtual reality esports as you split into teams and go head-to-head in a fast-paced, tournament-style game.",
        games: [
            { name: "Sol Raiders", href: "/games/sol-raiders" },
        ],
        keywords: ["VR arena PvP", "VR esports tournament", "competitive VR game"],
        imageSrc: "/pvp-experience.webp",
        imageAlt: "Two teams facing off in a competitive PvP VR esports match at Zero Latency.",
    },
    {
        title: "Family-Friendly Fantasy",
        id: "family-friendly-fantasy",
        description: "We have family-friendly experiences that focus on wonder and exploration. Perfect for younger players or those who prefer puzzle and adventure over combat, these games are about cooperation and marveling at impossible, mind-bending worlds.",
        games: [
            { name: "Engineerium", href: "/games/engineerium" },
        ],
        keywords: ["immersive VR for family", "VR puzzle adventure", "non-combat VR"],
        imageSrc: "/family-experience.webp",
        imageAlt: "Players walking on floating platforms in the colorful, family-friendly Engineerium VR world.",
    },
];

export default function ExperiencesPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Experiences", url: "https://zlwebster.com/experiences" },
    ]);

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Free-Roam Virtual Reality Experiences",
        "provider": {
            "@id": "https://zlwebster.com/#organization"
        },
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 29.5377,
                "longitude": -95.1183
            },
            "geoRadius": {
                "@type": "Distance",
                "name": "80 km"
            }
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "VR Experiences",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "Zombie Apocalypse Adventures",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Outbreak VR Experience"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Undead Arena VR Experience"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Sci-Fi & Space Missions",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Singularity VR Experience"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Space Marine VR Experience"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "PvP Competitions",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Sol Raiders VR Experience"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Family-Friendly Fantasy",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Engineerium VR Experience"
                            }
                        }
                    ]
                }
            ]
        },
        "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://zlwebster.com/experiences",
            "servicePhone": "+14694049149"
        }
    };

    return (
        <>
            <Script id="experience-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(experienceJsonLd) }} />
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <main id="main-content" className="pt-20 sm:pt-0">
                <div className="bg-[#000F13] text-gray-200 font-montserrat">
                    {/* HERO SECTION */}
                    <section className="relative h-[60vh] flex items-center justify-center text-center">
                        <Image
                            src="/experiences-hero.webp" // A dynamic collage or wide-angle shot of the arena
                            alt="Players immersed in a virtual reality experience at Zero Latency Houston&apos;s arena."
                            layout="fill"
                            objectFit="cover"
                            className="opacity-25"
                            priority
                        />
                        <div className="relative z-10 p-4">
                            <h1 className="text-4xl font-poppins text-white font-black sm:text-5xl md:text-6xl">
                                <span className="text-stroke-blue">VR Experiences & Immersive Adventures </span>
                            </h1>
                            <p className="mt-6 text-md max-w-3xl mx-auto text-gray-300 leading-relaxed">
                                At Zero Latency Houston, Webster our experiences transport you to new worlds. Whether you’re an action junkie, a sci-fi fan, or looking for family-friendly fun, we have a multiplayer adventure waiting for you.
                            </p>
                        </div>
                    </section>

                    <section className="py-16 md:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <InteractiveVideoPlayer
                                videoSrc="/experience.mp4"
                                thumbnailSrc="/experience.webp"
                                thumbnailAlt="What will I get to experience at Zero Latency VR Webster?"
                            />
                        </div>
                    </section>

                    {/* INTRO & USP SECTION */}
                    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 text-center">
                        <h2 className="text-3xl font-poppins text-white font-bold sm:text-4xl">The <span className="text-stroke-blue">Zero Latency</span> Difference</h2>
                        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                            Powered by top-of-the-line VR technology, our experiences blur the line between game and reality. You and your group physically move through our VR arena—no cables, no confines—for the most immersive gameplay possible.
                        </p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                                <Move3d size={40} className="mx-auto text-cyan-400" />
                                <h3 className="text-2xl font-bold font-poppins mt-4">True Free-Roam</h3>
                                <p className="mt-2 text-gray-300">Explore large-scale virtual worlds by physically walking, running, and dodging in our arena.</p>
                            </div>
                            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                                <BrainCircuit size={40} className="mx-auto text-cyan-400" />
                                <h3 className="text-2xl font-bold font-poppins mt-4">Multi-Sensory Immersion</h3>
                                <p className="mt-2 text-gray-300">Realistic sight and sound, combined with physical movement, makes you feel like you&apos;re truly there.</p>
                            </div>
                            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                                <Users size={40} className="mx-auto text-cyan-400" />
                                <h3 className="text-2xl font-bold font-poppins mt-4">Team-Based Play</h3>
                                <p className="mt-2 text-gray-300">All our adventures are designed for groups, encouraging teamwork and social interaction.</p>
                            </div>
                        </div>
                    </section>

                    {/* CATEGORIES SECTION */}
                    <div className="space-y-16 sm:space-y-24 py-16 sm:py-24 overflow-hidden">
                        {experienceCategories.map((category, index) => (
                            <section id={category.title} key={category.title} className="mx-auto max-w-6xl px-4 sm:px-6">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className={`prose prose-invert max-w-none ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
                                        <h2 className="text-4xl font-poppins font-bold text-white">{category.title}</h2>
                                        <p className="text-lg text-gray-300">{category.description}</p>
                                        <div className="mt-4">
                                            <h4 className="font-bold text-white">Featured Games:</h4>
                                            <div className="flex flex-wrap gap-4 mt-2">
                                                {category.games.map(game => (
                                                    <Link key={game.name} href={game.href} className="bg-cyan-900/70 text-cyan-300 py-2 px-4 rounded-full hover:bg-cyan-800 transition-colors">
                                                        {game.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        {category.title.includes("PvP") && (
                                            <p className="mt-4 text-sm text-gray-400 italic">
                                                Ideal for corporate competitions. <Link href="/private-events" className="underline hover:text-cyan-400">Organize a VR tournament for your team!</Link>
                                            </p>
                                        )}
                                    </div>
                                    <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
                                        <Image
                                            src={category.imageSrc}
                                            alt={category.imageAlt}
                                            width={1000}
                                            height={750}
                                            className="w-full h-full object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* FINAL CTA SECTION */}
                    <section className="bg-gray-900/50 py-20 text-center">
                        <div className="mx-auto max-w-4xl px-4 sm:px-6">
                            <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">Which <span className="text-stroke-blue">Adventure</span> Will You Choose?</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                                Not sure which adventure to choose? Contact us and we’ll help you pick the perfect experience for your group. Or dive right in and book now to secure your session!
                            </p>
                            <BookGameButton label="BOOK YOUR EXPERIENCE" source="experiences-page" />
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}