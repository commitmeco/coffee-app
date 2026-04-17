"use client";

import Link from "next/link";
import { Bean, getScoreLabel, getScoreClass, getCountryFlag, getFlavorHint } from "@/lib/beans";
import { useDiary } from "@/components/DiaryProvider";

const DIARY_BADGES: Record<string, { icon: React.ReactNode; className: string }> = {
  tried: {
    icon: (
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    className: "bg-sage text-white",
  },
  loved: {
    icon: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    className: "bg-rose-500 text-white",
  },
  "want-to-try": {
    icon: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    className: "bg-honey text-espresso",
  },
};

export default function BeanCard({ bean }: { bean: Bean }) {
  const { getEntry, hydrated } = useDiary();
  const entry = hydrated ? getEntry(bean.id) : undefined;

  const scoreClass = getScoreClass(bean.scores.total);
  const scoreLabel = getScoreLabel(bean.scores.total);
  const flag = getCountryFlag(bean.country);
  const flavorHint = getFlavorHint(bean.scores);

  const gradientBar =
    bean.scores.total >= 90
      ? "bg-gradient-to-r from-emerald-700 to-sage"
      : bean.scores.total >= 85
        ? "bg-gradient-to-r from-sage to-sage-light"
        : "bg-gradient-to-r from-caramel to-caramel-light";

  const barColor =
    bean.scores.total >= 90
      ? "bg-emerald-700"
      : bean.scores.total >= 85
        ? "bg-sage"
        : "bg-caramel";

  const badge = entry ? DIARY_BADGES[entry.status] : undefined;

  return (
    <Link
      href={`/beans/${bean.id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-cream-dark hover:border-caramel/40"
    >
      {/* Gradient accent bar */}
      <div className={`h-1.5 ${gradientBar}`} />

      <div className="p-5">
        {/* Country & Score */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-bold text-espresso leading-tight">
            <span className="mr-1.5">{flag}</span>
            {bean.country}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {badge && (
              <span
                className={`${badge.className} w-6 h-6 rounded-full flex items-center justify-center animate-scale-in`}
                title={entry!.status.replace(/-/g, " ")}
              >
                {badge.icon}
              </span>
            )}
            <span
              className={`${scoreClass} text-xs font-bold px-2.5 py-1 rounded-full group-hover:scale-110 transition-transform`}
            >
              {bean.scores.total.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Region */}
        {bean.region && (
          <p className="text-sm text-roast-light capitalize">{bean.region}</p>
        )}

        {/* Flavor hint */}
        <p className="text-xs italic text-caramel mt-1">{flavorHint}</p>

        {/* Detail pills */}
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

        {/* Score bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-cream-dark rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor} score-bar-fill`}
              style={{ width: `${bean.scores.total}%` }}
            />
          </div>
          <span className="text-xs text-roast-light font-medium">{scoreLabel}</span>
        </div>
      </div>
    </Link>
  );
}
