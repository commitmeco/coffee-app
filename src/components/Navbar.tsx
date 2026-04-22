"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const NAV_LINKS = [
  { href: "/",          label: "Home" },
  { href: "#magazine",  label: "Magazine" },
  { href: "/beans",     label: "Beans" },
  { href: "/shops",     label: "Shops" },
  { href: "/brew-guide",label: "Brew Guide" },
  { href: "/quiz",      label: "Flavor Quiz" },
  { href: "/diary",     label: "My Diary" },
];

const TICKER_ITEMS = [
  "☕ NEW: The Women Who Saved Heirloom Coffee — Ethiopia Report",
  "🌍 Exclusive: Inside Panama's Gesha Valley with Don Pachi",
  "🏆 World Barista Championship Preview — Tokyo 2025",
  "🫘 New Bean Drop: Rwanda Bourbon Peaberry — Limited Edition",
  "📍 Just Published: 3 Days in Oaxaca — The Coffee Itinerary",
];

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, hydrated } = useCart();
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      {/* News Ticker — caramel accent bar */}
      <div
        className="overflow-hidden whitespace-nowrap text-[0.7rem] font-semibold tracking-[0.1em] uppercase py-1.5"
        style={{ background: "var(--color-caramel)", color: "white" }}
        aria-label="Latest stories ticker"
      >
        <div className="omc-ticker-inner inline-flex gap-0">
          {tickerContent.map((item, i) => (
            <span key={i} className="px-8 inline-flex items-center gap-4">
              {item}
              <span className="opacity-50">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Masthead */}
      <header
        className="sticky top-0 z-[200] border-b"
        style={{ background: "var(--color-paper)", borderColor: "var(--color-border)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-[68px] flex items-center gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group leading-none">
            <div
              className="font-serif text-[1.55rem] font-bold tracking-[-0.01em] leading-none"
              style={{ color: "var(--color-espresso-light)" }}
            >
              Grounds <span style={{ color: "var(--color-caramel)" }}>&amp;</span> Glory
            </div>
            <div
              className="text-[0.55rem] tracking-[0.22em] uppercase font-semibold mt-0.5"
              style={{ color: "var(--color-roast-light)" }}
            >
              The Specialty Coffee Journal
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 ml-auto">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[0.78rem] font-semibold tracking-[0.04em] uppercase transition-colors"
                style={{ color: "var(--color-roast-light)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-caramel)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-roast-light)")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-4">
            <Link
              href="/quiz"
              className="hidden sm:inline-flex text-[0.72rem] font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-sm transition-all"
              style={{ background: "var(--color-caramel)", color: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-espresso-light)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-caramel)"; }}
            >
              Take the Quiz
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center text-base transition-all cursor-pointer border"
              style={{ borderColor: "var(--color-border)", color: "var(--color-roast)", background: "transparent" }}
              aria-label="Open cart"
            >
              🛒
              {hydrated && cartCount > 0 && (
                <span
                  className="absolute -top-[3px] -right-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center text-[0.62rem] font-bold text-white"
                  style={{ background: "var(--color-caramel)" }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-[38px] h-[38px] flex flex-col justify-center items-center gap-[5px] cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-5 h-[2px] rounded-full" style={{ background: "var(--color-roast)" }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t" style={{ background: "var(--color-paper)", borderColor: "var(--color-border)" }}>
            <nav className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-3">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[0.85rem] font-semibold py-1"
                  style={{ color: "var(--color-roast)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
