// components/RelatedGames.tsx - Reusable component for displaying all games on blog pages

import Image from "next/image";
import Link from "next/link";
import { allGames } from "@/lib/gamesData";

export default function RelatedGames() {
  return (
    <section className="py-16 md:py-24 bg-gray-900/50 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white text-center mb-8 sm:mb-12">
          Featured <span className="text-stroke-blue">VR Games</span> at Zero Latency Webster
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allGames.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={game.imageSrc}
                  alt={game.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-poppins font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-cyan-400 mt-2">View Game Details →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

