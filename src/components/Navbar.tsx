"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDiary } from "@/components/DiaryProvider";
import { useCart } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const { entries, hydrated } = useDiary();
  const diaryCount = hydrated ? Object.keys(entries).length : 0;
  const { cartCount, hydrated: cartHydrated } = useCart();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A0A]/95 text-[#E8E4E0] shadow-[0_1px_0_rgba(255,255,255,0.04)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-2xl">☕</span>
          <span className="font-serif text-xl font-bold tracking-tight group-hover:text-caramel-light transition-colors">
            Coffee App
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-caramel-light transition-colors">
            Beans
          </Link>
          <Link href="/shops" className="hover:text-caramel-light transition-colors">
            Shops
          </Link>
          <Link href="/brew-guide" className="hover:text-caramel-light transition-colors">
            Brew Guide
          </Link>
          <Link href="/quiz" className="hover:text-caramel-light transition-colors flex items-center gap-1">
            <span className="text-xs">✨</span>
            Quiz
          </Link>
          <Link href="/diary" className="hover:text-caramel-light transition-colors flex items-center gap-1.5">
            Diary
            {diaryCount > 0 && (
              <span className="bg-caramel text-[#0F0F0F] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {diaryCount}
              </span>
            )}
          </Link>
          <Link href="/social" className="hover:text-caramel-light transition-colors">
            Social
          </Link>

          {/* Desktop search toggle */}
          <div className="relative">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center animate-fade-in">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search beans..."
                  autoFocus
                  className="w-48 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-1.5 text-sm text-[#E8E4E0] placeholder:text-white/40 focus:outline-none focus:border-caramel/50"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="ml-2 text-white/60 hover:text-white"
                  aria-label="Close search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
                aria-label="Open search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartHydrated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-caramel text-[#0F0F0F] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Open cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100-4 2 2 0 000-4z" />
            </svg>
            {cartHydrated && cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-caramel text-[#0F0F0F] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-[#E8E4E0] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-0.5 w-full bg-[#E8E4E0] rounded-full transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-[#E8E4E0] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 border-t border-white/[0.06]" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search beans..."
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2.5 text-sm text-[#E8E4E0] placeholder:text-white/40 focus:outline-none focus:border-caramel/50"
            />
          </form>

          <Link href="/" onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            Browse Beans
          </Link>
          <Link href="/shops" onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            Coffee Shops
          </Link>
          <Link href="/brew-guide" onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            Brew Guide
          </Link>
          <Link href="/quiz" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            <span className="text-xs">✨</span>
            Flavor Quiz
          </Link>
          <Link href="/diary" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            My Diary
            {diaryCount > 0 && (
              <span className="bg-caramel text-[#0F0F0F] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {diaryCount}
              </span>
            )}
          </Link>
          <Link href="/social" onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            Community
          </Link>
          <Link href="/profile" onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-[#E8E4E0] hover:bg-white/[0.06] transition-colors">
            Profile
          </Link>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
}
