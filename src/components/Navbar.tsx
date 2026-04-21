"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const TICKER_ITEMS = [
  "☕ NEW ISSUE: 3 Days in Yirgacheffe, Ethiopia",
  "🌍 Exclusive: Inside Panama's Gesha Valley with Don Pachi",
  "🏆 World Barista Championship Preview — Tokyo 2025",
  "🫘 New Bean Drop: Rwanda Bourbon Peaberry — Limited Edition",
  "📍 Just Published: The 12 Best Specialty Cafés in Oaxaca",
];

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, hydrated } = useCart();
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]; // doubled for seamless loop

  return (
    <>
      {/* News Ticker */}
      <div
        className="overflow-hidden whitespace-nowrap text-white text-[0.72rem] font-semibold tracking-[0.12em] uppercase py-2"
        style={{ background: "#FF5C1A" }}
        aria-label="Breaking news ticker"
      >
        <div className="omc-ticker-inner inline-flex gap-0">
          {tickerContent.map((item, i) => (
            <span key={i} className="px-8 inline-flex items-center gap-4">
              {item}
              <span className="text-white/50">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Masthead */}
      <header
        className="sticky top-0 z-[200] flex items-center justify-between px-12 h-20"
        style={{ background: "#0A0804", borderBottom: "3px solid #FF5C1A" }}
      >
        {/* Logo */}
        <Link href="/" className="leading-none cursor-pointer group">
          <div
            className="text-[2.2rem] tracking-[0.06em] text-white leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            One <span style={{ color: "#FF5C1A" }}>More</span> Cup
          </div>
          <div className="text-[0.55rem] tracking-[0.25em] uppercase font-medium mt-0.5" style={{ color: "#C4843A" }}>
            The World's Coffee Lifestyle Magazine
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#destinations", label: "Destinations" },
            { href: "#training",     label: "Training" },
            { href: "#shop",         label: "Shop" },
            { href: "#passport",     label: "Passport" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[0.78rem] font-medium tracking-[0.08em] uppercase transition-colors"
              style={{ color: "rgba(250,250,245,0.65)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FF5C1A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,245,0.65)")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="hidden md:inline-flex text-[0.75rem] font-semibold tracking-[0.05em] uppercase px-4 py-2 rounded-full border-0 text-white cursor-pointer transition-all"
            style={{ background: "#FF5C1A" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFD700"; e.currentTarget.style.color = "#0A0804"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FF5C1A"; e.currentTarget.style.color = "white"; }}
          >
            ✈️ My Passport
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center text-base text-white cursor-pointer transition-all"
            style={{ border: "1px solid rgba(250,250,245,0.2)", background: "none" }}
            aria-label="Open cart"
          >
            🛒
            {hydrated && cartCount > 0 && (
              <span
                className="absolute -top-[3px] -right-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.62rem] font-bold text-[#0A0804]"
                style={{ background: "#FF5C1A" }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
