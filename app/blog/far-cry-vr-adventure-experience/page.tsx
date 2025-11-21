// app/blog/far-cry-vr-adventure-experience/page.tsx

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
  title: "Far Cry VR: Tropical Adventure Experience at Zero Latency | Webster, Houston",
  description: "Experience Far Cry VR at Zero Latency Webster. Escape from Vaas and his pirates in this action-packed VR adventure inspired by Far Cry 3. Book now!",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/far-cry-vr-adventure-experience",
  },
  openGraph: {
    title: "Far Cry VR: Tropical Adventure Experience at Zero Latency",
    description: "Experience Far Cry VR at Zero Latency Webster. Escape from Vaas and his pirates in this action-packed VR adventure inspired by Far Cry 3.",
    url: "https://zlwebster.com/blog/far-cry-vr-adventure-experience",
    type: "article",
    publishedTime: "2025-10-15",
    modifiedTime: "2025-10-15",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Far Cry VR: Tropical Adventure Experience",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Far Cry VR: Tropical Adventure Experience at Zero Latency",
    description: "Experience Far Cry VR. Escape from Vaas and his pirates in this action-packed VR adventure.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["far cry vr", "far cry 3 vr", "tropical vr adventure", "action vr game"],
};

const publishDate = "2025-10-15";
const lastModified = "2025-10-15";
const author = "Zero Latency VR Webster";
const readTime = 6;
const featuredImage = "/OG.jpg";
const title = "Far Cry VR: Tropical Adventure Experience at Zero Latency";

export default function FarCryVRBlogPage() {
  const blogPost = getBlogPost("far-cry-vr-adventure-experience");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/far-cry-vr-adventure-experience" },
  ]);

  const articleSchema = blogPost 
    ? generateArticleSchema({ ...blogPost, lastModified })
    : generateArticleSchema({
        slug: "far-cry-vr-adventure-experience",
        title,
        description: "Experience Far Cry VR at Zero Latency Webster. Escape from Vaas and his pirates in this action-packed VR adventure inspired by Far Cry 3.",
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
                  src="/game-far-cry-vr.webp"
                  alt="Far Cry VR - Tropical Adventure"
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
                  <span className="text-stroke-blue">Far Cry VR</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed mb-6">
                  Tropical Adventure Experience
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
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">Escape to a Tropical Paradise in VR</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-8">
                      <strong className="text-white font-semibold">Far Cry VR</strong> at Zero Latency VR Webster brings the iconic Far Cry 3 experience to life in virtual reality. Escape the clutches of Vaas and his pirates in this action-packed 30-minute adventure. A tropical paradise quickly becomes a fight for survival as you navigate through jungles, caves, and dangerous territories.
                    </p>
                  </div>

                  {/* Featured Section */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                          The Ultimate <span className="text-cyan-400">Tropical Adventure</span>
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">
                          Inspired by the legendary Far Cry 3, Far Cry VR takes you on an immersive journey through a beautiful but dangerous tropical island. Work with your team to escape from Vaas and his pirates in this intense action-adventure experience.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">1-8 Players</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">30 Mins</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">Action Adventure</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src="/game-far-cry-vr.webp"
                          alt="Far Cry VR gameplay"
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
                      Why Far Cry VR is Unforgettable
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🏝️ Tropical Setting</h3>
                        <p className="text-sm text-gray-400">Explore beautiful but dangerous tropical environments</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">⚔️ Intense Action</h3>
                        <p className="text-sm text-gray-400">Face off against Vaas and his pirates in thrilling combat</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🌴 Exploration</h3>
                        <p className="text-sm text-gray-400">Navigate through jungles, caves, and diverse terrain</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">👥 Team Adventure</h3>
                        <p className="text-sm text-gray-400">Work together with up to 8 players to escape</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA to Game Page */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Ready for a <span className="text-stroke-blue">Tropical Adventure?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                      Book your Far Cry VR experience at Zero Latency VR Webster and escape to the island!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link 
                        href="/games/far-cry-vr"
                        className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                      >
                        View Far Cry VR Details →
                      </Link>
                      <BookGameButton label="Book Far Cry VR" source="blog-far-cry-cta" />
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
                    Experience <span className="text-stroke-blue">Far Cry VR</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6">
                    Book your tropical adventure at Zero Latency VR Webster today!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/games/far-cry-vr"
                      className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                    >
                      View Far Cry VR Details →
                    </Link>
                    <BookGameButton label="Book Far Cry VR" source="blog-far-cry-final-cta" />
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

