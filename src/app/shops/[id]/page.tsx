import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllShops, getShopById, getBeansForShop, getPriceLevelLabel } from "@/lib/shops";
import BeanCard from "@/components/BeanCard";

export function generateStaticParams() {
  return getAllShops().map((shop) => ({
    id: String(shop.id),
  }));
}

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const shop = getShopById(Number(id));

  if (!shop) {
    notFound();
  }

  const beans = getBeansForShop(shop);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name} ${shop.address} ${shop.city} ${shop.state}`)}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-roast-light mb-8">
        <Link href="/" className="hover:text-espresso transition-colors">Home</Link>
        <span className="text-roast-light/40">/</span>
        <Link href="/shops" className="hover:text-espresso transition-colors">Shops</Link>
        <span className="text-roast-light/40">/</span>
        <span className="text-espresso">{shop.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-cream-light)] via-[var(--color-cream-light)] to-[var(--color-cream-light)] rounded-2xl p-8 mb-10 animate-fade-in">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-4xl mb-3 block">{shop.image}</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso">
              {shop.name}
            </h1>
            <p className="text-lg text-roast-light mt-1">
              {shop.city}, {shop.state}
            </p>
            <p className="text-sm italic text-caramel mt-2">{shop.specialty}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-honey" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xl font-bold text-espresso">{shop.rating}</span>
              <span className="text-sm text-roast-light">({shop.reviewCount})</span>
            </div>
            <p className="text-sm text-roast-light">{getPriceLevelLabel(shop.priceLevel)}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Details */}
        <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-6 animate-fade-in-up">
          <h2 className="font-serif text-xl font-bold text-espresso mb-5">Details</h2>
          <dl className="space-y-3">
            <div className="flex justify-between items-baseline">
              <dt className="text-sm text-roast-light">Address</dt>
              <dd className="text-sm font-medium text-espresso text-right">{shop.address}</dd>
            </div>
            <div className="flex justify-between items-baseline">
              <dt className="text-sm text-roast-light">Hours</dt>
              <dd className="text-sm font-medium text-espresso">{shop.hours}</dd>
            </div>
            <div className="flex justify-between items-baseline">
              <dt className="text-sm text-roast-light">Price Level</dt>
              <dd className="text-sm font-medium text-espresso">{getPriceLevelLabel(shop.priceLevel)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-6 animate-fade-in-up stagger-2">
          <h2 className="font-serif text-xl font-bold text-espresso mb-5">Features</h2>
          <div className="flex flex-wrap gap-2">
            {shop.features.map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-white/[0.06] rounded-xl text-sm text-espresso capitalize"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Beans Available */}
      {beans.length > 0 && (
        <section className="mb-10 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-xl font-bold text-espresso">
              Beans Available Here
            </h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-sm text-roast-light">{beans.length} beans</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beans.map((bean, i) => (
              <div key={bean.id} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
                <BeanCard bean={bean} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
