// src/app/private-events/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PartyPopper, Briefcase, UserCheck, CheckCircle } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
    title: "Private Events and Immersive Parties | Zero Latency VR Houston, Webster",
    description: "Host an unforgettable private party, corporate team building event, or bachelor party at Zero Latency Webster. Our Houston-area venue offers exclusive free-roam VR adventures, a private arena, and on-site dining for the ultimate group experience.",
    alternates: {
        canonical: "https://zlwebster.com/private-events",
    },
    openGraph: {
        title: "Private Events and Immersive Parties | Zero Latency VR Houston, Webster",
        description: "Looking for a unique venue? Book a private VR party, team building event, or bachelor party for an experience your group will never forget.",
        url: "https://zlwebster.com/private-events",
        type: "website",
        images: [
            {
                url: "https://zlwebster.com/OG.jpg",
                width: 1200,
                height: 630,
                alt: "A group of people celebrating at a private VR party at Zero Latency Webster.",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Private Events and Immersive Parties | Zero Latency VR Houston, Webster",
        description: "Looking for a unique venue? Book a private VR party, team building event, or bachelor party for an experience your group will never forget.",
        images: ["https://zlwebster.com/OG.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

// A helper component for feature lists to keep the design consistent
const FeatureListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
        <CheckCircle className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
        <span className="text-gray-300">{children}</span>
    </li>
);

export default function PrivateEventsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Private Events", url: "https://zlwebster.com/private-events" },
    ]);

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <main id="main-content">
            <div className="bg-[#000F13] text-gray-200 font-montserrat overflow-x-hidden">

                {/* HERO SECTION */}
                <section className="relative min-h-[70vh] flex items-center justify-center text-center py-20">
                    <div className="absolute inset-0 z-0">
                         <Image 
                            src="/events-hero-bg.webp" // A wide shot of a group in the VR arena
                            alt="A group of players fully geared up for a VR adventure at Zero Latency Webster."
                            layout="fill"
                            objectFit="cover"
                            className="opacity-20"
                            priority
                         />
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                        <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
                           PRIVATE VR EVENTS <br /> <span className="text-stroke-blue block md:inline">IN WEBSTER, HOUSTON</span>
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                          Elevate your next group outing with an immersive free-roam virtual reality adventure that will be talked about for weeks.
                        </p>
                    </div>
                </section>
                
                {/* INTRO SECTION */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                <Image src="/venue-waiting-area.jpeg" alt="The modern and comfortable waiting area and lounge at Zero Latency Webster." layout="fill" objectFit="cover" priority/>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-4xl font-poppins font-bold text-white">A VENUE THAT <span className="text-stroke-blue">TRULY STANDS OUT</span></h2>
                                <p className="mt-4 text-lg text-gray-300">
                                   Located in Webster on the Houston Bay Area, our venue delivers high-energy, free-roam virtual reality adventures perfect for any group. Unlike typical arcades, our VR is untethered and wireless, so your group can roam a massive arena with no cables to hold you back.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EVENT TYPES SECTIONS */}
                <div className="space-y-4">
                    {/* Private Parties */}
                    <section className="py-20 sm:py-24 bg-gray-900/50">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                 <div className="prose prose-invert max-w-none lg:order-last">
                                    <PartyPopper size={40} className="text-cyan-400 mb-4" />
                                    <h2 className="text-4xl font-poppins font-bold text-white">Private Parties & <span className="text-stroke-blue">Celebrations</span></h2>
                                    <p className="mt-4 text-lg text-gray-300">
                                       Turn any private party into a futuristic thrill ride. Step into another world with friends and family as you battle zombies, explore space, or conquer puzzles together.
                                    </p>
                                    <ul className="mt-6 space-y-4 text-lg">
                                        <FeatureListItem>Perfect for birthdays, graduations, and family gatherings.</FeatureListItem>
                                        <FeatureListItem>Exclusive VR arena access for your group.</FeatureListItem>
                                        <FeatureListItem>On-site café with food and drinks for a complete party experience.</FeatureListItem>
                                    </ul>
                                </div>
                                <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                    <Image src="/venue-birthday-party.webp" alt="A birthday party group celebrating in the café area at Zero Latency Webster." layout="fill" objectFit="cover" priority/>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team Building */}
                    <section className="py-20 sm:py-24">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                 <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                    <Image src="/venue-team-building.webp" alt="A corporate team engaged in a VR team building exercise." layout="fill" objectFit="cover" priority/>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <Briefcase size={40} className="text-cyan-400 mb-4" />
                                    <h2 className="text-4xl font-poppins font-bold text-white">Corporate <span className="text-stroke-blue">Team Building</span></h2>
                                    <p className="mt-4 text-lg text-gray-300">
                                       Ditch the boring trust falls. Our free-roam VR adventures require true teamwork, as coworkers must communicate and strategize in real time to succeed.
                                    </p>
                                    <ul className="mt-6 space-y-4 text-lg">
                                        <FeatureListItem>Enhances communication, collaboration, and problem-solving.</FeatureListItem>
                                        <FeatureListItem>A unique corporate activity that boosts morale and camaraderie.</FeatureListItem>
                                        <FeatureListItem>Flexible scheduling and tournament-style options for large groups.</FeatureListItem>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                     {/* Bachelor Parties */}
                    <section className="py-20 sm:py-24 bg-gray-900/50">
                        <div className="mx-auto max-w-6xl px-4 sm:px-6">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                 <div className="prose prose-invert max-w-none lg:order-last">
                                    <UserCheck size={40} className="text-cyan-400 mb-4" />
                                    <h2 className="text-4xl font-poppins font-bold text-white">Epic Bachelor <span className="text-stroke-blue">Parties</span></h2>
                                    <p className="mt-4 text-lg text-gray-300">
                                       Need an adrenaline-pumping send-off for the groom-to-be? Drop into intense virtual worlds for a bachelor party he’ll never forget.
                                    </p>
                                    <ul className="mt-6 space-y-4 text-lg">
                                        <FeatureListItem>High-adrenaline fun that&apos;s more memorable than just a night at the bar.</FeatureListItem>
                                        <FeatureListItem>Accessible and fun for all skill levels, from seasoned gamers to newcomers.</FeatureListItem>
                                        <FeatureListItem>The perfect kick-off to a night out in Webster or Houston.</FeatureListItem>
                                    </ul>
                                </div>
                                <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700">
                                    <Image src="/venue-bachelor-party.webp" alt="A group of friends laughing and high-fiving during a bachelor party VR session." layout="fill" objectFit="cover" priority/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                
                {/* VENUE SHOWCASE */}
                <section className="py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
                        <h2 className="text-4xl font-poppins text-white font-bold sm:text-5xl">MORE THAN JUST A <span className="text-stroke-blue">GAME ARENA</span></h2>
                        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
                            Our state-of-the-art facility is designed to host your entire event from start to finish.
                        </p>
                        <div className="mt-16 grid md:grid-cols-3 gap-8">
                            <div className="rounded-lg overflow-hidden border border-gray-800">
                                <Image src="/venue-arena.webp" alt="The expansive, open-plan VR arena at Zero Latency Webster." width={800} height={600} className="object-cover" priority/>
                                <div className="p-6 bg-gray-900">
                                    <h3 className="text-xl font-bold font-poppins">Massive Free-Roam Arena</h3>
                                    <p className="mt-2 text-sm text-gray-400">A huge, dedicated space for untethered, wireless VR action for up to 8 players at once.</p>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden border border-gray-800">
                                <Image src="/venue-dining-cafe.webp" alt="The on-site café at Zero Latency, showing pizzas and drinks." width={800} height={600} className="object-cover" priority/>
                                <div className="p-6 bg-gray-900">
                                    <h3 className="text-xl font-bold font-poppins">On-Site Dining & Café</h3>
                                    <p className="mt-2 text-sm text-gray-400">Refuel between games with Fries, burgers, wraps, soft drinks, and more at our convenient café.</p>
                                </div>
                            </div>
                            <div className="rounded-lg overflow-hidden border border-gray-800">
                                <Image src="/venue-lounge-area.jpeg" alt="The comfortable lounge and waiting area with futuristic decor." width={800} height={600} className="object-cover" priority/>
                                <div className="p-6 bg-gray-900">
                                    <h3 className="text-xl font-bold font-poppins">Lounge & Waiting Area</h3>
                                    <p className="mt-2 text-sm text-gray-400">Relax, strategize with your team, or watch others play on our spectator screens while you wait for your turn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* FINAL CTA SECTION */}
                <section className="py-20 bg-gray-900/50">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                        <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">READY TO BOOK YOUR <span className="text-stroke-blue">IMMERSIVE EVENT?</span></h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
                            From private parties to team building, our team is here to handle the details and ensure your group has a blast. Ready to plan an event that blows away the ordinary? Contact us today to get started.
                        </p>
                        {/* This button can be a standard Link styled as a button, leading to the /contact page */}
                        <Link href="/contact-us" className="mt-8 inline-block bg-cyan-600 text-white font-bold py-4 px-8 rounded-md text-lg hover:bg-cyan-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500">
                            CONTACT US FOR EVENTS
                        </Link>
                    </div>
                </section>
            </div>
        </main>
        </>
    );
}