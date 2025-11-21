// app/blog/haunted-house-near-me-zero-latency-vr-horror/page.tsx

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
  title: "Haunted House Near Me: Zero Latency VR Horror Experience | Webster, Houston",
  description: "Looking for a haunted house near me? Experience Haunted VR at Zero Latency Webster—the scariest full-body VR horror experience. Ultra-immersive terror that feels real. Book now!",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/haunted-house-near-me-zero-latency-vr-horror",
  },
  openGraph: {
    title: "Haunted House Near Me: Zero Latency VR Horror Experience",
    description: "Looking for a haunted house near me? Experience Haunted VR at Zero Latency Webster—the scariest full-body VR horror experience.",
    url: "https://zlwebster.com/blog/haunted-house-near-me-zero-latency-vr-horror",
    type: "article",
    publishedTime: "2025-11-01",
    modifiedTime: "2025-11-01",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Haunted House Near Me: Zero Latency VR Horror Experience",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Haunted House Near Me: Zero Latency VR Horror Experience",
    description: "Looking for a haunted house near me? Experience Haunted VR—the scariest full-body VR horror experience.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["haunted house near me", "haunted house", "vr horror", "horror vr experience", "scary vr", "haunted vr"],
};

const publishDate = "2025-11-01";
const lastModified = "2025-11-01";
const author = "Zero Latency VR Webster";
const readTime = 7;
const featuredImage = "/OG.jpg";
const title = "Haunted House Near Me: Zero Latency VR Horror Experience";

export default function HauntedHouseNearMePage() {
  const blogPost = getBlogPost("haunted-house-near-me-zero-latency-vr-horror");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/haunted-house-near-me-zero-latency-vr-horror" },
  ]);

  const articleSchema = blogPost 
    ? generateArticleSchema({ ...blogPost, lastModified })
    : generateArticleSchema({
        slug: "haunted-house-near-me-zero-latency-vr-horror",
        title,
        description: "Looking for a haunted house near me? Experience Haunted VR at Zero Latency Webster—the scariest full-body VR horror experience. Ultra-immersive terror that feels real.",
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
                  src="/haunted-house-bg.webp"
                  alt="Haunted VR - Horror Experience"
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
                  <span className="text-stroke-blue">Haunted House Near Me</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed mb-6">
                  Zero Latency VR Horror Experience
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
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">The Scariest Haunted House Experience Near You</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-8">
                      If you&apos;re searching for a <strong className="text-white font-semibold">haunted house near me</strong> or a <strong className="text-white font-semibold">haunted house</strong> experience, look no further than <strong className="text-white font-semibold">Haunted VR</strong> at Zero Latency VR Webster. This isn&apos;t your typical haunted house—it&apos;s the latest in full-body, ultra-immersive VR terror. A world that doesn&apos;t just look scary, it <strong className="text-white font-semibold">feels</strong> scary.
                    </p>
                  </div>

                  {/* Featured Section */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                          Virtual Horror. <span className="text-cyan-400">Real Fear.</span>
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">
                          Haunted VR uses next-generation 360° immersion, spatial sound, and 5K resolution to bring your darkest fears to life. Your hands shake. Your heart races. It&apos;s the scariest, realest full-body immersive experience available. Unlike traditional haunted houses, you&apos;re not just walking through—you&apos;re living the nightmare.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">1-8 Players</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">30 Mins</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">Horror VR</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src="/haunted-house-bg.webp"
                          alt="Haunted VR - Horror experience"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Why It's Different */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6">
                      Why Haunted VR is Different from Other Haunted Houses
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🌍 Full-Body Immersion</h3>
                        <p className="text-sm text-gray-400">You physically move through the haunted house, not just watch</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🔊 Spatial Sound</h3>
                        <p className="text-sm text-gray-400">3D audio makes every creak and whisper feel real</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">👁️ 5K Resolution</h3>
                        <p className="text-sm text-gray-400">Crystal-clear visuals make the horror feel incredibly real</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">💀 Psychological Terror</h3>
                        <p className="text-sm text-gray-400">Designed to create genuine fear, not just jump scares</p>
                      </div>
                    </div>
                  </div>

                  {/* Perfect For */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-gray-900/50 rounded-xl p-6 sm:p-8 border-2 border-cyan-500/30">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-6 text-center">
                      Perfect For Horror Enthusiasts
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6 text-center">
                      Haunted VR is ideal for:
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">👻</div>
                        <h3 className="text-white font-semibold mb-1">Horror Fans</h3>
                        <p className="text-sm text-gray-400">The ultimate scary experience</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">🎃</div>
                        <h3 className="text-white font-semibold mb-1">Halloween Seekers</h3>
                        <p className="text-sm text-gray-400">Year-round haunted house</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">💪</div>
                        <h3 className="text-white font-semibold mb-1">Thrill Seekers</h3>
                        <p className="text-sm text-gray-400">Test your courage</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA to Game Page */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Dare to Enter the <span className="text-stroke-blue">Haunted House?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                      Book your Haunted VR experience at Zero Latency VR Webster and see if you can survive the house!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link 
                        href="/games/haunted"
                        className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                      >
                        View Haunted VR Details →
                      </Link>
                      <BookGameButton label="Book Haunted VR" source="blog-haunted-cta" />
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
                    Experience the <span className="text-stroke-blue">Haunted House</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6">
                    Book your horror VR adventure at Zero Latency VR Webster today!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/games/haunted"
                      className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                    >
                      View Haunted VR Details →
                    </Link>
                    <BookGameButton label="Book Haunted VR" source="blog-haunted-final-cta" />
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

