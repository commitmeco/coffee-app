"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDiary } from "@/components/DiaryProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { entries, hydrated } = useDiary();
  const diaryCount = hydrated ? Object.keys(entries).length : 0;

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
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-espresso/95 text-cream shadow-lg">
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
            Browse Beans
          </Link>
          <Link href="/diary" className="hover:text-caramel-light transition-colors flex items-center gap-1.5">
            My Diary
            {diaryCount > 0 && (
              <span className="bg-caramel text-espresso text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {diaryCount}
              </span>
            )}
          </Link>
          <Link href="/#about" className="hover:text-caramel-light transition-colors">
            About
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
                  className="w-48 bg-espresso-light/60 border border-cream/20 rounded-full px-4 py-1.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-caramel/50"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="ml-2 text-cream/60 hover:text-cream"
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
                className="p-1.5 rounded-full hover:bg-espresso-light/50 transition-colors"
                aria-label="Open search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-espresso-light/50 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-cream rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-0.5 w-full bg-cream rounded-full transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-full bg-cream rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-64 border-t border-cream/10" : "max-h-0"
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
              className="w-full bg-espresso-light/60 border border-cream/20 rounded-full px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-caramel/50"
            />
          </form>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block py-3 px-3 rounded-lg text-cream hover:bg-espresso-light/50 transition-colors"
          >
            Browse Beans
          </Link>
          <Link
            href="/diary"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 py-3 px-3 rounded-lg text-cream hover:bg-espresso-light/50 transition-colors"
          >
            My Diary
            {diaryCount > 0 && (
              <span className="bg-caramel text-espresso text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {diaryCount}
              </span>
            )}
          </Link>
          <Link
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className="block py-3 px-3 rounded-lg text-cream hover:bg-espresso-light/50 transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
