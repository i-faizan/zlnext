// app/blog/best-vr-games-zero-latency-space-marine-outbreak/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import Container from "@/components/Container";
import BookGameButton from "@/components/BookBtn";

export const metadata: Metadata = {
  title: "Best VR Games at Zero Latency: Space Marine VR, Outbreak, and More | Zero Latency VR Webster Blog",
  description: "Explore the best VR games available at Zero Latency VR Webster. From intense zombie survival in Outbreak to epic sci-fi battles in Space Marine VR, discover which games are perfect for your group.",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/best-vr-games-zero-latency-space-marine-outbreak",
  },
  openGraph: {
    title: "Best VR Games at Zero Latency: Space Marine VR, Outbreak, and More",
    description: "Explore the best VR games available at Zero Latency VR Webster. From intense zombie survival in Outbreak to epic sci-fi battles in Space Marine VR, discover which games are perfect for your group.",
    url: "https://zlwebster.com/blog/best-vr-games-zero-latency-space-marine-outbreak",
    type: "article",
    publishedTime: "2025-01-20",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Best VR Games at Zero Latency: Space Marine VR, Outbreak, and More",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best VR Games at Zero Latency: Space Marine VR, Outbreak, and More",
    description: "Explore the best VR games available at Zero Latency VR Webster. From intense zombie survival in Outbreak to epic sci-fi battles in Space Marine VR.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["best vr games", "zero latency games", "vr games webster", "space marine vr", "outbreak vr"],
};

const publishDate = "2025-01-20";
const author = "Zero Latency VR Webster";
const readTime = 6;
const featuredImage = "/OG.jpg";
const title = "Best VR Games at Zero Latency: Space Marine VR, Outbreak, and More";

const gamesData = [
  { title: "Space Marine VR", slug: "space-marine-vr", imageSrc: "/game-space-marine.webp" },
  { title: "Outbreak", slug: "outbreak", imageSrc: "/game-outbreak.webp" },
  { title: "Sol Raiders", slug: "sol-raiders", imageSrc: "/game-sol-raiders.webp" },
  { title: "Singularity", slug: "singularity", imageSrc: "/game-singularity.webp" },
  { title: "Engineerium", slug: "engineerium", imageSrc: "/game-engineerium.webp" },
];


