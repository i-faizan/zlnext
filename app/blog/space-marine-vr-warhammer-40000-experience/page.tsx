// app/blog/space-marine-vr-warhammer-40000-experience/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Users, Gamepad2 } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import { generateArticleSchema } from "@/lib/blogSchema";
import { getBlogPost } from "@/lib/blogData";
import BookGameButton from "@/components/BookBtn";
import RelatedGames from "@/components/RelatedGames";

export const metadata: Metadata = {
  title: "Space Marine VR: Warhammer 40,000 Experience at Zero Latency | Webster, Houston",
  description: "Experience Space Marine VR, the ultimate Warhammer 40,000 VR game at Zero Latency Webster. Battle Tyranid hordes in this intense free-roam VR experience. Book now!",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/space-marine-vr-warhammer-40000-experience",
  },
  openGraph: {
    title: "Space Marine VR: Warhammer 40,000 Experience at Zero Latency",
    description: "Experience Space Marine VR, the ultimate Warhammer 40,000 VR game at Zero Latency Webster. Battle Tyranid hordes in this intense free-roam VR experience.",
    url: "https://zlwebster.com/blog/space-marine-vr-warhammer-40000-experience",
    type: "article",
    publishedTime: "2025-10-05",
    modifiedTime: "2025-10-05",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Space Marine VR: Warhammer 40,000 Experience",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Space Marine VR: Warhammer 40,000 Experience at Zero Latency",
    description: "Experience Space Marine VR, the ultimate Warhammer 40,000 VR game. Battle Tyranid hordes in free-roam VR.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["space marine vr", "warhammer 40000 vr", "space marine", "vr games"],
};

const publishDate = "2025-10-05";
const lastModified = "2025-10-05";
const author = "Zero Latency VR Webster";
const readTime = 7;
const featuredImage = "/OG.jpg";
const title = "Space Marine VR: Warhammer 40,000 Experience at Zero Latency";

export default function SpaceMarineVRBlogPage() {
  const blogPost = getBlogPost("space-marine-vr-warhammer-40000-experience");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/space-marine-vr-warhammer-40000-experience" },
  ]);

  const articleSchema = blogPost 
    ? generateArticleSchema({ ...blogPost, lastModified })
    : generateArticleSchema({
        slug: "space-marine-vr-warhammer-40000-experience",
        title,
        description: "Experience Space Marine VR, the ultimate Warhammer 40,000 VR game at Zero Latency Webster. Battle Tyranid hordes in this intense free-roam VR experience.",
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
                  src="/game-hero-space-marine.webp"
                  alt="Space Marine VR - Warhammer 40,000 Experience at Zero Latency VR Webster"
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
                  <span className="text-stroke-blue">Space Marine VR</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed mb-6">
                  Warhammer 40,000 Experience
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
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">Step Into the Warhammer 40,000 Universe</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-8">
                      <strong className="text-white font-semibold">Space Marine VR</strong> at Zero Latency VR Webster brings the iconic Warhammer 40,000 universe to life like never before. This isn&apos;t just a VR game—it&apos;s a full-body, immersive experience where you become an elite Space Marine fighting for humanity&apos;s survival against relentless Tyranid hordes.
                    </p>
                  </div>

                  {/* Featured Section */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                          The Ultimate <span className="text-cyan-400">Space Marine</span> Experience
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">
                          Space Marine VR is our most intense and challenging game, perfect for VR veterans and Warhammer 40,000 fans. Step into the ceramite boots of a genetically enhanced super-soldier and unleash devastating firepower against the Tyranid swarm in a 30-45 minute epic battle.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">1-8 Players</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">30-45 Mins</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">Warhammer 40K</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src="/game-space-marine.webp"
                          alt="Players battling Tyranid hordes in Space Marine VR at Zero Latency VR Webster"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* What Makes It Special */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">
                      Why Space Marine VR is Unforgettable
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">⚔️ Authentic Warhammer 40K</h3>
                        <p className="text-sm text-gray-400">Experience the iconic universe with stunning detail and faithful representation of the Warhammer 40,000 lore</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🔥 Intense Combat</h3>
                        <p className="text-sm text-gray-400">Face relentless Tyranid swarms in fast-paced, challenging combat that tests your skills</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">👥 Squad-Based Gameplay</h3>
                        <p className="text-sm text-gray-400">Work together with up to 8 players in coordinated tactical missions</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">⏱️ Extended Experience</h3>
                        <p className="text-sm text-gray-400">Our longest game at 30-45 minutes, giving you time to fully immerse in the world</p>
                      </div>
                    </div>
                  </div>

                  {/* Perfect For */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-gray-900/50 rounded-xl p-6 sm:p-8 border-2 border-cyan-500/30">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-6 text-center">
                      Perfect For Warhammer 40,000 Fans
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6 text-center">
                      Space Marine VR is ideal for:
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">🎮</div>
                        <h3 className="text-white font-semibold mb-1">Warhammer Fans</h3>
                        <p className="text-sm text-gray-400">Experience the universe you love</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">⚔️</div>
                        <h3 className="text-white font-semibold mb-1">VR Veterans</h3>
                        <p className="text-sm text-gray-400">Most challenging experience</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">👥</div>
                        <h3 className="text-white font-semibold mb-1">Gaming Groups</h3>
                        <p className="text-sm text-gray-400">Perfect for coordinated teams</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA to Game Page */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Ready to Become a <span className="text-stroke-blue">Space Marine?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                      Experience the most intense VR game at Zero Latency VR Webster. Book your Space Marine VR adventure today!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link 
                        href="/games/space-marine-vr"
                        className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                      >
                        View Space Marine VR Details →
                      </Link>
                      <BookGameButton label="Book Space Marine VR" source="blog-space-marine-cta" />
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
                    Experience <span className="text-stroke-blue">Space Marine VR</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6">
                    Book your Warhammer 40,000 VR adventure at Zero Latency VR Webster today!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="h-4 w-4 text-cyan-400" />
                      <span>1-8 Players</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span>30-45 Minutes</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/games/space-marine-vr"
                      className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                    >
                      View Space Marine VR Details →
                    </Link>
                    <BookGameButton label="Book Space Marine VR" source="blog-space-marine-final-cta" />
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

