import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","300","400", "500", "600", "700","800","900"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200","300","400", "500", "600", "700","800","900"],
  variable: "--font-montserrat",
});
export { poppins, montserrat };