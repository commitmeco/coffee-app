import Link from "next/link";
import { Bean, getScoreLabel, getCountryFlag } from "@/lib/beans";

export default function FeaturedBeans({ beans }: { beans: Bean[] }) {
  // Show top 6 curated beans
  const featured = beans.slice(0, 6);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-serif text-2xl font-bold text-espresso">Editor&apos;s Picks</h2>
        <div className="flex-1 h-px bg-cream-dark" />
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
        {featured.map((bean) => {
          const gradientClass =
            bean.scores.total >= 90
              ? "from-emerald-800 to-emerald-600"
              : bean.scores.total >= 85
                ? "from-sage to-sage-light"
                : "from-caramel to-caramel-light";

          return (
            <Link
              key={bean.id}
              href={`/beans/${bean.id}`}
              className="snap-start shrink-0 w-[260px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-cream-dark group"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${gradientClass} px-5 pt-5 pb-8 relative`}>
                <span className="text-2xl">{getCountryFlag(bean.country)}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-1 leading-tight">
                  {bean.country}
                </h3>
                {bean.region && (
                  <p className="text-sm text-white/70 capitalize mt-0.5">{bean.region}</p>
                )}
                {/* Overlapping score badge */}
                <div className="absolute -bottom-5 right-5 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-cream-dark group-hover:scale-110 transition-transform">
                  <span className="text-sm font-bold text-espresso">{bean.scores.total.toFixed(1)}</span>
                </div>
              </div>

              {/* Details */}
              <div className="px-5 pt-5 pb-4">
                <div className="space-y-1.5 text-sm text-roast-light">
                  {bean.processing_method && <p>{bean.processing_method}</p>}
                  {bean.altitude_meters && <p>{bean.altitude_meters.toLocaleString()}m altitude</p>}
                  {bean.variety && <p className="capitalize">{bean.variety}</p>}
                </div>
                <p className="text-xs font-medium text-sage mt-3">{getScoreLabel(bean.scores.total)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
