import {
  getAllBeans,
  getCuratedBeans,
  getCatalogStats,
  getUniqueCountries,
  getUniqueProcessingMethods,
} from "@/lib/beans";
import BeanCatalog from "@/components/BeanCatalog";
import FeaturedBeans from "@/components/FeaturedBeans";

export default function HomePage() {
  const beans = getAllBeans();
  const curated = getCuratedBeans();
  const stats = getCatalogStats();
  const countries = getUniqueCountries();
  const processingMethods = getUniqueProcessingMethods();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-espresso via-roast to-espresso-light">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-caramel-light)_0%,_transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_var(--color-sage)_0%,_transparent_40%)] opacity-10" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold animate-fade-in-up">
            <span className="text-cream/80">Discover</span>
            <br />
            <span className="text-caramel-light">Amazing</span>{" "}
            <span className="text-cream">Coffee</span>
          </h1>

          <p className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mt-6 animate-fade-in-up stagger-2">
            Explore {stats.totalBeans.toLocaleString()} specialty-grade beans
            from {stats.countries} countries — scored, sorted, and waiting for you.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up stagger-4">
            <span className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-5 py-2 text-sm text-cream/80">
              <span className="font-bold text-cream">{stats.countries}</span> Countries
            </span>
            <span className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-5 py-2 text-sm text-cream/80">
              <span className="font-bold text-cream">{stats.totalBeans.toLocaleString()}</span> Beans
            </span>
            <span className="bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-5 py-2 text-sm text-cream/80">
              <span className="font-bold text-cream">{stats.topScore.toFixed(1)}</span> Top Score
            </span>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center mt-10 animate-fade-in-up stagger-6">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 bg-caramel hover:bg-caramel-light text-espresso font-bold px-7 py-3 rounded-full hover:scale-105 transition-all shadow-lg"
            >
              Start Exploring
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured beans */}
        <FeaturedBeans beans={curated} />

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
