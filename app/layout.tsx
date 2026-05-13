import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacificnutra.com"),
  title: {
    default: "Pacific Nutra — Polynesian Nutrition for Modern Wellness",
    template: "%s | Pacific Nutra",
  },
  description:
    "Ancestral Polynesian foods, modern wellness. Recipes, guides, and meal plans rooted in the longevity traditions of the Pacific.",
  openGraph: {
    title: "Pacific Nutra",
    description:
      "Ancestral Polynesian foods, modern wellness. Recipes, guides, and meal plans rooted in the longevity traditions of the Pacific.",
    siteName: "Pacific Nutra",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
