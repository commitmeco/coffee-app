"use client";

/*
  BrewMethodCard — Card component for the brew guide listing page.

  Design decisions:
  - Matches existing card pattern: rounded-xl, bg-[var(--color-cream-light)], border-[var(--color-border)],
    hover elevation with -translate-y-1 and border glow (caramel)
  - Difficulty badge uses the score badge color logic:
    Beginner = sage, Intermediate = caramel, Advanced = espresso-light
  - Generous padding (p-6) per spacing philosophy
  - Serif font for method name, sans for everything else
*/

import Link from "next/link";
import type { BrewMethod } from "@/lib/brewMethods";

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: "bg-sage/20 text-sage-light",
  Intermediate: "bg-caramel/20 text-caramel-light",
  Advanced: "bg-white/[0.08] text-espresso",
};

const METHOD_ICONS: Record<string, string> = {
  pourover: "☕",
  frenchpress: "🫖",
  aeropress: "💨",
  espresso: "⚡",
  coldbrew: "🧊",
  mokapot: "🔥",
};

export default function BrewMethodCard({ method }: { method: BrewMethod }) {
  return (
    <Link href={`/brew-guide/${method.id}`}>
      <div className="group bg-[var(--color-cream-light)] border border-[var(--color-border)] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-caramel/40 cursor-pointer">
        {/* Icon + difficulty row */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl" role="img" aria-label={method.name}>
            {METHOD_ICONS[method.icon] || "☕"}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              DIFFICULTY_STYLES[method.difficulty] || DIFFICULTY_STYLES.Beginner
            }`}
          >
            {method.difficulty}
          </span>
        </div>

        {/* Method name */}
        <h3 className="font-serif text-xl font-semibold text-espresso mb-1 group-hover:text-caramel-light transition-colors">
          {method.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-espresso-light mb-4">{method.tagline}</p>

        {/* Quick stats */}
        <div className="flex gap-3 text-xs">
          <span className="bg-white/[0.06] text-espresso-light px-2.5 py-1 rounded-full">
            {method.brew_time}
          </span>
          <span className="bg-white/[0.06] text-espresso-light px-2.5 py-1 rounded-full">
            {method.grind_size}
          </span>
        </div>
      </div>
    </Link>
  );
}
