import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllBeans,
  getBeanById,
  getScoreLabel,
  getScoreClass,
  getCountryFlag,
  getFlavorHint,
  getSimilarBeans,
  scoreExplanations,
} from "@/lib/beans";
import ScoreRadar from "@/components/ScoreRadar";
import BeanCard from "@/components/BeanCard";
import DiaryControls from "@/components/DiaryControls";
import AddToCartControls from "@/components/AddToCartControls";
import { getShopsForBean } from "@/lib/shops";

export function generateStaticParams() {
  return getAllBeans().map((bean) => ({
    id: String(bean.id),
  }));
}

const SCORE_FIELDS = [
  { key: "aroma", label: "Aroma" },
  { key: "flavor", label: "Flavor" },
  { key: "aftertaste", label: "Aftertaste" },
  { key: "acidity", label: "Acidity" },
  { key: "body", label: "Body" },
  { key: "balance", label: "Balance" },
  { key: "uniformity", label: "Uniformity" },
  { key: "clean_cup", label: "Clean Cup" },
  { key: "sweetness", label: "Sweetness" },
  { key: "cupper_points", label: "Cupper Points" },
] as const;

export default async function BeanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bean = getBeanById(Number(id));

  if (!bean) {
    notFound();
  }

  const scoreLabel = getScoreLabel(bean.scores.total);
  const scoreClass = getScoreClass(bean.scores.total);
  const flag = getCountryFlag(bean.country);
  const flavorHint = getFlavorHint(bean.scores);
  const similarBeans = getSimilarBeans(bean, 3);
  const nearbyShops = getShopsForBean(bean.id).slice(0, 3);

  const details = [
    { label: "Species", value: bean.species },
    { label: "Variety", value: bean.variety },
    { label: "Processing", value: bean.processing_method },
    { label: "Altitude", value: bean.altitude_meters ? `${bean.altitude_meters.toLocaleString()}m` : null },
    { label: "Harvest Year", value: bean.harvest_year },
    { label: "Farm", value: bean.farm },
    { label: "Producer", value: bean.producer },
    { label: "Color", value: bean.color },
    { label: "Moisture", value: bean.moisture ? `${(bean.moisture * 100).toFixed(1)}%` : null },
  ].filter((d) => d.value);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-roast-light mb-8">
        <Link href="/" className="hover:text-espresso transition-colors">Home</Link>
        <span className="text-roast-light/40">/</span>
        <Link
          href={`/?country=${encodeURIComponent(bean.country)}`}
          className="hover:text-espresso transition-colors"
        >
          {bean.country}
        </Link>
        {bean.region && (
          <>
            <span className="text-roast-light/40">/</span>
            <span className="text-espresso capitalize">{bean.region}</span>
          </>
        )}
      </nav>

      {/* Header banner */}
      <div className="bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] rounded-2xl p-8 mb-10 animate-fade-in">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-3xl mb-2">{flag}</div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso">
              {bean.country}
            </h1>
            {bean.region && (
              <p className="text-lg text-roast-light mt-1 capitalize">{bean.region}</p>
            )}
            <p className="text-sm italic text-caramel mt-2">{flavorHint}</p>
          </div>
          <div className="text-center">
            <div className={`${scoreClass} w-18 h-18 rounded-full flex items-center justify-center text-xl font-bold shadow-md`}
              style={{ width: '4.5rem', height: '4.5rem' }}
            >
              {bean.scores.total.toFixed(1)}
            </div>
            <p className="text-sm text-roast-light mt-2 font-medium">{scoreLabel}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Details */}
        <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-8 animate-fade-in-up">
          <h2 className="font-serif text-xl font-bold text-espresso mb-5">
            Bean Details
          </h2>
          <dl className="space-y-3">
            {details.map((d) => (
              <div key={d.label} className="flex justify-between items-baseline gap-4">
                <dt className="text-sm text-roast-light">{d.label}</dt>
                <dd className="text-sm font-medium text-espresso capitalize text-right">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Defects */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <h3 className="text-sm font-medium text-roast-light mb-3">Defects</h3>
            <div className="flex gap-8">
              <div>
                <p className="text-2xl font-bold text-espresso">
                  {bean.defects.category_one}
                </p>
                <p className="text-xs text-roast-light mt-0.5">Category One</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-espresso">
                  {bean.defects.category_two}
                </p>
                <p className="text-xs text-roast-light mt-0.5">Category Two</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cupping Scores */}
        <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-8 animate-fade-in-up stagger-2">
          <h2 className="font-serif text-xl font-bold text-espresso mb-5">
            Cupping Scores
          </h2>

          {/* Radar chart */}
          <ScoreRadar scores={bean.scores} />

          {/* Full score breakdown */}
          <div className="mt-8 space-y-3">
            {SCORE_FIELDS.map((s, i) => {
              const value = bean.scores[s.key];
              const explanation = scoreExplanations[s.key];
              return (
                <div key={s.key} className="flex items-center gap-3 group/score">
                  <span className="text-xs text-roast-light w-24 shrink-0 cursor-help underline decoration-dotted decoration-roast-light/40 relative">
                    {s.label}
                    {/* CSS tooltip */}
                    {explanation && (
                      <span className="invisible group-hover/score:visible absolute bottom-full left-0 mb-2 w-52 p-2.5 bg-[#1A1A1A] text-[#E8E4E0] text-xs rounded-lg shadow-lg z-10 leading-relaxed font-normal no-underline">
                        {explanation}
                      </span>
                    )}
                  </span>
                  <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sage rounded-full score-bar-fill"
                      style={{
                        width: `${(value / 10) * 100}%`,
                        animationDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-espresso w-8 text-right">
                    {value.toFixed(1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Diary */}
      <DiaryControls beanId={bean.id} />

      {/* Purchase */}
      <AddToCartControls
        beanId={bean.id}
        basePrice={bean.price}
        roaster={bean.roaster}
        roastLevel={bean.roast_level}
        inStock={bean.in_stock}
      />

      {/* Find Near You */}
      {nearbyShops.length > 0 && (
        <section className="mt-10 animate-fade-in-up stagger-4">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-serif text-lg font-bold text-espresso">Find This Bean Near You</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {nearbyShops.map((shop) => (
              <Link
                key={shop.id}
                href={`/shops/${shop.id}`}
                className="bg-[#141414] rounded-xl border border-white/[0.06] p-4 hover:border-caramel/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{shop.image}</span>
                  <div>
                    <p className="font-medium text-sm text-espresso group-hover:text-caramel transition-colors">{shop.name}</p>
                    <p className="text-xs text-roast-light">{shop.city}, {shop.state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-roast-light/70">
                  <svg className="w-3 h-3 text-honey" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span>{shop.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{shop.hours}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Similar Beans */}
      {similarBeans.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-xl font-bold text-espresso">You Might Also Like</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similarBeans.map((similar, i) => (
              <div key={similar.id} className={`animate-fade-in-up stagger-${i + 1}`}>
                <BeanCard bean={similar} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
