// app/blog/page.tsx - Blog listing page

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getAllBlogPosts } from "@/lib/blogData";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Blog | Zero Latency VR Webster - VR Gaming News & Guides",
  description: "Read the latest articles about Zero Latency VR, free-roam virtual reality experiences, VR games, and tips for the best VR adventures in Webster, Houston.",
  authors: [{ name: "Zero Latency VR Houston, Webster" }],
  creator: "Zero Latency VR Houston, Webster",
  publisher: "Zero Latency VR Houston, Webster",
  alternates: {
    canonical: "https://zlwebster.com/blog",
  },
  openGraph: {
    title: "Blog | Zero Latency VR Webster - VR Gaming News & Guides",
    description: "Read the latest articles about Zero Latency VR, free-roam virtual reality experiences, and VR games in Webster, Houston.",
    url: "https://zlwebster.com/blog",
    type: "website",
    images: [{
      url: "https://zlwebster.com/OG.jpg",
      width: 1200,
      height: 630,
      alt: "Zero Latency VR Webster Blog",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Zero Latency VR Webster - VR Gaming News & Guides",
    description: "Read the latest articles about Zero Latency VR, free-roam virtual reality experiences, and VR games.",
    images: ["https://zlwebster.com/OG.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://zlwebster.com/" },
    { name: "Blog", url: "https://zlwebster.com/blog" },
  ]);

  // Generate Blog schema.org markup
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://zlwebster.com/blog#blog",
    "name": "Zero Latency VR Webster Blog",
    "description": "Articles about Zero Latency VR, free-roam virtual reality experiences, and VR games in Webster, Houston",
    "url": "https://zlwebster.com/blog",
    "publisher": {
      "@type": "Organization",
      "@id": "https://zlwebster.com/#organization",
      "name": "Zero Latency VR Houston, Webster",
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "@id": `https://zlwebster.com/blog/${post.slug}#blogpost`,
      "headline": post.title,
      "description": post.description,
      "url": `https://zlwebster.com/blog/${post.slug}`,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Organization",
        "name": post.author,
      },
      "image": `https://zlwebster.com${post.featuredImage}`,
    })),
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="blog-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <main id="main-content">
        <div className="bg-[#000F13] text-gray-200 font-montserrat">
          {/* HERO SECTION */}
          <section className="bg-gray-900/50 pt-16 pb-16 text-center border-b-2 border-cyan-500/20">
            <Container>
              <h1 className="text-4xl font-poppins text-white font-black sm:text-5xl md:text-6xl">
                Zero Latency <span className="text-stroke-blue">VR Blog</span>
              </h1>
              <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
                Discover the latest insights, guides, and news about free-roam VR experiences, games, and tips for the best virtual reality adventures in Webster, Houston.
              </p>
            </Container>
          </section>

          {/* BLOG POSTS GRID */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-400">No blog posts available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative flex h-full min-h-[500px] w-full flex-col overflow-hidden rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`}>
                      <span className="sr-only">{post.title}</span>
                    </Link>
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </time>
                        </div>
                        {post.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime} min read</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-2xl font-poppins font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-300 mb-4 flex-1 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center text-cyan-300 font-semibold text-sm">
                        <span>Read More</span>
                        <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

