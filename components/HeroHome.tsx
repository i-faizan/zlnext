import Image from "next/image";
import BookGameButton from "./BookBtn";
import { ArrowRight, CheckCircle, Gift, Headset, Move, PartyPopper, Users } from "lucide-react";
import Birthday from "../public/Birthday.webp";
import Corporate from "../public/corporate.webp";
import Party from "../public/party.webp";
import FAQ from "./FAQ";
import Review from "./Reviews";
import InteractiveVideoPlayer from "./InteractiveVideoPlayer";
import Link from "next/link";
import LinkButton from "./LinkBtn";


export type FaqItem = {
    q: string;
    a: string;
};

export type FaqProps = {
    faqs: FaqItem[];
};

function zombieRandom() {
    const zombieList = [
        "/games/outbreak",
        "/games/undead-arena",
    ];
    return zombieList[Math.floor(Math.random() * zombieList.length)];
}

function sciFiRandom() {
    const sciFiList = [
        "/games/singularity",
        "/games/space-marine-vr",
    ];

    return sciFiList[Math.floor(Math.random() * sciFiList.length)];
}

export default function HeroHome({ faqs }: FaqProps) {
    return (
        <div className="bg-[#000F13] text-gray-200 font-montserrat">
            <section id="hero"
                className="relative h-screen flex items-center justify-center bg-cover bg-center"
            >
                <Image src="/Webster_Houston.webp" alt="4 Players standing in Zero Latency Webster VR arena in Greater Houston" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-black opacity-70"></div> {/* This adds a dark overlay for better text readability */}
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-3xl font-montserrat text-white font-black drop-shadow-lg sm:text-6xl md:text-5xl">
                        Zero Latency VR in Webster, Houston
                    </h1>
                    <h2 className="text-5xl font-poppins font-black text-stroke-blue text-white sm:text-7xl md:text-6xl drop-shadow-md mt-6 mb-12">
                        No Cables. No Limits. Just Pure VR.
                    </h2>
                    <BookGameButton label="BOOK YOUR ADVENTURE" />
                </div>
            </section>

            {/* --- UPDATED VIDEO SECTION --- */}
            <section id="video" className="py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    {/* Use the new component here */}
                    <InteractiveVideoPlayer
                        videoSrc="/zl_home.webm"
                        thumbnailSrc="/far-cry-team.webp"
                        thumbnailAlt="Gameplay footage of Zero Latency VR"
                    />
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <section id="what-is-zero-latency" className="py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-poppins text-white font-black sm:text-4xl">Experience the World&apos;s Best Free-Roam VR</h2>
                            <p className="mt-4 text-lg leading-relaxed">
                                Welcome to Zero Latency Webster, where Houston comes to play in limitless virtual worlds. Step inside with friends, coworkers, or family and experience action-packed VR games that blend cutting-edge technology with real movement. From zombie battles to sci-fi adventures and competitive PvP esports, every session is a rush of adrenaline you can’t find anywhere else.
                            </p>
                            {/* <p className="mt-4 text-md">
                                New to VR? <Link href="/what-to-expect" className="text-cyan-400 font-bold hover:underline">Find out what to expect during your visit!</Link>
                            </p> */}
                            <LinkButton label="View All Games" route="/games" />
                        </div>
                        <div>
                            {/* <div className="aspect-video rounded-2xl bg-gray-900 shadow-xl overflow-hidden">
                                <iframe
                                    className="w-full h-full object-cover"
                                    src="https://www.youtube.com/embed/1_1-uJXPIRE?autoplay=0&mute=1&loop=1" // Replace YOUR_VIDEO_ID
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div> */}
                        </div>
                    </div>
                </section>


                <section id="why-zero-latency" className="py-16 md:py-24 text-center">
                    <h2 className="text-4xl md:text-5xl font-poppins text-white font-black">Why Choose <span className="text-stroke-blue">Zero Latency?</span></h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: <Move aria-hidden="true" size={40} className="mx-auto text-cyan-400" />, title: "Real Movement", text: "Walk, run, dodge, and duck just like you would in real life." },
                            { icon: <Users aria-hidden="true" size={40} className="mx-auto text-cyan-400" />, title: "Bigger Groups", text: "Up to 8 players in the same game at once, perfect for parties." },
                            { icon: <Headset aria-hidden="true" size={40} className="mx-auto text-cyan-400" />, title: "Next-Level Immersion", text: "Cutting-edge headsets, wireless gear, and seamless tracking." },
                        ].map(feature => (
                            <div key={feature.title} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                                {feature.icon}
                                <h3 className="text-2xl font-bold font-poppins mt-4">{feature.title}</h3>
                                <p className="mt-2 text-gray-300">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </section>


                <section id="experiences" className="py-16 md:py-24">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-poppins text-white font-black">Featured <span className="text-stroke-blue">VR Experiences</span></h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">Our experiences are designed for thrill-seekers, casual players, and team challenges alike.</p>
                    </div>

                    {/* Mobile-First Grid for Experience Cards */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            // Added 'href' to each object for navigation
                            { title: "Zombie Survival", desc: "Heart-pounding action as you fight your way through hordes of the undead.", img: "/Outbreak-Digital-Square.webp", href: zombieRandom() },
                            { title: "Sci-Fi Adventures", desc: "Explore futuristic worlds filled with rogue AI, robots, and alien invasions.", img: "/Sci-fi.webp", href: sciFiRandom() },
                            { title: "PvP Esports Battles", desc: "Go head-to-head against friends in team-based shooter challenges.", img: "/pvp.webp", href: "/games/sol-raiders" },
                            { title: "Family-Friendly Worlds", desc: "Stunning, non-combat experiences perfect for first-timers and all ages.", img: "/Family-Adventure.webp", href: "/games/engineerium" },
                        ].map(exp => (
                            // Wrap the card in an anchor tag to make it clickable
                            <Link
                                href={exp.href}
                                key={exp.title}
                                // The `group` class is now on the anchor tag to control hover effects
                                className="block group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black rounded-xl"
                                aria-label={`Learn more about ${exp.title}`}
                            >
                                <div
                                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-800/50"
                                >
                                    {/* Background Image: Enhanced with desktop-only zoom-on-hover effect */}
                                    <Image
                                        src={exp.img}
                                        alt={exp.title}
                                        fill
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
                                    />

                                    {/* Decorative Border: Appears on desktop hover */}
                                    <div className="absolute inset-0 rounded-xl border-2 border-transparent md:group-hover:border-cyan-400 transition-colors duration-300 pointer-events-none"></div>

                                    {/* Gradient Overlay and Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">

                                        <h3 className="text-2xl md:text-3xl font-bold font-poppins text-white tracking-tight">
                                            {exp.title}
                                        </h3>

                                        {/* Description is ALWAYS visible now */}
                                        <p className="mt-1 text-sm md:text-base text-gray-300 leading-tight">
                                            {exp.desc}
                                        </p>

                                        {/* "Learn More" prompt: FIXED to be always visible for accessibility and SEO */}
                                        <div className="flex items-center gap-2 text-cyan-400 font-semibold mt-3">
                                            <span>Learn More</span>
                                            <ArrowRight aria-hidden="true" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <LinkButton label="View All Experiences" route="/experiences" />
                    </div>
                </section>


                <section id="private-events" className="py-16 md:py-24 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative h-96 lg:h-[500px] group">
                            <div className="absolute top-0 left-0 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:scale-105 border-4 border-gray-800 hover:!border-cyan-500 z-10">
                                <Image
                                    src={Birthday}
                                    alt="Birthday Party"
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                            <div className="absolute bottom-0 left-1/4 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 transition-all duration-500 group-hover:rotate-0 group-hover:scale-105 border-4 border-gray-800 hover:!border-cyan-500 z-20">
                                <Image
                                    src={Corporate}
                                    alt="Corporate Team Building Event"
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                            <div className="absolute top-1/4 right-0 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-8 transition-all duration-500 group-hover:rotate-0 group-hover:scale-105 border-4 border-gray-800 hover:!border-cyan-500 z-10">
                                <Image
                                    src={Party}
                                    alt="Bachelor Party"
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start items-center gap-4">
                                <PartyPopper aria-hidden="true" size={40} className="text-cyan-400 hidden sm:block" />
                                <h2 className="text-4xl md:text-5xl font-poppins text-white font-black">
                                    <span className="text-stroke-blue">A Destination</span> for Every Occasion
                                </h2>
                            </div>
                            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                                Zero Latency Webster isn&apos;t just for gamers. It&apos;s one of the most unique and unforgettable venues in Houston for:
                            </p>
                            <div className="mt-8 space-y-4 text-left inline-block">
                                {[
                                    "Birthday parties that teens and adults actually love.",
                                    "Corporate team-building that gets everyone moving.",
                                    "Bachelor & bachelorette parties that break the mold.",
                                    "Weekend fun with friends or family, rain or shine.",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle aria-hidden="true" size={24} className="text-cyan-400 mt-1 flex-shrink-0" />
                                        <span className="text-lg text-gray-200">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10">
                                <LinkButton label="Plan Your Private Event" route="/private-events" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gift Card Section */}
                <section id="gift-vouchers" className="bg-gray-800/50 rounded-2xl my-24 p-8 md:p-16 border border-cyan-500/30 text-center shadow-2xl">
                    <Gift aria-hidden="true" size={60} className="mx-auto text-cyan-400" />
                    <h2 className="text-4xl md:text-5xl font-poppins text-white font-black mt-6"><span className="text-stroke-blue">Gift an Experience</span> They&apos;ll Never Forget</h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg">Looking for a unique gift idea? Our VR gift cards are perfect for anyone who craves a new kind of adventure.</p>
                    <BookGameButton label="Buy Gift Vouchers" link="https://booking.zerolatencyvr.com/en/gift-voucher/webster" />
                </section>

                <Review />

                {/* FAQ Component */}
                <FAQ faqs={faqs} />

                {/* Final CTA Section */}
                <section id="book" className="pb-24 pt-12 text-center">
                    <h2 className="text-4xl font-poppins text-white font-black sm:text-5xl">Ready to Experience the <span className="text-stroke-blue">Ultimate VR Adventure?</span></h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
                        Book your session at Zero Latency Webster today and discover why we&apos;re the top choice for free-roam VR in the Houston area. Gather your crew and step into a world without limits!
                    </p>
                    <BookGameButton label="BOOK A GAME NOW" />
                    <Image
                        src="/vr.webp"
                        alt="Zero Latency VR Goggles"
                        width={400}
                        height={400}
                        className="mx-auto w-[100%] sm:w-[60%] "
                        priority
                    />
                </section>
            </div>
        </div>
    );
}