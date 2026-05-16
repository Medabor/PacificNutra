import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pacificnutra.com",
  ),
  // Site-wide noindex while building. Remove this line at launch.
  robots: { index: false, follow: false },
  title: {
    default: "Pacific Nutra — Ancestral Polynesian Food for the Modern Kitchen",
    template: "%s · Pacific Nutra",
  },
  description:
    "Taro. Breadfruit. Poi. The foods that kept Pacific Islanders healthy for three thousand years — translated for the modern kitchen.",
  openGraph: {
    title: "Pacific Nutra",
    description:
      "Ancestral Polynesian food, translated for the modern kitchen. Recipes, field notes, and the occasional cookbook.",
    siteName: "Pacific Nutra",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
