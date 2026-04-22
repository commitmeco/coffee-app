import {
  getAllBeans,
  getCuratedBeans,
  getCatalogStats,
  getUniqueCountries,
  getUniqueProcessingMethods,
} from "@/lib/beans";
import Link from "next/link";
import BeanCatalog from "@/components/BeanCatalog";
import FeaturedBeans from "@/components/FeaturedBeans";
import MagazineSection from "@/components/MagazineSection";

export default function HomePage() {
  const beans = getAllBeans();
  const curated = getCuratedBeans();
  const stats = getCatalogStats();
  const countries = getUniqueCountries();
  const processingMethods = getUniqueProcessingMethods();

  return (
    <div>

      {/* ── HERO — Editorial masthead ─────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-espresso-light)", minHeight: 480 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(200,137,60,0.15) 0%, transparent 60%)" }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <p
              className="text-[0.65rem] font-bold tracking-[0.28em] uppercase mb-4"
              style={{ color: "var(--color-caramel)" }}
            >
              April 2026 — Issue 52 &nbsp;·&nbsp; Grounds &amp; Glory
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.0] mb-6 animate-fade-in-up" style={{ color: "var(--color-paper)" }}>
              Discover the World<br />
              <span style={{ color: "var(--color-caramel)" }}>Through Coffee</span>
            </h1>
            <p
              className="font-serif italic text-lg md:text-xl leading-[1.7] mb-8 max-w-xl animate-fade-in-up stagger-2"
              style={{ color: "rgba(253,250,246,0.65)", fontWeight: 300 }}
            >
              {stats.totalBeans.toLocaleString()} specialty-grade beans from {stats.countries} countries,
              scored and waiting for you — plus stories, guides, and the conversation behind every cup.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mb-10 animate-fade-in-up stagger-4">
              {[
                { label: "Countries", value: stats.countries },
                { label: "Beans Catalogued", value: stats.totalBeans.toLocaleString() },
                { label: "Top Score", value: `${stats.topScore.toFixed(1)} pts` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-serif text-2xl font-bold" style={{ color: "var(--color-paper)" }}>{value}</div>
                  <div className="text-[0.72rem] font-semibold tracking-[0.06em] uppercase" style={{ color: "rgba(253,250,246,0.45)" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-6">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 text-[0.82rem] font-bold tracking-[0.06em] uppercase px-6 py-3 rounded-sm transition-all"
                style={{ background: "var(--color-caramel)", color: "white" }}
              >
                Explore Beans
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 text-[0.82rem] font-bold tracking-[0.06em] uppercase px-6 py-3 rounded-sm border transition-all"
                style={{ borderColor: "rgba(253,250,246,0.3)", color: "var(--color-paper)", background: "transparent" }}
              >
                ✨ Find Your Flavor Profile
              </Link>
              <Link
                href="#magazine"
                className="inline-flex items-center gap-2 text-[0.82rem] font-bold tracking-[0.06em] uppercase px-6 py-3 rounded-sm border transition-all"
                style={{ borderColor: "rgba(253,250,246,0.3)", color: "var(--color-paper)", background: "transparent" }}
              >
                📰 Read the Magazine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAGAZINE STORIES — key entry section ─────────────── */}
      <MagazineSection />

      {/* ── QUIZ INTERSTITIAL ─────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "var(--color-caramel)", color: "white" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
              Flavor Profile Quiz
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-[1.2] mb-2">
              What kind of coffee drinker are you?
            </h2>
            <p className="text-[0.95rem] leading-[1.65]" style={{ color: "rgba(255,255,255,0.75)" }}>
              Six questions. Four archetypes. One perfectly matched bean waiting for you.
            </p>
          </div>
          <Link
            href="/quiz"
            className="flex-shrink-0 inline-flex items-center gap-2 text-[0.82rem] font-bold tracking-[0.08em] uppercase px-8 py-4 rounded-sm border-2 border-white transition-all"
            style={{ color: "white", background: "transparent" }}
          >
            Take the Quiz — It&apos;s Free →
          </Link>
        </div>
      </section>

      {/* ── FEATURED BEANS ────────────────────────────────────── */}
      <section className="py-16" style={{ background: "var(--color-paper)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: "var(--color-caramel)" }}>
            Editor&apos;s Selection
          </p>
          <FeaturedBeans beans={curated} />
        </div>
      </section>

      {/* ── BEAN CATALOG ─────────────────────────────────────── */}
      <section id="catalog" className="py-16" style={{ background: "var(--color-cream)" }}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="mb-8">
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: "var(--color-caramel)" }}>
              Full Catalog
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: "var(--color-espresso-light)" }}>
              {stats.totalBeans.toLocaleString()} Specialty Beans
            </h2>
          </div>
          <BeanCatalog
            beans={beans}
            countries={countries}
            processingMethods={processingMethods}
          />
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section
        className="py-20 text-center"
        style={{ background: "var(--color-cream-dark)" }}
      >
        <div className="max-w-xl mx-auto px-6">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: "var(--color-caramel)" }}>
            Our Mission
          </p>
          <h2 className="font-serif text-2xl font-bold mb-4" style={{ color: "var(--color-espresso-light)" }}>
            Built by coffee lovers, for coffee lovers
          </h2>
          <p className="leading-[1.8] text-[0.95rem]" style={{ color: "var(--color-roast-light)" }}>
            Grounds &amp; Glory is built by a team of designers and researchers collaborating with Claude Code.
            Every bean in our catalog is sourced from the Coffee Quality Institute&apos;s open dataset,
            scored using the SCA cupping protocol. Ask Marco the Barista — he&apos;s always standing by.
          </p>
        </div>
      </section>

    </div>
  );
}
