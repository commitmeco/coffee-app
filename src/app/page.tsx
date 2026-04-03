import {
  getAllBeans,
  getUniqueCountries,
  getUniqueProcessingMethods,
} from "@/lib/beans";
import BeanCatalog from "@/components/BeanCatalog";

export default function HomePage() {
  const beans = getAllBeans();
  const countries = getUniqueCountries();
  const processingMethods = getUniqueProcessingMethods();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">
          Discover Amazing Coffee
        </h1>
        <p className="text-lg text-roast-light max-w-2xl mx-auto">
          Explore {beans.length.toLocaleString()} specialty beans from around
          the world. Find your next favorite by origin, processing method, or
          cupping score.
        </p>
      </header>

      {/* Catalog */}
      <BeanCatalog
        beans={beans}
        countries={countries}
        processingMethods={processingMethods}
      />

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
  );
}
