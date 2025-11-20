// app/blog/outbreak-vr-zombie-survival-game/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Users, Gamepad2 } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import BookGameButton from "@/components/BookBtn";
import RelatedGames from "@/components/RelatedGames";

export const metadata: Metadata = {
  title: "Outbreak VR: Zombie Survival Game at Zero Latency | Webster, Houston",
  description: "Experience Outbreak VR, the ultimate zombie survival game at Zero Latency Webster. Fight hordes of infected in this intense cooperative VR experience. Book now!",
  authors: [{ name: "Zero Latency VR Webster" }],
  creator: "Zero Latency VR Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog/outbreak-vr-zombie-survival-game",
  },
  openGraph: {
    title: "Outbreak VR: Zombie Survival Game at Zero Latency",
    description: "Experience Outbreak VR, the ultimate zombie survival game at Zero Latency Webster. Fight hordes of infected in this intense cooperative VR experience.",
    url: "https://zlwebster.com/blog/outbreak-vr-zombie-survival-game",
    type: "article",
    publishedTime: "2025-10-10",
    authors: ["Zero Latency VR Webster"],
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Outbreak VR: Zombie Survival Game",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outbreak VR: Zombie Survival Game at Zero Latency",
    description: "Experience Outbreak VR, the ultimate zombie survival game. Fight hordes of infected in cooperative VR.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["outbreak vr", "zombie vr game", "zombie survival vr", "outbreak", "vr zombie game"],
};

const publishDate = "2025-10-10";
const author = "Zero Latency VR Webster";
const readTime = 7;
const featuredImage = "/OG.jpg";
const title = "Outbreak VR: Zombie Survival Game at Zero Latency";

export default function OutbreakVRBlogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
    { name: title, url: "https://zlwebster.com/blog/outbreak-vr-zombie-survival-game" },
  ]);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": "https://zlwebster.com/blog/outbreak-vr-zombie-survival-game#blogpost",
    "headline": title,
    "description": "Experience Outbreak VR, the ultimate zombie survival game at Zero Latency Webster. Fight hordes of infected in this intense cooperative VR experience.",
    "url": "https://zlwebster.com/blog/outbreak-vr-zombie-survival-game",
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
      "@id": "https://zlwebster.com/blog/outbreak-vr-zombie-survival-game",
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
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/game-outbreak.webp"
                  alt="Outbreak VR - Zombie Survival"
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
                  <span className="text-stroke-blue">Outbreak VR</span>
                </h1>
                <p className="text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed mb-6">
                  Zombie Survival Game
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
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mt-8 sm:mt-12 mb-6 first:mt-0">Survive the Zombie Apocalypse in VR</h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-8">
                      <strong className="text-white font-semibold">Outbreak VR</strong> at Zero Latency VR Webster is the ultimate zombie survival experience. A deadly virus is ravaging humanity, and your squad is the last hope. This intense 30-minute cooperative survival shooter will test your teamwork, strategy, and survival skills as you fight to find a cure and save the world.
                    </p>
                  </div>

                  {/* Featured Section */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                          The Ultimate <span className="text-cyan-400">Zombie Survival</span> Experience
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-4">
                          Outbreak VR delivers heart-pounding action as you and your team fight off hordes of infected. This game emphasizes cooperation and strategy—you&apos;ll need to work together to survive. Perfect for groups who love zombie games and cooperative gameplay.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm mt-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">1-8 Players</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">30 Mins</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">Cooperative</span>
                        </div>
                      </div>
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src="/game-outbreak.webp"
                          alt="Outbreak VR gameplay"
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
                      Why Outbreak VR is a Must-Play
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🧟 Intense Zombie Action</h3>
                        <p className="text-sm text-gray-400">Face hordes of infected in fast-paced, challenging combat</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">👥 Teamwork Required</h3>
                        <p className="text-sm text-gray-400">Cooperation is key to survival—coordinate with your squad</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">🎯 Strategic Gameplay</h3>
                        <p className="text-sm text-gray-400">Find the cure while managing resources and defending your position</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
                        <h3 className="text-lg font-poppins font-bold text-white mb-2">⏱️ Perfect Length</h3>
                        <p className="text-sm text-gray-400">30 minutes of intense action that keeps you engaged throughout</p>
                      </div>
                    </div>
                  </div>

                  {/* Perfect For */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-gray-900/50 rounded-xl p-6 sm:p-8 border-2 border-cyan-500/30">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-6 text-center">
                      Perfect For Zombie Game Fans
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6 text-center">
                      Outbreak VR is ideal for:
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">🧟</div>
                        <h3 className="text-white font-semibold mb-1">Zombie Fans</h3>
                        <p className="text-sm text-gray-400">The ultimate zombie survival experience</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">👥</div>
                        <h3 className="text-white font-semibold mb-1">Team Players</h3>
                        <p className="text-sm text-gray-400">Cooperative gameplay at its best</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 text-center">
                        <div className="text-3xl mb-2">🎮</div>
                        <h3 className="text-white font-semibold mb-1">Action Lovers</h3>
                        <p className="text-sm text-gray-400">Fast-paced, intense combat</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA to Game Page */}
                  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-white mb-4">
                      Ready to Survive the <span className="text-stroke-blue">Outbreak?</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6">
                      Book your Outbreak VR experience at Zero Latency VR Webster and test your survival skills!
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link 
                        href="/games/outbreak"
                        className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                      >
                        View Outbreak VR Details →
                      </Link>
                      <BookGameButton label="Book Outbreak VR" source="blog-outbreak-cta" />
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
                    Experience <span className="text-stroke-blue">Outbreak VR</span>
                  </h2>
                  <p className="text-base sm:text-lg text-gray-300 mb-6">
                    Book your zombie survival adventure at Zero Latency VR Webster today!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="h-4 w-4 text-cyan-400" />
                      <span>1-8 Players</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span>30 Minutes</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/games/outbreak"
                      className="text-cyan-400 hover:text-cyan-300 underline text-lg"
                    >
                      View Outbreak VR Details →
                    </Link>
                    <BookGameButton label="Book Outbreak VR" source="blog-outbreak-final-cta" />
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

