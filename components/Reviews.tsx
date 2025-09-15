'use client';

import Image from 'next/image'
import { ArrowRight, Quote, Star } from 'lucide-react';

// Inside your HeroHome component function
const testimonials = [
    {
        type: 'image',
        stars: 5,
        quote: "Absolutely loved this place will definitely return. Is a great place to go with friends and family and just have a good time. We got to experience two games, which definitely felt so real. The staff as well are friendly from the moment you walk in.",
        author: 'Anyzza Trevino',
        source: 'Google Review',
        avatarInitial: 'AT',
        image: '/review_3.webp'
    },
    {
        type: 'image',
        stars: 5,
        quote: "A Must-Try VR Experience! Zero Latency in Webster, TX delivers an exceptional virtual reality experience that exceeded all expectations. From the moment we walked in, the staff was friendly, professional, and clearly passionate about providing an immersive and seamless experience. The equipment was top-notch, the gameplay was engaging, and the free-roam format truly made us feel like we were part of another world. Whether you’re a seasoned gamer or just looking for something new and exciting to do with friends or family, this is an experience you don’t want to miss. It’s interactive, thrilling, and impressively immersive. I highly recommend giving Zero Latency a try, you won’t be disappointed!",
        author: 'Emila Potocka',
        source: 'Google Review',
        avatarInitial: 'EP',
        image: '/review_1.webp'
    },
    {
        type: 'image',
        stars: 5,
        quote: "Highly advanced technology! Micheal and Sidney were with my family and I every step of the way to ensure we had a phenomenal experience. This place is a gem!",
        author: 'Lance Koon',
        source: 'Google Review',
        avatarInitial: 'LK',
        image: '/review_4.webp' // Placeholder path
    },
    {
        type: 'text',
        stars: 5,
        quote: "I recently went and it was my first time experiencing a VR game at this magnitude! I 1 billion percent recommend going. The service was incredible everyone was super nice and just welcoming. Their hospitality just incredible. The game was so fun we tried out break (zombies) and the experience of it all was the best. 5 stars is not enough but YOU MUST TRY IT OUT. Zero latency webster thank you so much we hope to be back SOON. By the way they also have space marines!",
        author: 'Rudy',
        source: 'Google Review',
        avatarInitial: 'R'
    }
];



export default function Review() {

    return (
        <section id="reviews"
            className="relative py-16 md:py-24 text-gray-200"
            // This style creates the subtle radial gradient background for more depth
            style={{ background: 'radial-gradient(ellipse at center, rgba(3, 44, 56, 0.5) 0%, #000F13 70%)' }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12 md:mb-16">
                    <Star size={40} className="text-cyan-400 fill-cyan-400 flex-shrink-0" />
                    <h2 className="text-4xl md:text-5xl font-poppins text-white font-black">
                        WHAT DO CUSTOMERS SAY <span className="text-stroke-blue">ABOUT US?</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column for Summary Cards */}
                    <div className="col-span-1 lg:col-span-1 space-y-6">
                        {/* Google Card */}
                        <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/50 p-6 rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/10">
                            <div className="flex items-center justify-between text-sm mb-4">
                                <span className="bg-cyan-600/30 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold">
                                    TOP EXPERIENCE
                                </span>
                                <a href="#" className="flex items-center text-cyan-400 hover:underline">
                                    Read reviews <ArrowRight size={16} className="ml-1" />
                                </a>
                            </div>
                            <div className="space-y-2 mb-6">
                                {[5, 4, 3, 2, 1].map(star => (
                                    <div key={star} className="flex items-center gap-2 text-xs">
                                        <span className="w-4 text-gray-400">{star}</span>
                                        <div className="flex-grow bg-gray-700 h-2 rounded-full">
                                            <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: star === 5 ? '96%' : star === 4 ? '4%' : '0%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-2xl font-bold text-white">5.0</div>
                                <div className="flex text-yellow-400">{Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                                <span className="text-gray-400 text-sm">69 reviews</span>
                            </div>
                            <Image src="/Google.svg" alt="TripAdvisor" width={100} height={20} className="ml-auto mt-4" priority/>
                        </div>

                    </div>

                    {/* Column for Testimonial Carousel */}
                    <div className="relative col-span-1 lg:col-span-2">
                        <div className="testimonial-carousel flex overflow-x-auto snap-x snap-mandatory scroll-smooth w-full space-x-6 pb-4 hide-scrollbar">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[48%] snap-center">
                                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/50 rounded-2xl border border-gray-700 h-full flex flex-col hover:border-cyan-400/50 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/10">
                                        {testimonial.type === 'image' && (
                                            <div className="aspect-[16/9] w-full">
                                                <Image
                                                    src={testimonial.image!} // The '!' asserts that image is not null
                                                    alt={`Review image from ${testimonial.author}`}
                                                    width={500}
                                                    height={281}
                                                    className="rounded-t-2xl object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6 relative flex flex-col flex-grow">
                                            <Quote size={64} className="absolute -top-4 -left-2 text-gray-700/30" />
                                            <div className="flex text-yellow-400 mb-4 z-10">
                                                {Array(testimonial.stars).fill(0).map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                                            </div>
                                            {/* MODIFIED LINE BELOW */}
                                            <p className={`text-lg italic text-gray-100 mb-6 z-10 overflow-y-auto pr-2 ${testimonial.type === 'text' ? 'h-80' : 'h-40'}`}>
                                                &quot;{testimonial.quote}&quot;
                                            </p>
                                            <div className="flex items-center gap-3 z-10 mt-auto">
                                                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center font-bold text-cyan-200">
                                                    {testimonial.avatarInitial}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{testimonial.author}</p>
                                                    <p className="text-sm text-gray-400">{testimonial.source}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Optional: Navigation arrows can be added here if JS logic is implemented */}
                    </div>
                </div>
            </div>
        </section>
    )
}