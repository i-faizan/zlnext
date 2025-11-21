// app/blog/engineerium-vr-family-friendly-puzzle-adventure/page.tsx

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
  title: "Engineerium VR: Family-Friendly Puzzle Adventure at Zero Latency | Webster",
  description: "Experience Engineerium VR, a family-friendly puzzle adventure at Zero Latency Webster. Walk among flying whales in a gravity-defying world perfect for all ages. Book now!",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/engineerium-vr-family-friendly-puzzle-adventure",
  },
  openGraph: {
    title: "Engineerium VR: Family-Friendly Puzzle Adventure at Zero Latency",
    description: "Experience Engineerium VR, a family-friendly puzzle adventure. Walk among flying whales in a gravity-defying world perfect for all ages.",
    url: "https://zlwebster.com/blog/engineerium-vr-family-friendly-puzzle-adventure",
    type: "article",
    publishedTime: "2025-10-20",
    modifiedTime: "2025-10-20",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Engineerium VR: Family-Friendly Puzzle Adventure",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineerium VR: Family-Friendly Puzzle Adventure at Zero Latency",
    description: "Experience Engineerium VR, a family-friendly puzzle adventure. Walk among flying whales in a gravity-defying world.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["engineerium vr", "family vr game", "puzzle vr", "family-friendly vr", "non-combat vr"],
};

const publishDate = "2025-10-20";
const lastModified = "2025-10-20";
const author = "Zero Latency VR Webster";
const readTime = 6;
const featuredImage = "/OG.jpg";
const title = "Engineerium VR: Family-Friendly Puzzle Adventure at Zero Latency";

export default function EngineeriumVRBlogPage() {
  const blogPost = getBlogPost("engineerium-vr-family-friendly-puzzle-adventure");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/engineerium-vr-family-friendly-puzzle-adventure" },
  ]);

  const articleSchema = blogPost 
    ? generateArticleSchema({ ...blogPost, lastModified })
    : generateArticleSchema({
        slug: "engineerium-vr-family-friendly-puzzle-adventure",
        title,
        description: "Experience Engineerium VR, a family-friendly puzzle adventure at Zero Latency Webster. Walk among flying whales in a gravity-defying world perfect for all ages.",
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
                  src="/game-engineerium.webp"
                  alt="Engineerium VR - Family-Friendly Puzzle"
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
                  <span className="text-stroke-blue">Engineerium VR</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed mb-6">
                  Family-Friendly Puzzle Adventure
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
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">A Mind-Bending Family Adventure</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-8">
                      <strong className="text-white font-semibold">Engineerium VR</strong> at Zero Latency VR Webster is the perfect family-friendly VR experience. Walk among flying whales and colorful creatures in a mind-bending, gravity-defying world. This non-combat puzzle adventure is perfect for all ages, especially families with younger players looking for a unique and engaging VR experience.
                    </p>
                  </div>

                  {/* Featured Section */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                          Perfect for <span className="text-cyan-400">Families</span>
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">
                          Engineerium VR is our only non-combat game, making it ideal for families, beginners, and anyone who wants to experience VR without the intensity of action games. This 15-minute experience challenges your perception of reality as you navigate through impossible architecture and interact with fantastical creatures.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">1-8 Players</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">15 Mins</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">Family-Friendly</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src="/game-engineerium.webp"
                          alt="Engineerium VR gameplay"
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
                      Why Engineerium VR is Perfect for Families
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🚫 No Combat</h3>
                        <p className="text-sm text-gray-400">Completely non-violent experience perfect for all ages</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🧩 Puzzle-Based</h3>
                        <p className="text-sm text-gray-400">Engaging puzzles that challenge your mind, not your reflexes</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🐋 Beautiful World</h3>
                        <p className="text-sm text-gray-400">Stunning visuals with flying whales and colorful creatures</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">⏱️ Perfect Length</h3>
                        <p className="text-sm text-gray-400">15 minutes is ideal for first-time VR users and families</p>
                      </div>
                    </div>
                  </div>

                  {/* Perfect For */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-gray-900/50 rounded-xl p-6 sm:p-8 border-2 border-cyan-500/30">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-6 text-center">
                      Perfect For Everyone
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                        <h3 className="text-white font-semibold mb-1">Families</h3>
                        <p className="text-sm text-gray-400">Perfect for all ages</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">🎓</div>
                        <h3 className="text-white font-semibold mb-1">Beginners</h3>
                        <p className="text-sm text-gray-400">Great first VR experience</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">🧩</div>
                        <h3 className="text-white font-semibold mb-1">Puzzle Lovers</h3>
                        <p className="text-sm text-gray-400">Mind-bending challenges</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA to Game Page */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Ready to Defy <span className="text-stroke-blue">Gravity?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                      Book your Engineerium VR experience at Zero Latency VR Webster and explore a world of wonder!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link 
                        href="/games/engineerium"
                        className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                      >
                        View Engineerium VR Details →
                      </Link>
                      <BookGameButton label="Book Engineerium VR" source="blog-engineerium-cta" />
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
                    Experience <span className="text-stroke-blue">Engineerium VR</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6">
                    Book your family-friendly puzzle adventure at Zero Latency VR Webster today!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/games/engineerium"
                      className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                    >
                      View Engineerium VR Details →
                    </Link>
                    <BookGameButton label="Book Engineerium VR" source="blog-engineerium-final-cta" />
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

