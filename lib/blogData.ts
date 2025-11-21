// lib/blogData.ts - Blog posts data structure

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string; // ISO date string
  author: string;
  featuredImage: string;
  games: string[]; // Array of game slugs to link to
  readTime?: number; // Estimated read time in minutes
  keywords?: string[]; // SEO keywords for this post
}

export const blogPosts: BlogPost[] = [
  {
    slug: "complete-guide-zero-latency-vr-webster-houston",
    title: "Complete Guide to Zero Latency VR in Webster, Houston",
    description: "Discover everything you need to know about Zero Latency VR in Webster, Houston. From free-roam VR experiences to the best games like Space Marine VR and Outbreak, this comprehensive guide covers it all.",
    publishDate: "2025-09-05",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "far-cry-vr", "undead-arena"],
    readTime: 8,
    keywords: ["zero latency vr", "vr arena webster", "free roam vr houston", "virtual reality webster"],
  },
  {
    slug: "best-vr-games-zero-latency-space-marine-outbreak",
    title: "Best VR Games at Zero Latency: Space Marine VR, Outbreak, and More",
    description: "Explore the best VR games available at Zero Latency VR Webster. From intense zombie survival in Outbreak to epic sci-fi battles in Space Marine VR, discover which games are perfect for your group.",
    publishDate: "2025-09-10",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "sol-raiders", "singularity", "engineerium"],
    readTime: 6,
    keywords: ["best vr games", "zero latency games", "vr games webster", "space marine vr", "outbreak vr"],
  },
  {
    slug: "things-to-do-houston-texas-vr-adventures",
    title: "Best Things to Do in Houston, Texas: VR Adventures & Ultimate Entertainment Guide",
    description: "Discover the best things to do in Houston, Texas! From free-roam VR adventures at Zero Latency Webster to Space Center Houston, museums, and entertainment. Your ultimate guide to Houston activities.",
    publishDate: "2025-09-15",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "far-cry-vr", "sol-raiders"],
    readTime: 10,
    keywords: ["things to do houston", "houston activities", "houston texas", "vr houston", "zero latency houston", "things to do in houston tx", "houston entertainment"],
  },
  {
    slug: "vr-gaming-near-me-zero-latency-webster-houston",
    title: "VR Gaming Near Me: Find the Best Free-Roam VR Experience in Webster, Houston",
    description: "Looking for VR gaming near me? Zero Latency VR Webster offers the best free-roam VR experiences in Houston. Find VR places, VR arcades, and VR games near you. Book now!",
    publishDate: "2025-09-20",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "far-cry-vr", "sol-raiders"],
    readTime: 8,
    keywords: ["vr gaming near me", "vr places near me", "vr games near me", "vr arcade near me", "vr place near me", "vr room near me", "zero latency near me", "zero latency vr near me", "arcades near me", "things to do near me", "fun near me", "game room near me"],
  },
  {
    slug: "things-to-do-webster-tx-vr-activities",
    title: "Things to Do in Webster TX: VR Activities, Fun for Adults & Kids",
    description: "Discover the best things to do in Webster TX! From free-roam VR adventures at Zero Latency to family activities and fun for adults. Your complete guide to Webster, Texas activities.",
    publishDate: "2025-09-25",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "engineerium", "far-cry-vr"],
    readTime: 9,
    keywords: ["things to do in webster", "fun things to do in webster tx", "things to do in webster, tx for adults", "things to do in webster tx with kids", "vr webster", "virtual reality webster", "zero latency webster photos"],
  },
  {
    slug: "vr-houston-zero-latency-virtual-reality-gaming",
    title: "VR Houston: Zero Latency Virtual Reality Gaming & VR Games",
    description: "Discover the best VR Houston has to offer! Zero Latency VR Webster provides virtual reality gaming, VR games, and immersive VR experiences. Find VR gaming Houston and virtual reality Houston options.",
    publishDate: "2025-10-01",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "sol-raiders", "engineerium"],
    readTime: 8,
    keywords: ["vr houston", "virtual reality houston", "vr gaming houston", "vr games houston", "zero latency houston", "zero latency houston photos", "virtual reality", "vr", "virtual reality arena", "zero latency arena"],
  },
  {
    slug: "space-marine-vr-warhammer-40000-experience",
    title: "Space Marine VR: Warhammer 40,000 Experience at Zero Latency",
    description: "Experience Space Marine VR, the ultimate Warhammer 40,000 VR game at Zero Latency Webster. Battle Tyranid hordes in this intense free-roam VR experience. Book now!",
    publishDate: "2025-10-05",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr"],
    readTime: 7,
    keywords: ["space marine vr", "warhammer 40000 vr", "space marine", "vr games"],
  },
  {
    slug: "outbreak-vr-zombie-survival-game",
    title: "Outbreak VR: Zombie Survival Game at Zero Latency",
    description: "Experience Outbreak VR, the ultimate zombie survival game at Zero Latency Webster. Fight hordes of infected in this intense cooperative VR experience. Book now!",
    publishDate: "2025-10-10",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["outbreak"],
    readTime: 7,
    keywords: ["outbreak vr", "zombie vr game", "zombie survival vr", "outbreak", "vr zombie game"],
  },
  {
    slug: "far-cry-vr-adventure-experience",
    title: "Far Cry VR: Tropical Adventure Experience at Zero Latency",
    description: "Experience Far Cry VR at Zero Latency Webster. Escape from Vaas and his pirates in this action-packed VR adventure inspired by Far Cry 3. Book now!",
    publishDate: "2025-10-15",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["far-cry-vr"],
    readTime: 6,
    keywords: ["far cry vr", "far cry 3 vr", "tropical vr adventure", "action vr game"],
  },
  {
    slug: "engineerium-vr-family-friendly-puzzle-adventure",
    title: "Engineerium VR: Family-Friendly Puzzle Adventure at Zero Latency",
    description: "Experience Engineerium VR, a family-friendly puzzle adventure at Zero Latency Webster. Walk among flying whales in a gravity-defying world perfect for all ages. Book now!",
    publishDate: "2025-10-20",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["engineerium"],
    readTime: 6,
    keywords: ["engineerium vr", "family vr game", "puzzle vr", "family-friendly vr", "non-combat vr"],
  },
  {
    slug: "undead-arena-vr-zombie-game-show",
    title: "Undead Arena VR: Zombie Game Show at Zero Latency",
    description: "Experience Undead Arena VR, a post-apocalyptic zombie game show at Zero Latency Webster. Compete for fame and glory in this fast-paced zombie action game. Book now!",
    publishDate: "2025-10-25",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["undead-arena"],
    readTime: 6,
    keywords: ["undead arena vr", "undead arena", "zombie game show", "zombie vr game", "post-apocalyptic vr"],
  },
  {
    slug: "haunted-house-near-me-zero-latency-vr-horror",
    title: "Haunted House Near Me: Zero Latency VR Horror Experience",
    description: "Looking for a haunted house near me? Experience Haunted VR at Zero Latency Webster—the scariest full-body VR horror experience. Ultra-immersive terror that feels real. Book now!",
    publishDate: "2025-11-01",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["haunted"],
    readTime: 7,
    keywords: ["haunted house near me", "haunted house", "vr horror", "horror vr experience", "scary vr", "haunted vr"],
  },
  {
    slug: "fun-dates-near-me-zero-latency-vr-experience",
    title: "Fun Dates Near Me: Zero Latency VR Experience for Couples",
    description: "Looking for fun dates near me? Zero Latency VR Webster offers unique VR date experiences perfect for couples. Skip dinner and a movie—try something unforgettable! Book now!",
    publishDate: "2025-11-05",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["engineerium", "outbreak", "far-cry-vr", "haunted"],
    readTime: 7,
    keywords: ["fun dates near me", "date ideas", "couples vr", "unique date experience", "vr date", "romantic vr"],
  },
  {
    slug: "vr-arcade-near-me-zero-latency-free-roam",
    title: "VR Arcade Near Me: Zero Latency Free-Roam VR vs Traditional Arcades",
    description: "Looking for a VR arcade near me? Zero Latency VR Webster is not your typical VR arcade—it's a free-roam VR experience. Discover the difference between VR arcades and true free-roam VR.",
    publishDate: "2025-11-10",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "sol-raiders", "engineerium"],
    readTime: 8,
    keywords: ["vr arcade near me", "vr arcade", "arcade", "vr world", "virtual reality arena", "free roam vr arcade"],
  },
  {
    slug: "zero-latency-vr-latency-technology-explained",
    title: "Zero Latency VR: What is VR Latency & Why It Matters",
    description: "Learn about Zero Latency VR technology and why low VR latency matters. Discover how Zero Latency VR Webster delivers virtually lag-free free-roam VR experiences. Book now!",
    publishDate: "2025-11-15",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "sol-raiders"],
    readTime: 7,
    keywords: ["zero latency", "zerolatency", "vr latency", "zero latency vr", "low latency vr", "vr technology"],
  },
  {
    slug: "things-to-do-houston-weekend",
    title: "Best Things to Do in Houston on Weekend: Your Ultimate Weekend Adventure Guide",
    description: "Discover the best things to do in Houston on weekend! From free-roam VR adventures at Zero Latency Webster to brunch spots, outdoor activities, and nightlife. Your complete Houston weekend guide.",
    publishDate: "2025-01-20",
    author: "Zero Latency VR Webster",
    featuredImage: "/OG.jpg",
    games: ["space-marine-vr", "outbreak", "far-cry-vr", "engineerium", "sol-raiders"],
    readTime: 12,
    keywords: ["things to do houston weekend", "houston weekend activities", "weekend in houston", "houston saturday", "houston sunday", "houston weekend guide", "weekend houston tx"],
  },
];

// Helper function to get a blog post by slug
export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get all blog posts (sorted by date, newest first)
export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