export default function BestVRGamesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/best-vr-games-zero-latency-space-marine-outbreak" },
  ]);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://zlwebster.com/blog/best-vr-games-zero-latency-space-marine-outbreak#blogpost",
    "headline": title,
    "description": "Explore the best VR games available at Zero Latency VR Webster. From intense zombie survival in Outbreak to epic sci-fi battles in Space Marine VR, discover which games are perfect for your group.",
    "url": "https://zlwebster.com/blog/best-vr-games-zero-latency-space-marine-outbreak",
    "datePublished": publishDate,
    "author": {
      "@type": "Organization",
      "name": author,
      "@id": "https://zlwebster.com/#organization",
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://zlwebster.com/#organization",
      "name": "Zero Latency VR Houston, Webster",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zlwebster.com/ZL-W.png",
      },
    },
    "image": `https://zlwebster.com${featuredImage}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://zlwebster.com/blog/best-vr-games-zero-latency-space-marine-outbreak",
    },
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="blogposting-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <article itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="headline" content={title} />
        <meta itemProp="datePublished" content={publishDate} />
        <main id="main-content">
          <div className="bg-[#000F13] text-gray-200 font-montserrat">
            {/* Hero Section with Featured Image */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src={featuredImage}
                  alt={title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000F13] via-[#000F13]/80 to-transparent"></div>
              </div>
              
              {/* Back to Blog Button - Positioned at top */}
              <div className="absolute top-6 left-0 right-0 z-20">
                <Container>
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 text-sm font-semibold shadow-lg"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </Container>
              </div>

              <Container>
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-12 md:py-16">
                  <h1 className="text-3xl font-poppins text-white font-black sm:text-4xl md:text-5xl lg:text-6xl mb-6">
                    {title}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <time dateTime={publishDate}>
                        {new Date(publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </time>
                    </div>
                    {readTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        <span>{readTime} min read</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">By</span>
                      <span>{author}</span>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* Blog Content */}
            <section className="py-12 md:py-16">
              <Container>
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  <div className="space-y-6 text-gray-300">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">Discover the Best VR Games at Zero Latency</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">Zero Latency VR Webster offers an incredible selection of free-roam VR games, each providing unique experiences and challenges. Whether you&apos;re looking for intense action, cooperative survival, or family-friendly adventures, we have something for everyone.</p>
                    
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">Top Action Games</h2>
                    
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-6 sm:mt-8 mb-4">Space Marine VR - Warhammer 40,000 Experience</h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">For the ultimate sci-fi action experience, Space Marine VR stands out as our most intense game. Step into the ceramite boots of an elite Space Marine and face relentless Tyranid hordes. This game is perfect for VR veterans seeking a challenging 30-45 minute adventure with 1-8 players.</p>
                    
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-6 sm:mt-8 mb-4">Outbreak - Zombie Survival</h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">If you love zombie games, Outbreak delivers an intense 30-minute cooperative survival experience. Work together with your squad to find a cure while fighting off hordes of infected. This game emphasizes teamwork and strategy, making it perfect for groups.</p>
                    
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-6 sm:mt-8 mb-4">Far Cry VR</h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">Based on the iconic Far Cry 3, this VR adventure takes you to a tropical paradise that quickly becomes a fight for survival. Escape from Vaas and his pirates in this action-packed 30-minute experience.</p>
                    
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">Competitive Multiplayer</h2>
                    
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-6 sm:mt-8 mb-4">Sol Raiders - VR Esports</h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">Experience the first VR esports title at Zero Latency. Split into two teams and battle for control of the last resources in this futuristic player-vs-player competition. Perfect for groups of 2-8 players looking for competitive action.</p>
                    
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">Sci-Fi Adventures</h2>
                    
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-6 sm:mt-8 mb-4">Singularity</h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">Battle rogue AI and killer robots aboard a secret military space station. This futuristic sci-fi shooter features zero-gravity sections and is perfect for sci-fi enthusiasts. A 30-minute adventure for 1-8 players.</p>
                    
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">Family-Friendly Options</h2>
                    
                    <h3 className="text-xl sm:text-2xl font-poppins font-bold text-white mt-6 sm:mt-8 mb-4">Engineerium</h3>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">Walk among flying whales and colorful creatures in a mind-bending, gravity-defying world. This non-combat puzzle adventure is perfect for all ages, especially families with younger players. A 15-minute experience that challenges your perception of reality.</p>
                    
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">Choosing the Right Game for Your Group</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">When selecting a game, consider:</p>
                    <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-gray-300 mb-6 ml-4">
                      <li><strong className="text-white font-semibold">Group size:</strong> Most games support 1-8 players, while Sol Raiders requires at least 2 players for PvP action</li>
                      <li><strong className="text-white font-semibold">Experience level:</strong> Space Marine VR is intense and best for VR veterans, while Engineerium is perfect for beginners</li>
                      <li><strong className="text-white font-semibold">Time available:</strong> Games range from 15 minutes (Sol Raiders, Undead Arena) to 45 minutes (Space Marine VR)</li>
                      <li><strong className="text-white font-semibold">Preferences:</strong> Action lovers will enjoy Space Marine VR and Outbreak, while puzzle fans will love Engineerium</li>
                    </ul>
                    
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">Book Your Game Today</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">Ready to experience these incredible VR games? Book your session at Zero Latency VR Webster and discover why we&apos;re Houston&apos;s premier free-roam VR destination.</p>
                  </div>
                </div>
              </Container>
            </section>

            {/* Related Games Section */}
            {gamesData.length > 0 && (
              <section className="py-12 md:py-16 bg-gray-900/50">
                <Container>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white text-center mb-8 sm:mb-12">
                      Related <span className="text-stroke-blue">Games</span>
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {gamesData.map((game) => (
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
                </Container>
              </section>
            )}

            {/* CTA Section */}
            <section className="py-12 md:py-16">
              <Container>
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Ready to Experience <span className="text-stroke-blue">VR?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                      Book your free-roam VR adventure at Zero Latency VR Webster today!
                    </p>
                    <BookGameButton label="Book a Game" source="blog-post-cta" />
                  </div>
                </div>
              </Container>
            </section>
          </div>
        </main>
      </article>
    </>
  );
}

