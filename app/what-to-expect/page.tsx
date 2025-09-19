import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Ticket, LogIn, Headset, Gamepad2, Trophy, UserCheck } from "lucide-react";
import BookGameButton from "@/components/BookBtn";
import InteractiveVideoPlayer from "@/components/InteractiveVideoPlayer";

// SEO Metadata for the page
export const metadata: Metadata = {
    title: "What to Expect | Zero Latency VR Houston, Webster",
    description: "New to VR? Learn what to expect at Zero Latency VR Houston, Webster: from check-in, gearing up with VR headsets, the game briefing, to the thrilling free-roam gameplay. No VR experience needed – we guide you every step for a safe and epic adventure.",
    alternates: {
        canonical: "https://zlwebster.com/what-to-expect",
    },
    openGraph: {
        title: "What to Expect | Zero Latency VR Houston, Webster",
        description: "From check-in to the final scoreboard, here's everything you need to know about your free-roam VR adventure at Zero Latency Webster.",
        url: "https://zlwebster.com/what-to-expect",
        type: "article",
        images: [
            {
                url: "https://zlwebster.com/og-what-to-expect.webp",
                width: 1200,
                height: 630,
                alt: "A player wearing a VR headset and holding a controller at Zero Latency Webster.",
            },
        ],
    },
};

const timelineSteps = [
    {
        icon: Ticket,
        step: "01",
        title: "Booking & Preparation",
        description: "Your epic journey begins before you even step through our doors. A little preparation ensures you can dive straight into the action.",
        details: [
            "<strong>Book Your Session:</strong> Secure your spot <a href='https://booking.zerolatencyvr.com/en/book-now/webster' target='_blank' rel='noopener noreferrer' class='text-cyan-400 hover:underline'>online</a> in advance.",
            "<strong>Sign the Waiver:</strong> Save time by <a href='/waiver' class='text-cyan-400 hover:underline'>signing it online</a> before you arrive.",
            "<strong>Dress for Adventure:</strong> Wear comfortable, closed-toe shoes (sneakers are perfect).",
            "<strong>Arrive Early:</strong> Please arrive 15 minutes before your scheduled time.",
            "<strong>Age Requirements:</strong> Players must be 13 years of age or older.",
        ],
    },
    {
        icon: LogIn,
        step: "02",
        title: "Check-In & Briefing",
        description: "When you arrive at our Webster venue, just outside Houston, you’ll be greeted by our friendly staff. We’ll confirm your booking, ensure your waiver is signed, and guide you to our briefing room to get you ready for the mission.",
        image: "/registration.jpg",
        alt: "The modern, welcoming lobby of Zero Latency Webster.",
    },
    {
        icon: Headset,
        step: "03",
        title: "Gearing Up for Immersion",
        description: "This is where the transformation begins. Our Game Masters will equip you with state-of-the-art, completely wireless gear for a true free-roam experience.",
        image: "/gear-up.jpg",
        alt: "A Zero Latency staff member helping a player put on the VR headset and backpack.",
        gear: [
            { name: "VR Headset", text: "Immersive 360° visuals and crystal-clear surround sound." },
            { name: "Controller", text: "A custom weapon for battling zombies or a tool for exploring new worlds." },
        ]
    },
    {
        icon: Gamepad2,
        step: "04",
        title: "The VR Experience",
        description: "Once the visors go down, your world changes. You'll be standing in our warehouse-scale arena but see a vast, interactive virtual landscape. You are free to walk, run, and dodge as if you were actually there, working with your team to complete your objective.",
        image: "/arena-action.jpg",
        alt: "A group of players walking around the large, open VR arena at Zero Latency.",
    },
    {
        icon: Trophy,
        step: "05",
        title: "After the Game & Memories",
        description: "Each heart-pounding game lasts around 15-45 minutes. After you emerge victorious, check your scores on our leaderboard and snap a photo with your team to remember the adventure. Don't forget to share your experience on social media and tag us!",
        image: "/post-game-group.webp",
        alt: "A smiling group of friends posing for a photo after their VR experience.",
    },
];

