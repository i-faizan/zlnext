import type { Metadata } from "next";
import Image from "next/image";
import { Star, Quote, ArrowRight } from "lucide-react";
import Script from "next/script";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
    title: "Customer Reviews & Testimonials | Zero Latency VR Houston, Webster",
    description: "Read 229+ 5-star reviews from customers who experienced free-roam VR at Zero Latency Webster. See what players say about our games, staff, and immersive VR adventures.",
    authors: [{ name: "Zero Latency VR Houston, Webster" }],
    creator: "Zero Latency VR Houston, Webster",
    publisher: "Zero Latency VR Houston, Webster",
    alternates: {
        canonical: "https://zlwebster.com/reviews",
    },
    openGraph: {
        title: "Customer Reviews & Testimonials | Zero Latency VR Houston, Webster",
        description: "Read 229+ 5-star reviews from customers who experienced free-roam VR at Zero Latency Webster.",
        url: "https://zlwebster.com/reviews",
        type: "website",
        images: [{
            url: "https://zlwebster.com/OG.jpg",
            width: 1200,
            height: 630,
            alt: "Zero Latency VR Houston, Webster - Customer Reviews",
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Customer Reviews & Testimonials | Zero Latency VR Houston, Webster",
        description: "Read 229+ 5-star reviews from customers who experienced free-roam VR at Zero Latency Webster.",
        images: ["https://zlwebster.com/OG.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

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
        quote: "A Must-Try VR Experience! Zero Latency in Webster, TX delivers an exceptional virtual reality experience that exceeded all expectations. From the moment we walked in, the staff was friendly, professional, and clearly passionate about providing an immersive and seamless experience. The equipment was top-notch, the gameplay was engaging, and the free-roam format truly made us feel like we were part of another world. Whether you're a seasoned gamer or just looking for something new and exciting to do with friends or family, this is an experience you don't want to miss. It's interactive, thrilling, and impressively immersive. I highly recommend giving Zero Latency a try, you won't be disappointed!",
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
        image: '/review_4.webp'
    },
    {
        type: 'text',
        stars: 5,
        quote: "I recently went and it was my first time experiencing a VR game at this magnitude! I 1 billion percent recommend going. The service was incredible everyone was super nice and just welcoming. Their hospitality just incredible. The game was so fun we tried out break (zombies) and the experience of it all was the best. 5 stars is not enough but YOU MUST TRY IT OUT. Zero latency webster thank you so much we hope to be back SOON. By the way they also have space marines!",
        author: 'Rudy',
        source: 'Google Review',
        avatarInitial: 'R'
    },
    {
        type: 'text',
        stars: 5,
        quote: "This was an amazing experience! Everyone was very nice and helpful. We had a lot of fun ! We will definitely be coming back .",
        author: 'Lyda Deleon',
        source: 'Google Review',
        avatarInitial: 'L'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Absolute blast! my family loved our first time doing Outbreak. The staff treated us great and answered any questions. I have had some motion issues doing other VR games but this one didnt cause me any problems. Edit: no motion issues immediately, i did have a minor headache after i got to my car. It lasted a few hours but eventually went away.",
        author: 'Jon Carter',
        source: 'Google Review',
        avatarInitial: 'J'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Had a great time here! Couldn't believe how much we experienced in 30 minutes and in one room, will definitely come back to try another game too!",
        author: 'Michelle Benjamin',
        source: 'Google Review',
        avatarInitial: 'M'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Absolutely amazing!!!! Such a fun time. I didn't get dizzy, but I did get scared! It was such a realistic experience and the food was amazing!!! Definitely coming back!",
        author: 'sarah delgreco',
        source: 'Google Review',
        avatarInitial: 'S'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Fantastic, FUN place with an excellent staff that is enthusiastic about what they're doing, with a huge shout-out to Mike, you really made my friend's day! Sol Raiders (pardon if I got the name wrong) was one of the finest VR experiences ... More",
        author: 'M S',
        source: 'Google Review',
        avatarInitial: 'M'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Awesome experience! Mike & Mike did an amazing job getting our group in at a different time slot and helping talk us through the games. Highly recommend!",
        author: 'Joshua Chapman',
        source: 'Google Review',
        avatarInitial: 'J'
    },
    {
        type: 'text',
        stars: 5,
        quote: "I had a blast with a group of 4. The game was intense & worth the money. It also comes with a little crash course if you are new to VR gaming. The staff were nice and welcoming as well. Definitely recommend!",
        author: 'Alyssa Payne',
        source: 'Google Review',
        avatarInitial: 'A'
    },
    {
        type: 'text',
        stars: 5,
        quote: "That was by far the best VR Experience we have had. Very large room you could move around in very realistic. We are definitely coming back for some birthday parties. Also, excellent customer service.",
        author: 'Daniel Smith',
        source: 'Google Review',
        avatarInitial: 'D'
    },
    {
        type: 'text',
        stars: 5,
        quote: "My family and I went here today and it was amazing. It's a very welcoming environment. Everything was broken down on a video and by a person so that we understood what we were doing before starting the simulation. It was explained in a way that even a small child could understand which I appreciated. I would definitely recommend this place to others. It was also very clean.",
        author: 'Brandy Gonzalez',
        source: 'Google Review',
        avatarInitial: 'B'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Y'all when I tell you we had SO MUCH FUN! It's really immersive and everything from movements, gun control, and safety were great. You're put in this WIDE room with the whole headset that can be intricately Adjusted to your preference. It is comfortable with glasses and the headset isn't heavy at all. We played the outbreak one and even the surroundings were so cool and scary. I will say, I wish there was some vibration to make it even better but for $40 per person for 30 minutes it wasn't bad! Definitely come here if you're tired of places like main event. 🙏🏼🙏🏼🙏🏼",
        author: 'Alexia Brown',
        source: 'Google Review',
        avatarInitial: 'A'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Oh what an experience that was. It's their fourth day open and they're still setting up which I didn't really mind. The GM was awesome and the staff was a friendly bunch. The game they had was really immersive and hella fun. They have games holding up to 8 players. Will definitely bring a bigger team next time.",
        author: 'Cbbao',
        source: 'Google Review',
        avatarInitial: 'C'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Awesome place! Virtual reality with a big step up. Cool mix of virtual reality, Lazer tag and team building. I went for a company team building and it was really fun (8 people per game play all together)",
        author: 'Nathan Dunn',
        source: 'Google Review',
        avatarInitial: 'N'
    },
    {
        type: 'text',
        stars: 5,
        quote: "We have been here twice since they opened and it's SO MUCH FUN. The games are so immersive. Highly recommended!",
        author: 'Marby McKinney',
        source: 'Google Review',
        avatarInitial: 'M'
    },
    {
        type: 'text',
        stars: 5,
        quote: "All I can say is WOW, this was an amazing experience, definitely can not wait to try the other games!!! This was the most fun I've had in a good while. I would recommend this to everyone!",
        author: 'Ruben Longoria',
        source: 'Google Review',
        avatarInitial: 'R'
    },
    {
        type: 'text',
        stars: 5,
        quote: "This place is really nice and super fun!!! Definitely recommend! Had a great time and we will come back soon!",
        author: 'Kristin',
        source: 'Google Review',
        avatarInitial: 'K'
    },
    {
        type: 'text',
        stars: 5,
        quote: "First time here and the staff were very friendly and helpful. They recommended that I play outbreak and I had loads of fun playing. Though 30 mins may not seem a long time while playing it felt like hours. They even walk you through on how to view and share your gameplay. I definitely recommend.",
        author: 'Jeremy Blanchard',
        source: 'Google Review',
        avatarInitial: 'J'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Absolutely incredible experience at Zero Latency Webster! We played the space marine game — fully immersive, heart-pounding action from start to finish. Perfect mix of teamwork, adrenaline, and cutting-edge VR. Went with my cardiology fellows and we had an absolute blast. Highly recommend for groups, team-building, or just epic fun! On top of that, the owners and game master (Micheal and Sydney) were absolutely wonderful. Super friendly, patient, and made sure we had the best experience possible from start to finish. Their attention to detail, hospitality, and enthusiasm made the whole event even more memorable. Can't wait to come back",
        author: 'Waqas Qureshi',
        source: 'Google Review',
        avatarInitial: 'W'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Did an impromptu drop in to Zero Latency Webster not realizing today was their first day open. The staff were all super friendly and informative in helping us choose the best options for age range and team goals. Highly recommend and we will definitely be back. Long overdue for something like this in the area",
        author: 'RoxyandKeith Stephenson',
        source: 'Google Review',
        avatarInitial: 'R'
    },
    {
        type: 'text',
        stars: 5,
        quote: "We had a really good experience — the whole crew was super friendly, professional, and made everything go smoothly. 10/10 recommend",
        author: 'Tonya',
        source: 'Google Review',
        avatarInitial: 'T'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Incredible VR Adventure for Kids at Zero Latency Webster! We recently visited Zero Latency Webster, and it was an absolutely amazing experience! My daughter went in with her two friends, and they had the best time ... More",
        author: 'Rose Princess',
        source: 'Google Review',
        avatarInitial: 'R'
    },
    {
        type: 'text',
        stars: 5,
        quote: "so much fun! the experience was great all around. staff was super nice and helpful. we had a decent sized group and they were more than accommodating and went above anything we expected to make sure we all had a great time.",
        author: 'O.T. Stroope',
        source: 'Google Review',
        avatarInitial: 'O'
    },
    {
        type: 'text',
        stars: 5,
        quote: "I had an amazing time at the Webster location on a second date with this incredible man. The staff was incredibly friendly, and it's been a long time since I've had so much fun. This felt so real!!! I can't wait to take my date back and ... More",
        author: 'Kameelah Thomas',
        source: 'Google Review',
        avatarInitial: 'K'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Absolutely AMAZING experience!!! Feels real and can definitely get your heart rate going! Also, you get to rewatch afterwards because they share a YouTube link of your session! 10/10 experience, completely recommend!!! Wonderful staff, very clean, super fun!",
        author: 'Shelby D. Mayberry',
        source: 'Google Review',
        avatarInitial: 'S'
    },
    {
        type: 'text',
        stars: 5,
        quote: "So cool!! It was scary at first b/c the aliens did not believe in personal space 😂 But after I got used to it, it was super fun with all the different ammo types, running around, strategizing our attack, and defeating the different enemies. We will be back!",
        author: 'N R',
        source: 'Google Review',
        avatarInitial: 'N'
    },
    {
        type: 'text',
        stars: 5,
        quote: "This place was super fun!! We haven't been out in a while so we choice this are our date spot..and it did not disappoint!! Please go here for date day we are in our 30's teamed up with teenagers. Still amped up. Was awesome",
        author: 'Crissy Jordan',
        source: 'Google Review',
        avatarInitial: 'C'
    },
    {
        type: 'text',
        stars: 5,
        quote: "It really enjoyed it. It is my first VR experience, i would do it again with my friends.",
        author: 'Xinfan Liu',
        source: 'Google Review',
        avatarInitial: 'X'
    },
    {
        type: 'text',
        stars: 5,
        quote: "This was my first time trying VR and it was out of this world!! I truly enjoyed it and playing the different themes. I highly recommend this place for family fun.",
        author: 'Heav Casey',
        source: 'Google Review',
        avatarInitial: 'H'
    },
    {
        type: 'text',
        stars: 5,
        quote: "What a super fun experience! Customer service was stellar from start to finish. Couldn't have asked for a better time. So much fun! We will definitely be back and we're telling all of our friends!",
        author: 'Christina Weaver',
        source: 'Google Review',
        avatarInitial: 'C'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Absolutely enjoyed the attentiveness we received from all the staff. We had a small group of teen boys and they were so thrilled to have enjoyed this cool experience. All of the food was very tasty. The establishment was modern and very clean. Will be coming back soon.",
        author: 'nereyda garcia',
        source: 'Google Review',
        avatarInitial: 'n'
    },
    {
        type: 'text',
        stars: 5,
        quote: "They had a good range of games going from PvP to Pve and both were amazing, if you ever have free time and are in Houston Texas, check it out.",
        author: 'Joseph Idowu',
        source: 'Google Review',
        avatarInitial: 'J'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Absolutely mind-blowing experience! I had never tried virtual reality before, and Zero Latency completely blew me away. The gear is super high-tech, and the arena is huge — it really feels like you're walking through another world. The staff was friendly and explained everything clearly. Highly recommend this to anyone looking for something thrilling and different!",
        author: 'Shahzad Majeed',
        source: 'Google Review',
        avatarInitial: 'S'
    },
    {
        type: 'text',
        stars: 5,
        quote: "My family and I really enjoyed ourselves!!! You actually felt like you were in the game! If I could I would give it a ten out of ten!! The staff was very welcoming and friendly!!! We will definitely be back!",
        author: 'Shikita',
        source: 'Google Review',
        avatarInitial: 'S'
    },
    {
        type: 'text',
        stars: 5,
        quote: "Amazing experience first ever in my life. The best part was that it was close to my house. They have many options of games. Got a couple of jump scares. Definitely recommend it to everyone.",
        author: 'Hamiz S',
        source: 'Google Review',
        avatarInitial: 'H'
    }
];

const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://zlwebster.com/#localbusiness",
    "name": "Zero Latency VR Houston, Webster",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "229",
        "bestRating": "5",
        "worstRating": "1"
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "BayWay Village Shopping Center, 20801 Gulf Fwy suite 5",
        "addressLocality": "Webster",
        "addressRegion": "TX",
        "postalCode": "77598",
        "addressCountry": "US"
    },
    "priceRange": "$$",
    "telephone": "+14694049149",
    "image": "https://zlwebster.com/OG.jpg",
    "review": testimonials.map((testimonial) => ({
        "@type": "Review",
        "author": {
            "@type": "Person",
            "name": testimonial.author
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": testimonial.stars.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "reviewBody": testimonial.quote,
        "publisher": {
            "@type": "Organization",
            "name": testimonial.source || "Google"
        }
    }))
};

export default function ReviewsPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://zlwebster.com/" },
        { name: "Reviews", url: "https://zlwebster.com/reviews" },
    ]);

    return (
        <>
            <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Script id="review-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
            <main id="main-content">
                <div className="bg-[#000F13] text-gray-200 font-montserrat">
                    {/* Hero Section */}
                    <section className="relative min-h-[50vh] flex items-center justify-center text-center py-20">
                        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                            <h1 className="text-5xl font-poppins text-white font-black sm:text-6xl md:text-7xl mt-4 leading-tight">
                                WHAT DO CUSTOMERS <span className="text-stroke-blue">SAY?</span>
                            </h1>
                            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                                Don&apos;t just take our word for it. See what players are saying about their free-roam VR adventures at Zero Latency Webster.
                            </p>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="py-12 bg-gray-900/30">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-6xl font-poppins font-black text-white">5.0</div>
                                        <div className="flex justify-center text-yellow-400 mt-2">
                                            {Array(5).fill(0).map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                                        </div>
                                    </div>
                                    <div className="h-20 w-px bg-gray-700 hidden md:block"></div>
                                    <div className="text-center md:text-left">
                                        <div className="text-4xl font-poppins font-bold text-white">271</div>
                                        <div className="text-gray-400 mt-1">Total Reviews</div>
                                    </div>
                                </div>
                                <a 
                                    href="https://maps.app.goo.gl/o2nYH1U37WsHWHiw6" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
                                >
                                    <Image src="/Google.svg" alt="Google" width={100} height={20} className="h-5 w-auto" />
                                    <span>Read All Reviews</span>
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Reviews Grid */}
                    <section className="py-16 md:py-24">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {testimonials.map((testimonial, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gradient-to-br from-gray-800/60 to-gray-900/50 rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col"
                                    >
                                        {testimonial.type === 'image' && testimonial.image && (
                                            <div className="aspect-[16/9] w-full relative overflow-hidden rounded-t-2xl">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={`Review from ${testimonial.author}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6 flex flex-col flex-grow relative">
                                            <Quote size={48} className="absolute top-2 right-2 text-gray-700/20" />
                                            <div className="flex text-yellow-400 mb-3 z-10">
                                                {Array(testimonial.stars).fill(0).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                            </div>
                                            <p className="text-gray-100 mb-4 z-10 flex-grow line-clamp-6">
                                                &quot;{testimonial.quote}&quot;
                                            </p>
                                            <div className="flex items-center gap-3 z-10 mt-auto pt-4 border-t border-gray-700">
                                                <div className="w-10 h-10 bg-cyan-900 rounded-full flex items-center justify-center font-bold text-cyan-200 flex-shrink-0">
                                                    {testimonial.avatarInitial}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-white truncate">{testimonial.author}</p>
                                                    <p className="text-sm text-gray-400">{testimonial.source}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

