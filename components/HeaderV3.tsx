'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { BOOKING_URL } from '@/lib/navData';

// Your navigation data
const nav = [
  { label: 'Experiences', href: '/experiences' },
  { label: 'What to Expect', href: '/what-to-expect' },
  {
    label: 'Games',
    children: [
      { label: 'Overview', href: '/games' },
      { label: 'Space Marine VR', href: '/games/space-marine' },
      { label: 'Outbreak', href: '/games/outbreak' },
      { label: 'Far Cry VR', href: '/games/far-cry' },
      { label: 'Undead Arena', href: '/games/undead-arena' },
      { label: 'Singularity', href: '/games/singularity' },
      { label: 'Sol Raiders', href: '/games/sol-raiders' },  
      { label: 'Engineerium', href: '/games/engineerium' },
      { label: 'Haunted', href: '/games/haunted' },
    ],
  },
  { label: 'Private Events', href: '/private-events' },
  // {
  //   label: 'Private Events',
  //   children: [
  //     { label: 'Private Parties', href: '/private-events/private-party' },
  //     { label: 'Team Building', href: '/private-events/team-building' },
  //     { label: 'Bachelor Party', href: '/private-events/bachelor-party' },
  //   ],
  // },

  { label: 'Contact Us', href: '/contact-us' },
];

export default function HeaderV3() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-[#000f1328] px-4 sm:px-8 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
            <Image
              src="/ZL-W.webp"
              alt="Zero Latency Webster Logo"
              width={66}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation & CTA Button */}
          <div className="hidden md:flex items-center gap-x-6">
            <nav className="flex items-center gap-x-8 text-white">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label} className="relative group">
                    <button className="flex items-center gap-x-1 py-2 font-medium hover:text-cyan-400 transition-colors">
                      {item.label}
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full -left-4 w-56 p-2 bg-[#000f13] rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <div className="flex flex-col gap-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-3 py-2 text-sm rounded-md hover:bg-cyan-900/50 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-2 font-medium hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            {/* Desktop "Book Now" Button */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-700 text-white font-semibold px-5 py-2 rounded-full hover:bg-cyan-600 transition-colors duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="text-white md:hidden" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 right-0 bottom-0 z-40 w-full max-w-xs bg-[#000f13] text-white transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <nav className="flex h-full flex-col p-8">
          <div className="space-y-4">
            {nav.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => handleMobileDropdown(item.label)}
                      className="flex w-full items-center justify-between py-2 text-lg font-semibold"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${openMobileDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openMobileDropdown === item.label && (
                      <div className="pl-4 pt-2 flex flex-col space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="py-2 text-gray-300 hover:text-cyan-400"
                            onClick={toggleMobileMenu} // Close menu on link click
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-lg font-semibold hover:text-cyan-400"
                    onClick={toggleMobileMenu} // Close menu on link click
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* Mobile "Book Now" Button */}
          <div className="mt-auto border-t border-gray-700 pt-6">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-cyan-700 text-white font-semibold px-5 py-3 rounded-full hover:bg-cyan-600 transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              Book Now
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}