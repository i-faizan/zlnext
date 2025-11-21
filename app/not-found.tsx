import type { Metadata } from "next";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Zero Latency VR Houston, Webster",
  description: "The page you're looking for doesn't exist. Return to Zero Latency VR Webster homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="bg-[#000F13] text-gray-200 font-montserrat min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-poppins font-black text-cyan-400 mb-4">404</h1>
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
        <div className="mt-12 text-left">
          <p className="text-gray-400 mb-4">Popular pages:</p>
          <ul className="space-y-2">
            <li>
              <Link href="/games" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                → All Games
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                → Experiences
              </Link>
            </li>
            <li>
              <Link href="/what-to-expect" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                → What to Expect
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                → Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

