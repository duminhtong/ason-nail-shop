import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ASon Dropship | Premium Products from 1688 & Taobao",
  description: "Browse high-quality imported products from 1688 and Taobao at competitive prices. Fast ordering via Zalo.",
  openGraph: {
    title: "ASon Dropship",
    description: "Premium Products from 1688 & Taobao",
    url: "https://asondropship.com",
    siteName: "ASon Dropship",
    images: [
      {
        url: "https://asondropship.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased dark`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-on-surface selection:bg-primary/30 selection:text-primary pb-xl">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
