import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { DiaryProvider } from "@/components/DiaryProvider";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BaristaChat from "@/components/BaristaChat";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coffee App — Discover Amazing Beans",
  description:
    "A friendly app to help you discover, learn about, and enjoy coffee beans from around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <DiaryProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BaristaChat />
          </CartProvider>
        </DiaryProvider>
      </body>
    </html>
  );
}
