import {
  getAllBeans,
  getCuratedBeans,
  getCatalogStats,
  getUniqueCountries,
  getUniqueProcessingMethods,
} from "@/lib/beans";
import { getAllShops } from "@/lib/shops";
import Link from "next/link";
import BeanCatalog from "@/components/BeanCatalog";
import FeaturedBeans from "@/components/FeaturedBeans";
import ShopCard from "@/components/ShopCard";

export default function HomePage() {
  const beans = getAllBeans();
  const curated = getCuratedBeans();
  const stats = getCatalogStats();
  const countries = getUniqueCountries();
  const processingMethods = getUniqueProcessingMethods();
  const featuredShops = getAllShops().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0F0F0F]">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-caramel-light)_0%,_transparent_50%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_var(--color-sage)_0%,_transparent_40%)] opacity-5" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold animate-fade-in-up">
            <span className="text-[#E8E4E0]/80">Discover</span>
            <br />
            <span className="text-caramel-light">Amazing</span>{" "}
            <span className="text-[#E8E4E0]">Coffee</span>
          </h1>

          <p className="text-lg md:text-xl text-[#E8E4E0]/60 max-w-2xl mx-auto mt-6 animate-fade-in-up stagger-2">
            Explore {stats.totalBeans.toLocaleString()} specialty-grade beans
            from {stats.countries} countries — scored, sorted, and waiting for you.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up stagger-4">
            <span className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-5 py-2 text-sm text-[#E8E4E0]/80">
              <span className="font-bold text-[#E8E4E0]">{stats.countries}</span> Countries
            </span>
            <span className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-5 py-2 text-sm text-[#E8E4E0]/80">
              <span className="font-bold text-[#E8E4E0]">{stats.totalBeans.toLocaleString()}</span> Beans
            </span>
            <span className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-full px-5 py-2 text-sm text-[#E8E4E0]/80">
              <span className="font-bold text-[#E8E4E0]">{stats.topScore.toFixed(1)}</span> Top Score
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up stagger-6">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 bg-caramel hover:bg-caramel-light text-[#0F0F0F] font-bold px-7 py-3 rounded-full hover:scale-105 transition-all shadow-lg"
            >
              Start Exploring
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] text-[#E8E4E0] font-medium px-7 py-3 rounded-full hover:bg-white/[0.1] transition-all"
            >
              ✨ Find Your Flavor Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured beans */}
        <FeaturedBeans beans={curated} />

        {/* Find a Shop */}
        <section className="mb-14 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-xl font-bold text-espresso">Coffee Shops</h2>
              <div className="flex-1 h-px bg-white/[0.04]" />
            </div>
            <Link href="/shops" className="text-sm text-caramel hover:text-roast transition-colors font-medium">
              View all shops →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredShops.map((shop, i) => (
              <div key={shop.id} className={`animate-fade-in-up stagger-${i + 1}`}>
                <ShopCard shop={shop} />
              </div>
            ))}
          </div>
        </section>

        {/* Catalog */}
        <div id="catalog">
          <BeanCatalog
            beans={beans}
            countries={countries}
            processingMethods={processingMethods}
          />
        </div>

        {/* About Section */}
        <section id="about" className="mt-20 text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-espresso mb-4">
            About This Project
          </h2>
          <p className="text-roast-light leading-relaxed">
            Coffee App is built by a team of designers and researchers learning to
            collaborate in a codebase — with Claude Code as our building partner.
            Every bean in our catalog is sourced from the Coffee Quality
            Institute&apos;s open dataset, scored using the SCA cupping protocol.
          </p>
        </section>
      </div>
    </div>
  );
}
