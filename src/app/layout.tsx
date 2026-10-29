
import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingStarAnise from "@/components/FloatingStarAnise";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Editorial display face for headings (loaded by next/font: self-hosted, no extra package).
const display = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Script face for the tagline (was a render-blocking @import from fonts.googleapis.com in globals.css).
const script = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | RASAM Spices",
    default: "RASAM Spices | Authentic Indian Spices & Masalas",
  },
  description:
    "RASAM Spices brings the authentic taste of India to every home: ground spices, blended masalas and seasonings. Business enquiries welcome from retailers, wholesalers and distributors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${script.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingStarAnise />
      </body>
    </html>
  );
}
