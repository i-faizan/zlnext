// src/app/contact/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
// import Link from "next/link";
import { MapPin, Clock, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
    title: "Contact Us - Location, Hours & Booking Info | Zero Latency VR Houston, Webster",
    description: "Find Zero Latency VR location, hours, and contact info in Webster, Houston. Questions about events, parties, or bookings? Get in touch today.",
    authors: [{ name: "Zero Latency VR Houston, Webster" }],
    creator: "Zero Latency VR Houston, Webster",
    publisher: "Zero Latency VR Houston, Webster",
    alternates: {
        canonical: "https://zlwebster.com/contact-us",
    },
    openGraph: {
        title: "Contact Us - Location, Hours & Booking Info | Zero Latency VR Houston, Webster",
        description: "Get directions, hours, and contact info for the ultimate free-roam VR experience in Houston.",
        url: "https://zlwebster.com/contact-us",
        type: "website",
        images: [{
            url: "https://zlwebster.com/OG.jpg",
            width: 1200,
            height: 630,
            alt: "Contact Zero Latency VR Houston, Webster",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us - Location, Hours & Booking Info | Zero Latency VR Houston, Webster",
        description: "Get directions, hours, and contact info for the ultimate free-roam VR experience in Houston.",
        images: ["https://zlwebster.com/OG.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Contact Us", url: "https://zlwebster.com/contact-us" },
    ]);

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "EntertainmentBusiness"],
        "@id": "https://zlwebster.com/#localbusiness",
        "name": "Zero Latency VR Houston, Webster",
        "image": "https://zlwebster.com/OG.jpg",
        "url": "https://zlwebster.com/",
        "telephone": "+14694049149",
        "email": "zero@zlwebster.com",
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 29.5377,
            "longitude": -95.1183
        },
        "hasMap": "https://maps.google.com/?q=Zero+Latency+Webster",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "BayWay Village Shopping Center, 20801 Gulf Fwy suite 5",
            "addressLocality": "Webster",
            "addressRegion": "TX",
            "postalCode": "77598",
            "addressCountry": "US"
        },
        "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday"], "opens": "16:00", "closes": "21:30" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Wednesday", "Thursday"], "opens": "14:00", "closes": "21:30" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Saturday", "Sunday"], "opens": "11:00", "closes": "23:00" }
        ],
        "sameAs": [
            "https://www.facebook.com/zerolatencywebstr",
            "https://www.instagram.com/zerolatencywebstr",
            "https://www.tiktok.com/@zerolatencywebstr",
            "https://www.youtube.com/@ZeroLatencyWebster",
            "https://twitter.com/zlwebster"
        ]
    };

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="localbusiness-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
            <main id="main-content">
            <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">

                {/* HERO SECTION */}
                <section className="relative min-h-[60vh] flex items-center justify-center text-center py-20">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/contact-hero-bg.webp" // An image of the venue&apos;s interior/lobby
                            alt="The futuristic lobby of the Zero Latency Houston VR arena."
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20"
                            priority
                        />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                        <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
                            CONNECT WITH <span className="text-stroke-blue">US</span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                            Have a question, need to book an event, or just want to say hello? We&apos;re here to help.
                        </p>
                    </div>
                </section>

                {/* CONTACT INFO BLOCK */}
                <section className="py-20 sm:py-24 bg-gray-900/50">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid place-items-center md:grid-cols-3 gap-8">
                            {/* Location */}
                            <div className="text-center p-8 bg-black/30 rounded-lg border border-gray-800">
                                <MapPin size={40} className="mx-auto text-cyan-400 mb-4" />
                                <h2 className="text-2xl font-poppins font-bold text-white">Our Location</h2>
                                <p className="mt-2 text-gray-300">20801 Gulf Fwy suite 5,<br /> Webster, TX 77598, United States</p>
                            </div>
                            {/* Hours */}
                            <div className="text-center p-8 bg-black/30 rounded-lg border border-gray-800">
                                <Clock size={40} className="mx-auto text-cyan-400 mb-4" />
                                <h2 className="text-2xl font-poppins font-bold text-white">Operating Hours</h2>
                                <ul className="mt-2 text-gray-300">
                                    <li>Mon - Tue: 4:00 PM - 9:30 PM</li>
                                    <li>Wed - Thu: 2:00 PM - 9:30 PM</li>
                                    <li>Fri - Sun: 11:00 AM - 11:00 PM</li>
                                    <li className="font-poppins mt-4">Special timings for holidays and events</li>
                                </ul>
                            </div>
                            {/* Contact Details */}
                            <div className="text-center p-8 bg-black/30 rounded-lg border border-gray-800">
                                <Phone size={40} className="mx-auto text-cyan-400 mb-4" />
                                <h2 className="text-2xl font-poppins font-bold text-white">Get in Touch</h2>
                                <p className="mt-2 text-gray-300">
                                    <a href="tel:281-555-1234" className="hover:text-cyan-400">+1 (469) 404-9149</a>
                                </p>
                                <p className="mt-1 text-gray-300">
                                    <a href="mailto:zero@zlwebster.com" className="hover:text-cyan-400">zero@zlwebster.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FORM & MAP SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Contact Form */}
                            {/* <div>
                                <h2 className="text-4xl font-poppins text-white font-bold mb-6">Send Us a Message</h2>
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                                        <input type="text" id="name" name="name" required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                                        <input type="email" id="email" name="email" required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-cyan-500 focus:border-cyan-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="inquiry" className="block text-sm font-medium text-gray-300">Inquiry Type</label>
                                        <select id="inquiry" name="inquiry" className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-cyan-500 focus:border-cyan-500">
                                            <option>General Question</option>
                                            <option>Private Event / Party Inquiry</option>
                                            <option>Booking Issue</option>
                                            <option>Feedback & Suggestions</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                                        <textarea id="message" name="message" rows={5} required className="mt-1 block w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-md hover:bg-cyan-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500">
                                        Submit Message
                                    </button>
                                </form>
                            </div> */}
                            {/* Map */}
                            <div className="h-full">
                                <h2 className="text-4xl font-poppins text-white font-bold mb-6">Find Us Here</h2>
                                <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden border-2 border-gray-800">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.625119694656!2d-95.13089362444843!3d29.52728444288827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409dfaea747393%3A0xe33758e08406e3a7!2sZero%20Latency%20Webster!5e0!3m2!1sen!2smy!4v1757651771131!5m2!1sen!2smy"
                                        width="100%"
                                        height="500"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SOCIAL MEDIA SECTION */}
                <section className="py-20 sm:py-24 bg-gray-900/50">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                        <h2 className="text-3xl font-poppins text-white font-bold">Follow the Adventure</h2>
                        <p className="mt-4 text-gray-400 max-w-xl mx-auto">Stay up to date with our latest games, special events, and promotions by following us on social media.</p>
                        <div className="mt-8 flex justify-center space-x-6">
                            <a href="https://facebook.com/zerolatencywebstr" className="text-gray-400 hover:text-cyan-400 transition-colors" aria-label="Facebook">
                                <Facebook size={28} />
                            </a>
                            <a href="https://instagram.com/zerolatencywebstr" className="text-gray-400 hover:text-cyan-400 transition-colors" aria-label="Instagram">
                                <Instagram size={28} />
                            </a>
                            <a href="https://www.youtube.com/@ZeroLatencyWebster" className="text-gray-400 hover:text-cyan-400 transition-colors" aria-label="YouTube">
                                <Youtube size={28} />
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </main>
        </>
    );
}