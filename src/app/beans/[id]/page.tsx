import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBeans, getBeanById, getScoreLabel, getScoreClass } from "@/lib/beans";
import ScoreRadar from "@/components/ScoreRadar";

export function generateStaticParams() {
  return getAllBeans().map((bean) => ({
    id: String(bean.id),
  }));
}

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
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-roast-light hover:text-espresso transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all beans
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso">
            {bean.country}
          </h1>
          {bean.region && (
            <p className="text-lg text-roast-light mt-1 capitalize">{bean.region}</p>
          )}
        </div>
        <div className="text-right">
          <span className={`${scoreClass} text-lg font-bold px-4 py-2 rounded-full inline-block`}>
            {bean.scores.total.toFixed(1)}
          </span>
          <p className="text-sm text-roast-light mt-1">{scoreLabel}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Details */}
        <div className="bg-white rounded-xl border border-cream-dark p-6">
          <h2 className="font-serif text-xl font-bold text-espresso mb-4">
            Bean Details
          </h2>
          <dl className="space-y-3">
            {details.map((d) => (
              <div key={d.label} className="flex justify-between items-baseline">
                <dt className="text-sm text-roast-light">{d.label}</dt>
                <dd className="text-sm font-medium text-espresso capitalize">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Defects */}
          <div className="mt-6 pt-4 border-t border-cream-dark">
            <h3 className="text-sm font-medium text-roast-light mb-2">Defects</h3>
            <div className="flex gap-6">
              <div>
                <p className="text-2xl font-bold text-espresso">
                  {bean.defects.category_one}
                </p>
                <p className="text-xs text-roast-light">Category One</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-espresso">
                  {bean.defects.category_two}
                </p>
                <p className="text-xs text-roast-light">Category Two</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cupping Scores */}
        <div className="bg-white rounded-xl border border-cream-dark p-6">
          <h2 className="font-serif text-xl font-bold text-espresso mb-4">
            Cupping Scores
          </h2>

          {/* Radar chart */}
          <ScoreRadar scores={bean.scores} />

          {/* Full score breakdown */}
          <div className="mt-6 space-y-2">
            {[
              { label: "Aroma", value: bean.scores.aroma },
              { label: "Flavor", value: bean.scores.flavor },
              { label: "Aftertaste", value: bean.scores.aftertaste },
              { label: "Acidity", value: bean.scores.acidity },
              { label: "Body", value: bean.scores.body },
              { label: "Balance", value: bean.scores.balance },
              { label: "Uniformity", value: bean.scores.uniformity },
              { label: "Clean Cup", value: bean.scores.clean_cup },
              { label: "Sweetness", value: bean.scores.sweetness },
              { label: "Cupper Points", value: bean.scores.cupper_points },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-xs text-roast-light w-24 shrink-0">
                  {s.label}
                </span>
                <div className="flex-1 h-2 bg-cream-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage rounded-full transition-all"
                    style={{ width: `${(s.value / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-espresso w-8 text-right">
                  {s.value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
