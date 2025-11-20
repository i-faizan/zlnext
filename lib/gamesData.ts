// lib/gamesData.ts - Centralized games data for use across the site

export interface Game {
  title: string;
  slug: string;
  imageSrc: string;
}

export const allGames: Game[] = [
  {
    title: "Space Marine VR",
    slug: "space-marine-vr",
    imageSrc: "/game-space-marine.webp",
  },
  {
    title: "Outbreak",
    slug: "outbreak",
    imageSrc: "/game-outbreak.webp",
  },
  {
    title: "Far Cry VR",
    slug: "far-cry-vr",
    imageSrc: "/game-far-cry-vr.webp",
  },
  {
    title: "Singularity",
    slug: "singularity",
    imageSrc: "/game-singularity.webp",
  },
  {
    title: "Sol Raiders",
    slug: "sol-raiders",
    imageSrc: "/game-sol-raiders.webp",
  },
  {
    title: "Undead Arena",
    slug: "undead-arena",
    imageSrc: "/game-undead-arena.webp",
  },
  {
    title: "Engineerium",
    slug: "engineerium",
    imageSrc: "/game-engineerium.webp",
  },
  {
    title: "Haunted",
    slug: "haunted",
    imageSrc: "/haunted-house-bg.webp",
  },
];

