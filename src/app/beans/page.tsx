import {
  getAllBeans,
  getCatalogStats,
  getUniqueCountries,
  getUniqueProcessingMethods,
} from "@/lib/beans";
import BeanCatalog from "@/components/BeanCatalog";

export const metadata = {
  title: "Beans — One More Cup",
  description: "Browse the full catalog of specialty-grade coffee beans.",
};

export default function BeansPage() {
  const beans = getAllBeans();
  const stats = getCatalogStats();
  const countries = getUniqueCountries();
  const processingMethods = getUniqueProcessingMethods();

  return (
    <div style={{ background: "var(--color-cream)" }}>
      <section className="py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="mb-8">
            <p
              className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-1"
              style={{ color: "var(--color-caramel)" }}
            >
              Full Catalog
            </p>
            <h1
              className="font-serif text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "var(--color-espresso-light)" }}
            >
              {stats.totalBeans.toLocaleString()} Specialty Beans
            </h1>
            <p
              className="text-[0.95rem] leading-[1.6] max-w-2xl"
              style={{ color: "var(--color-roast-light)" }}
            >
              From {stats.countries} countries, scored by the Coffee Quality
              Institute. Filter by origin, processing method, or score to find
              your next cup.
            </p>
          </div>
          <BeanCatalog
            beans={beans}
            countries={countries}
            processingMethods={processingMethods}
          />
        </div>
      </section>
    </div>
  );
}
