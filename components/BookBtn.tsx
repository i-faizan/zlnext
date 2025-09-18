"use client";

import { BOOKING_URL } from "@/lib/navData";
import { track } from "@/lib/ga";
import { fbqTrack } from "@/lib/meta";

export default function BookGameButton({
  className = "",
  label = "BOOK A GAME",
  source = "header",
  link = BOOKING_URL
}: {
  className?: string;
  label?: string;
  source?: string; // where the CTA lives (header/hero/footer)
  link?: string;
}) {
  function handleClick() {
    try {
      track?.("cta_click", { source, label });
      fbqTrack('Book Now Clicked', { value: 0, currency: 'USD' });
    } catch {}
  }

  return (
    <a
      href={link}
      rel="external nofollow noopener noreferrer"
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center
        bg-transparent
        hover:bg-[#00bcd4]
        text-[#00bcd4]
        hover:text-white
        font-semibold
        p-4
        mt-4
        border-2
        border-[#00bcd4]
        text-xl
        rounded-full
        transition-colors
        duration-200
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-[#00bcd4]
        ${className}
      `}
    >
      {label}
    </a>
  );
}
