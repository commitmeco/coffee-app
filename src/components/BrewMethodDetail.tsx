"use client";

/*
  BrewMethodDetail — Full brew method page content.

  Design decisions:
  - Uses the same dark card style for the parameter grid and steps
  - Steps use numbered circles with caramel accent — feels like a guided flow
  - "Best for" and "Flavor impact" sections use sage/caramel tints
    to visually separate recommendations from instructions
  - Equipment list uses the pill pattern from BeanCard detail tags
  - Back link at top for easy navigation
*/

import Link from "next/link";
import type { BrewMethod } from "@/lib/brewMethods";

const METHOD_ICONS: Record<string, string> = {
  pourover: "☕",
  frenchpress: "🫖",
  aeropress: "💨",
  espresso: "⚡",
  coldbrew: "🧊",
  mokapot: "🔥",
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: "bg-sage/20 text-sage-light",
  Intermediate: "bg-caramel/20 text-caramel-light",
  Advanced: "bg-white/[0.08] text-espresso",
};

export default function BrewMethodDetail({ method }: { method: BrewMethod }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/brew-guide"
        className="inline-flex items-center gap-1.5 text-sm text-espresso-light hover:text-caramel-light transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All brew methods
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl" role="img" aria-label={method.name}>
            {METHOD_ICONS[method.icon] || "☕"}
          </span>
          <div>
            <h1 className="font-serif text-3xl font-bold text-espresso">
              {method.name}
            </h1>
            <p className="text-espresso-light mt-1">{method.tagline}</p>
          </div>
        </div>
        <span
          className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
            DIFFICULTY_STYLES[method.difficulty] || DIFFICULTY_STYLES.Beginner
          }`}
        >
          {method.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-espresso-light leading-relaxed mb-8">
        {method.description}
      </p>

      {/* Parameters grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: "Brew time", value: method.brew_time },
          { label: "Grind size", value: method.grind_size },
          { label: "Water temp", value: method.water_temp },
          { label: "Ratio", value: method.ratio },
        ].map((param) => (
          <div
            key={param.label}
            className="bg-[var(--color-cream-light)] border border-[var(--color-border)] rounded-xl p-4"
          >
            <div className="text-xs text-roast-light mb-1">{param.label}</div>
            <div className="text-sm font-medium text-espresso">{param.value}</div>
          </div>
        ))}
      </div>

      {/* Equipment */}
      <div className="mb-10">
        <h2 className="font-serif text-xl font-semibold text-espresso mb-4">
          What you'll need
        </h2>
        <div className="flex flex-wrap gap-2">
          {method.equipment.map((item) => (
            <span
              key={item}
              className="bg-white/[0.06] text-espresso-light text-sm px-3 py-1.5 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="mb-10">
        <h2 className="font-serif text-xl font-semibold text-espresso mb-6">
          How to brew
        </h2>
        <div className="space-y-4">
          {method.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-caramel/20 text-caramel-light text-sm font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </div>
              <p className="text-espresso-light leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best for + Flavor impact */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="bg-sage/10 border border-sage/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-sage-light mb-2">
            Best for these beans
          </h3>
          <p className="text-sm text-espresso-light leading-relaxed">
            {method.best_for}
          </p>
        </div>
        <div className="bg-caramel/10 border border-caramel/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-caramel-light mb-2">
            What it does to flavor
          </h3>
          <p className="text-sm text-espresso-light leading-relaxed">
            {method.flavor_impact}
          </p>
        </div>
      </div>

      {/* CTA to browse beans */}
      <div className="text-center pt-4 pb-8">
        <p className="text-roast-light text-sm mb-3">
          Ready to try this method?
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-caramel hover:bg-caramel-light text-[#0F0F0F] font-medium px-6 py-3 rounded-full transition-colors"
        >
          Browse beans for this method
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
