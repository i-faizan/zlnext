import Image from "next/image";
import Link from "next/link";
import { Users, Clock, ChevronRight } from "lucide-react";

// Game data matching the structure from app/games/page.tsx
const gamesData = [
    {
        title: "Space Marine VR",
        slug: "space-marine-vr",
        imageSrc: "/game-space-marine.webp",
        description: "Step into the ceramite boots of an elite Space Marine and face relentless Tyranid hordes in a battle for humanity's survival.",
        tagline: "For the Emperor!",
        players: "1-8",
        duration: "30-45 Mins",
    },
    {
        title: "Outbreak",
        slug: "outbreak",
        imageSrc: "/game-outbreak.webp",
        description: "A deadly virus is ravaging humanity. Your squad is the last hope to find a cure in this intense cooperative survival shooter.",
        tagline: "Survive the Horde",
        players: "1-8",
        duration: "30 Mins",
    },
    {
        title: "Far Cry VR",
        slug: "far-cry-vr",
        imageSrc: "/game-far-cry-vr.webp",
        description: "Escape the clutches of Vaas and his pirates in this VR adventure inspired by Far Cry 3. A tropical paradise becomes a fight for your life.",
        tagline: "Enter the Insanity",
        players: "1-8",
        duration: "30 Mins",
    },
    {
        title: "Singularity",
        slug: "singularity",
        imageSrc: "/game-singularity.webp",
        description: "Battle rogue AI and killer robots aboard a secret military space station. A futuristic sci-fi shooter with zero-gravity sections.",
        tagline: "Defy the Machines",
        players: "1-8",
        duration: "30 Mins",
    },
    {
        title: "Sol Raiders",
        slug: "sol-raiders",
        imageSrc: "/game-sol-raiders.webp",
        description: "The first VR esports title. Split into two teams and battle it out in this futuristic player-vs-player competition for control of the last resources.",
        tagline: "Compete for Glory",
        players: "2-8",
        duration: "15 Mins",
    },
    {
        title: "Undead Arena",
        slug: "undead-arena",
        imageSrc: "/game-undead-arena.webp",
        description: "Compete in a post-apocalyptic game show where you and your friends take on waves of zombies. It's kill or be killed for fame and glory!",
        tagline: "Showtime, Survivors",
        players: "1-8",
        duration: "15 Mins",
    },
    {
        title: "Engineerium",
        slug: "engineerium",
        imageSrc: "/game-engineerium.webp",
        description: "Walk among flying whales and colourful creatures in a mind-bending, gravity-defying world. A non-combat puzzle adventure for all ages.",
        tagline: "Defy Gravity",
        players: "1-8",
        duration: "15 Mins",
    },
    {
        title: "Haunted",
        slug: "haunted",
        imageSrc: "/haunted-house-bg.webp",
        description: "Experience Haunted, the latest in full-body, ultra-immersive VR terror. A world that doesn't just look scary, it feels scary. Can you survive the house?",
        tagline: "Dare to Enter",
        players: "1-8",
        duration: "30 Mins",
    },
];

interface OtherGamesProps {
    currentGameSlug: string;
}

export default function OtherGames({ currentGameSlug }: OtherGamesProps) {
    // Filter out the current game
    const otherGames = gamesData.filter(game => game.slug !== currentGameSlug);

    return (
        <section className="py-20 sm:py-24 bg-gray-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <h2 className="text-3xl font-poppins font-bold text-white sm:text-4xl text-center mb-12">
                    Explore <span className="text-stroke-blue">Other Games</span>
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {otherGames.map((game) => (
                        <Link 
                            key={game.title} 
                            href={`/games/${game.slug}`}
                            className="group relative flex h-full min-h-[450px] w-full flex-col justify-end overflow-hidden rounded-xl"
                        >
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
            </div>
        </section>
    );
}

