import Link from "next/link";
import { Bean, getScoreLabel, getScoreClass } from "@/lib/beans";

export default function BeanCard({ bean }: { bean: Bean }) {
  const scoreClass = getScoreClass(bean.scores.total);
  const scoreLabel = getScoreLabel(bean.scores.total);

  return (
    <Link
      href={`/beans/${bean.id}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden border border-cream-dark"
    >
      {/* Color accent bar based on score */}
      <div
        className={`h-1.5 ${
          bean.scores.total >= 90
            ? "bg-emerald-700"
            : bean.scores.total >= 85
              ? "bg-sage"
              : "bg-caramel"
        }`}
      />

      <div className="p-5">
        {/* Country & Score */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-serif text-lg font-bold text-espresso leading-tight">
            {bean.country}
          </h3>
          <span
            className={`${scoreClass} text-xs font-bold px-2 py-1 rounded-full shrink-0`}
          >
            {bean.scores.total.toFixed(1)}
          </span>
        </div>

        {/* Region */}
        {bean.region && (
          <p className="text-sm text-roast-light mb-2 capitalize">
            {bean.region}
          </p>
        )}

        {/* Details */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {bean.variety && (
            <span className="text-xs bg-cream-dark text-espresso-light px-2 py-0.5 rounded-full">
              {bean.variety}
            </span>
          )}
          {bean.processing_method && (
            <span className="text-xs bg-cream-dark text-espresso-light px-2 py-0.5 rounded-full">
              {bean.processing_method}
            </span>
          )}
          {bean.altitude_meters && (
            <span className="text-xs bg-cream-dark text-espresso-light px-2 py-0.5 rounded-full">
              {bean.altitude_meters.toLocaleString()}m
            </span>
          )}
        </div>

        {/* Mini score bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-cream-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                bean.scores.total >= 90
                  ? "bg-emerald-700"
                  : bean.scores.total >= 85
                    ? "bg-sage"
                    : "bg-caramel"
              }`}
              style={{ width: `${bean.scores.total}%` }}
            />
          </div>
          <span className="text-xs text-roast-light">{scoreLabel}</span>
        </div>
      </div>
    </Link>
  );
}
