// app/blog/undead-arena-vr-zombie-game-show/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Gamepad2 } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import { generateArticleSchema } from "@/lib/blogSchema";
import { getBlogPost } from "@/lib/blogData";
import BookGameButton from "@/components/BookBtn";
import RelatedGames from "@/components/RelatedGames";

export const metadata: Metadata = {
  title: "Undead Arena VR: Zombie Game Show at Zero Latency | Webster, Houston",
  description: "Experience Undead Arena VR, a post-apocalyptic zombie game show at Zero Latency Webster. Compete for fame and glory in this fast-paced zombie action game. Book now!",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/undead-arena-vr-zombie-game-show",
  },
  openGraph: {
    title: "Undead Arena VR: Zombie Game Show at Zero Latency",
    description: "Experience Undead Arena VR, a post-apocalyptic zombie game show. Compete for fame and glory in this fast-paced zombie action game.",
    url: "https://zlwebster.com/blog/undead-arena-vr-zombie-game-show",
    type: "article",
    publishedTime: "2025-10-25",
    modifiedTime: "2025-10-25",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Undead Arena VR: Zombie Game Show",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Undead Arena VR: Zombie Game Show at Zero Latency",
    description: "Experience Undead Arena VR, a post-apocalyptic zombie game show. Compete for fame and glory.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["undead arena vr", "undead arena", "zombie game show", "zombie vr game", "post-apocalyptic vr"],
};

const publishDate = "2025-10-25";
const lastModified = "2025-10-25";
const author = "Zero Latency VR Webster";
const readTime = 6;
const featuredImage = "/OG.jpg";
const title = "Undead Arena VR: Zombie Game Show at Zero Latency";

export default function UndeadArenaVRBlogPage() {
  const blogPost = getBlogPost("undead-arena-vr-zombie-game-show");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/undead-arena-vr-zombie-game-show" },
  ]);

  const articleSchema = blogPost 
    ? generateArticleSchema({ ...blogPost, lastModified })
    : generateArticleSchema({
        slug: "undead-arena-vr-zombie-game-show",
        title,
        description: "Experience Undead Arena VR, a post-apocalyptic zombie game show at Zero Latency Webster. Compete for fame and glory in this fast-paced zombie action game.",
        publishDate,
        lastModified,
        author,
        featuredImage,
        games: [],
        readTime,
      });

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content={title} />
        <meta itemProp="datePublished" content={publishDate} />
        <meta itemProp="dateModified" content={lastModified} />
        <main id="main-content">
          <div className="bg-[#000F13] text-gray-200 font-montserrat">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/game-undead-arena.webp"
                  alt="Undead Arena VR - Zombie Game Show"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="opacity-25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000F13] via-[#000F13]/80 to-transparent"></div>
              </div>
              
              <div className="absolute top-6 left-0 right-0 z-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 text-sm font-semibold shadow-lg"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                </div>
              </div>

              <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16 text-center">
                <h1 className="text-4xl font-poppins text-white font-black sm:text-5xl md:text-6xl mb-6">
                  <span className="text-stroke-blue">Undead Arena VR</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed mb-6">
                  Zombie Game Show
                </p>
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
            </section>

            {/* Blog Content */}
            <section className="py-16 md:py-24">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="space-y-8 text-gray-300">
                  {/* Introduction */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">Compete in the Ultimate Zombie Game Show</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-8">
                      <strong className="text-white font-semibold">Undead Arena VR</strong> at Zero Latency VR Webster is a post-apocalyptic game show where you and your friends take on waves of zombies. It&apos;s kill or be killed for fame and glory in this fast-paced 15-minute zombie action game. Compete for the highest score and prove you have what it takes to survive the arena.
                    </p>
                  </div>

                  {/* Featured Section */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                          Fast-Paced <span className="text-cyan-400">Zombie Action</span>
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">
                          Undead Arena combines the intensity of zombie survival with the competitive spirit of a game show. Fight off waves of zombies while competing for the highest score. It&apos;s perfect for groups who want action-packed gameplay in a shorter time frame.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">1-8 Players</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">15 Mins</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">Zombie Action</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src="/game-undead-arena.webp"
                          alt="Undead Arena VR gameplay"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Why It's Great */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">
                      Why Undead Arena VR is Exciting
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🏆 Competitive Scoring</h3>
                        <p className="text-sm text-gray-400">Compete for the highest score and bragging rights</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🧟 Zombie Waves</h3>
                        <p className="text-sm text-gray-400">Face increasingly challenging waves of zombies</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">⚡ Fast-Paced</h3>
                        <p className="text-sm text-gray-400">15 minutes of non-stop action and excitement</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🎮 Game Show Format</h3>
                        <p className="text-sm text-gray-400">Unique post-apocalyptic game show experience</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA to Game Page */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Ready to Enter the <span className="text-stroke-blue">Arena?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                      Book your Undead Arena VR experience at Zero Latency VR Webster and compete for glory!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link 
                        href="/games/undead-arena"
                        className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                      >
                        View Undead Arena VR Details →
                      </Link>
                      <BookGameButton label="Book Undead Arena VR" source="blog-undead-arena-cta" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Games Section */}
            <RelatedGames />

            {/* CTA Section */}
            <section className="py-16 md:py-24">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6 sm:p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Gamepad2 className="h-12 w-12 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                    Experience <span className="text-stroke-blue">Undead Arena VR</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6">
                    Book your zombie game show adventure at Zero Latency VR Webster today!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/games/undead-arena"
                      className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                    >
                      View Undead Arena VR Details →
                    </Link>
                    <BookGameButton label="Book Undead Arena VR" source="blog-undead-arena-final-cta" />
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