export default function WhatToExpectPage() {
    return (
        <main id="main-content">
            <div className="bg-[#000F13] text-gray-200 font-montserrat">
                {/* HERO SECTION */}
                <section className="relative h-[60vh] flex items-center justify-center text-center">
                    <Image
                        src="/background.webp"
                        alt="A stunning visual from a Zero Latency VR game."
                        layout="fill"
                        objectFit="cover"
                        className="opacity-10"
                        priority
                    />
                    <div className="relative z-10 p-4">
                        <h1 className="text-4xl font-poppins text-white font-black sm:text-5xl md:text-6xl">
                            Your Mission <span className="text-stroke-blue">Briefing</span>
                        </h1>
                        <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300 leading-relaxed">
                            From arrival to the final scoreboard, here’s a step-by-step guide to your unforgettable free-roam VR adventure.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <InteractiveVideoPlayer
                            videoSrc="/expect.m4v"
                            thumbnailSrc="/what-to-expect-thumbnail.webp"
                            thumbnailAlt="What to expect from Zero Latency VR"
                        />
                    </div>
                </section>

                {/* TIMELINE SECTION */}
                <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
                    <div className="relative">
                        {/* The vertical line */}
                        <div className="absolute left-8 top-8 h-full w-0.5 bg-gray-700/50" aria-hidden="true"></div>

                        {timelineSteps.map((item, index) => (
                            <div key={item.step} className="relative pl-20 pb-16">
                                {/* The Icon and Step Number */}
                                <div className="absolute left-0 top-0 flex items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 border border-cyan-500/30 shadow-lg">
                                        <item.icon className="w-8 h-8 text-cyan-400" />
                                    </div>
                                </div>

                                <div className={`grid gap-8 items-center ${item.image ? 'md:grid-cols-2' : ''} ${index % 2 === 1 && item.image ? 'md:grid-flow-row-dense md:[&>*:last-child]:col-start-1' : ''}`}>
                                    <div className="prose prose-invert max-w-none">
                                        <h3 className="text-3xl font-poppins font-bold text-white">
                                            <span className="text-stroke-blue">{item.step}</span> {item.title}
                                        </h3>
                                        <p className="text-gray-300">{item.description}</p>

                                        {item.details && (
                                            <ul className="mt-4 space-y-2">
                                                {item.details.map(detail => (
                                                    <li key={detail} className="flex items-start gap-3">
                                                        <UserCheck className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                                                        <span dangerouslySetInnerHTML={{ __html: detail }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {item.gear && (
                                            <div className="mt-6 grid sm:grid-cols-1 gap-4">
                                                {item.gear.map(g => (
                                                    <div key={g.name} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                                        <h4 className="font-bold text-white">{g.name}</h4>
                                                        <p className="text-sm text-gray-400">{g.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {item.image && (
                                        <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300 transform hover:scale-105">
                                            <Image
                                                src={item.image}
                                                alt={item.alt}
                                                width={800}
                                                height={450}
                                                className="w-full h-full object-cover"
                                                priority
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TIPS & FAQ SECTION */}
                <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-24">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                            <h3 className="text-3xl font-poppins font-bold text-white mb-4">Tips for a Great Experience</h3>
                            <div className="space-y-4">
                                {[
                                    "Wear comfortable, closed-toe shoes.",
                                    "Listen carefully to your Game Master.",
                                    "Move naturally and keep your chin up.",
                                    "Communicate with your team!",
                                ].map((tip) => (
                                    <div key={tip} className="flex items-start gap-3">
                                        <CheckCircle size={24} className="text-cyan-400 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-200">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-poppins font-bold text-white mb-4 text-center">Frequently Asked Questions</h3>
                            {[
                                { q: "Do I need prior VR experience?", a: "Not at all! Our games are designed for everyone, and our Game Masters will teach you everything you need to know." },
                                { q: "Is it scary or intense?", a: "It can be! We offer high-intensity thrillers, but also have amazing, family-friendly adventures with no combat." },
                                { q: "What is the age limit?", a: "Players must be 13 years or older to participate." },
                            ].map(faq => (
                                <div key={faq.q} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-cyan-400">{faq.q}</h4>
                                    <p className="text-gray-300 mt-1">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FINAL CTA SECTION */}
                <section className="pb-24 pt-12 text-center">
                    <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">Ready to <span className="text-stroke-blue">Enter the Game?</span></h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
                        Your mission awaits. Gather your crew, choose your experience, and step into a world without limits. Book your session at Zero Latency Webster today!
                    </p>
                    <BookGameButton label="BOOK A GAME NOW" source="what-to-expect-page" />
                </section>
            </div>
        </main>
    );
}