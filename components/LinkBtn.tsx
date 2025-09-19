"use client";

import Link from "next/link";

export default function LinkButton({
  className = "",
  label = "BOOK A GAME",
  source = "header",
  route = "/"
}: {
  className?: string;
  label?: string;
  source?: string; // where the CTA lives (header/hero/footer)
  route?: string;
}) {
  // function handleClick() {
  //   try {
  //     track?.("cta_click", { source, label });
  //   } catch {}
  //   window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  // }
  console.log(source)
  return (
    <Link
      href={route}
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
    </Link>
  );
}
