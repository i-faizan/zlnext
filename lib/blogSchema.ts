// lib/blogSchema.ts - Helper functions for generating blog post schemas

import { BlogPost } from "./blogData";

const siteUrl = "https://zlwebster.com";

/**
 * Generates Article schema (more comprehensive than BlogPosting)
 * Article schema is preferred for blog posts as it provides better SEO
 */
export function generateArticleSchema(post: BlogPost, description?: string) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const lastModified = post.lastModified || post.publishDate;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    "headline": post.title,
    "description": description || post.description,
    "url": url,
    "datePublished": post.publishDate,
    "dateModified": lastModified,
    "author": {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      "name": "Zero Latency VR Houston, Webster",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/ZL-W.png`,
      },
    },
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}${post.featuredImage}`,
      "width": 1200,
      "height": 630,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    "articleSection": "VR Gaming",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    ...(post.readTime && {
      "timeRequired": `PT${post.readTime}M`,
    }),
  };
}

/**
 * Generates BlogPosting schema (alternative, less comprehensive)
 * Kept for backward compatibility
 */
export function generateBlogPostingSchema(post: BlogPost, description?: string) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const lastModified = post.lastModified || post.publishDate;
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogpost`,
    "headline": post.title,
    "description": description || post.description,
    "url": url,
    "datePublished": post.publishDate,
    "dateModified": lastModified,
    "author": {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      "name": "Zero Latency VR Houston, Webster",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/ZL-W.png`,
      },
    },
    "image": `${siteUrl}${post.featuredImage}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

