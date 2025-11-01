// src/app/games/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, Clock, Swords, Puzzle, ChevronRight } from "lucide-react";
import BookGameButton from "@/components/BookBtn"; // Ensure this path is correct
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";

// SEO Metadata for the page
export const metadata: Metadata = {
    title: "VR Games at Zero Latency Houston - All Free-Roam Experiences",
    description: "Browse all VR games at Zero Latency Houston. Zombie survival, space adventures, PvP battles, and more. Free-roam VR experiences for 1-8 players.",
    alternates: {
        canonical: "https://zlwebster.com/games",
    },
    openGraph: {
        title: "VR Games at Zero Latency Houston - All Free-Roam Experiences",
        description: "Browse all VR games at Zero Latency Houston. Zombie survival, space adventures, PvP battles, and more.",
        url: "https://zlwebster.com/games",
        type: "website",
        images: [{
            url: "https://zlwebster.com/OG.jpg",
            width: 1200,
            height: 630,
            alt: "Zero Latency VR Houston, Webster - Games collection page",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "VR Games at Zero Latency Houston - All Free-Roam Experiences",
        description: "Browse all VR games at Zero Latency Houston. Zombie survival, space adventures, PvP battles, and more.",
        images: ["https://zlwebster.com/OG.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

const gamesData = [
    {
        title: "Space Marine VR",
        slug: "space-marine-vr",
        imageSrc: "/game-space-marine.webp",
        heroImageSrc: "/game-hero-space-marine.webp", // New wide image for featured section
        description: "Step into the ceramite boots of an elite Space Marine and face relentless Tyranid hordes in a battle for humanity's survival.",
        tagline: "For the Emperor!",
        genre: "Sci-Fi Action",
        genreIcon: Swords,
        players: "1-8",
        duration: "30-45 Mins",
    },
    {
        title: "Outbreak",
        slug: "outbreak",
        imageSrc: "/game-outbreak.webp",
        description: "A deadly virus is ravaging humanity. Your squad is the last hope to find a cure in this intense cooperative survival shooter.",
        tagline: "Survive the Horde",
        genre: "Zombie Survival",
        genreIcon: Swords,
        players: "1-8",
        duration: "30 Mins",
    },
    {
        title: "Far Cry VR",
        slug: "far-cry-vr",
        imageSrc: "/game-far-cry-vr.webp",
        description: "Escape the clutches of Vaas and his pirates in this VR adventure inspired by Far Cry 3. A tropical paradise becomes a fight for your life.",
        tagline: "Enter the Insanity",
        genre: "Action Adventure",
        genreIcon: Swords,
        players: "1-8",
        duration: "30 Mins",
    },
    {
        title: "Singularity",
        slug: "singularity",
        imageSrc: "/game-singularity.webp",
        description: "Battle rogue AI and killer robots aboard a secret military space station. A futuristic sci-fi shooter with zero-gravity sections.",
        tagline: "Defy the Machines",
        genre: "Sci-Fi Shooter",
        genreIcon: Swords,
        players: "1-8",
        duration: "30 Mins",
    },
    {
        title: "Sol Raiders",
        slug: "sol-raiders",
        imageSrc: "/game-sol-raiders.webp",
        description: "The first VR esports title. Split into two teams and battle it out in this futuristic player-vs-player competition for control of the last resources.",
        tagline: "Compete for Glory",
        genre: "PvP Esports",
        genreIcon: Swords,
        players: "2-8",
        duration: "15 Mins",
    },
    {
        title: "Undead Arena",
        slug: "undead-arena",
        imageSrc: "/game-undead-arena.webp",
        description: "Compete in a post-apocalyptic game show where you and your friends take on waves of zombies. It's kill or be killed for fame and glory!",
        tagline: "Showtime, Survivors",
        genre: "Zombie Action",
        genreIcon: Swords,
        players: "1-8",
        duration: "15 Mins",
    },
    {
        title: "Engineerium",
        slug: "engineerium",
        imageSrc: "/game-engineerium.webp",
        description: "Walk among flying whales and colourful creatures in a mind-bending, gravity-defying world. A non-combat puzzle adventure for all ages.",
        tagline: "Defy Gravity",
        genre: "Fantasy Puzzle",
        genreIcon: Puzzle,
        players: "1-8",
        duration: "15 Mins",
    },
];

const featuredGame = gamesData[0];
const otherGames = gamesData.slice(1);


export default function GamesPage() {
    const FeaturedGenreIcon = featuredGame.genreIcon;
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Games", url: "https://zlwebster.com/games" },
    ]);

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <main id="main-content">
            <div className="bg-[#000F13] text-gray-200 font-montserrat">
                
                {/* HERO SECTION */}
                <section className="bg-gray-900/50 pt-32 pb-16 text-center border-b-2 border-cyan-500/20">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6">
                        <h1 className="text-4xl font-poppins text-white font-black sm:text-5xl md:text-6xl">
                            The <span className="text-stroke-blue">Game Library</span>
                        </h1>
                        <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
                            Zero Latency Houston features a diverse library of free-roam VR games, each offering a unique world and challenge. Discover your next adventure below.
                        </p>
                    </div>
                </section>

                {/* FEATURED GAME SECTION */}
                <section className="relative flex min-h-[80vh] items-center text-white overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={featuredGame.heroImageSrc ?? "/background.webp"}
                            alt={`Cinematic hero image for the VR game ${featuredGame.title}`}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000F13] via-[#000F13]/80 to-transparent"></div>
                    </div>
                    <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <p className="font-bold text-cyan-400">FEATURED EXPERIENCE</p>
                            {/* ✨ MOBILE OPTIMIZATION: Responsive text sizes for the main heading ✨ */}
                            <h2 className="mt-2 font-poppins text-5xl font-black sm:text-6xl lg:text-7xl">{featuredGame.title}</h2>
                            <p className="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl">{featuredGame.description}</p>
                            {/* ✨ MOBILE OPTIMIZATION: Flex-wrap allows stats to stack on small screens ✨ */}
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-md md:text-lg">
                                <div className="flex items-center gap-x-2">
                                    <FeaturedGenreIcon className="h-6 w-6 text-cyan-400" />
                                    <span>{featuredGame.genre}</span>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Users className="h-6 w-6 text-cyan-400" />
                                    <span>{featuredGame.players} Players</span>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Clock className="h-6 w-6 text-cyan-400" />
                                    <span>{featuredGame.duration}</span>
                                </div>
                            </div>
                             <div className="mt-10">
                                <BookGameButton label={`BOOK ${featuredGame.title.toUpperCase()}`} source="games-featured-hero" />
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <Link href={`/games/${featuredGame.slug}`} className="w-full max-w-sm">
                                <Image
                                    src={featuredGame.imageSrc}
                                    alt={`Box art for ${featuredGame.title}`}
                                    width={500}
                                    height={700}
                                    priority
                                    className="rounded-lg object-cover shadow-2xl shadow-cyan-500/20 transition-transform duration-300 hover:scale-105"
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* GAMES GRID SECTION */}
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
                    <h3 className="text-3xl font-poppins font-bold text-white sm:text-4xl text-center mb-12">
                        Explore the <span className="text-stroke-blue">Full Arsenal</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {otherGames.map((game) => (
                            // ✨ MOBILE OPTIMIZATION: The card itself is a link, perfect for touch.
                            <Link key={game.title} href={`/games/${game.slug}`} className="group relative flex h-full min-h-[450px] w-full flex-col justify-end overflow-hidden rounded-xl">
                                <Image
                                    src={game.imageSrc}
                                    alt={`Thumbnail image for the VR game ${game.title}`}
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                    className="absolute inset-0 z-0 transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                                />
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                                <div className="relative z-20 p-6 text-white">
                                    <h3 className="font-poppins text-2xl font-bold">{game.title}</h3>
                                    <p className="mt-1 text-sm font-bold uppercase tracking-widest text-cyan-400">{game.tagline}</p>
                                    
                                    {/* ✨ MOBILE OPTIMIZATION: Content is no longer hidden by hover. It is always visible. ✨ */}
                                    <div className="mt-4 border-t border-white/10 pt-4">
                                        <p className="text-gray-300 text-sm mb-4">{game.description}</p>
                                        <div className="flex items-center gap-x-1 text-xs font-semibold">
                                            <span className="flex items-center gap-1"><Users size={14}/> {game.players}</span>
                                            <span className="mx-2">|</span>
                                            <span className="flex items-center gap-1"><Clock size={14}/> {game.duration}</span>
                                            <div className="ml-auto flex items-center text-cyan-300">
                                                <span>Details</span>
                                                <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
        </>
    );
}