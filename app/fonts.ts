import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Only weights actually used: normal, semibold, bold
  variable: "--font-poppins",
  display: "swap", // Optimize font loading
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"], // Only weights actually used: normal, bold, black
  variable: "--font-montserrat",
  display: "swap", // Optimize font loading
});

export { poppins, montserrat };