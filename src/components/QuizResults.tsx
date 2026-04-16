"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getBeanById } from "@/lib/beans";
import type { QuizResult } from "@/lib/quiz";
import { useCart } from "@/components/CartProvider";
import BeanCard from "./BeanCard";

interface QuizResultsProps {
  result: QuizResult;
  onRetake: () => void;
}

export default function QuizResults({ result, onRetake }: QuizResultsProps) {
  const { profile, recommendedBeanIds } = result;
  const { addItem } = useCart();
  const [bundleAdded, setBundleAdded] = useState(false);

  const beans = useMemo(
    () =>
      recommendedBeanIds
        .map((id) => getBeanById(id))
        .filter((b): b is NonNullable<typeof b> => b !== undefined),
    [recommendedBeanIds]
  );

  const bundleTotal = beans.reduce((sum, b) => sum + b.price, 0);

  function handleBuyBundle() {
    for (const bean of beans) {
      if (bean.in_stock) {
        addItem(bean.id, "whole", "12oz", bean.price);
      }
    }
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2500);
  }

  return (
    <div className="animate-fade-in-up">
      {/* Profile header */}
      <div className="bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0F0F0F] rounded-2xl p-8 md:p-10 text-center mb-10 relative overflow-hidden">
        {/* Subtle radial accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-caramel-light)_0%,_transparent_50%)] opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_var(--color-sage)_0%,_transparent_40%)] opacity-10" />

        <div className="relative">
          <div className="text-5xl mb-3 animate-scale-in">{profile.icon}</div>
          <p className="text-sm text-[#E8E4E0]/50 uppercase tracking-widest mb-2 animate-fade-in stagger-1">
            Your Coffee Personality
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#E8E4E0] mb-2 animate-fade-in-up stagger-2">
            {profile.name}
          </h1>
          <p className="text-lg text-caramel-light font-medium animate-fade-in stagger-3">
            {profile.tagline}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-6 md:p-8 mb-10 animate-fade-in-up stagger-2">
        <p className="text-roast leading-relaxed text-base">
          {profile.description}
        </p>
      </div>

      {/* Recommended beans */}
      {beans.length > 0 && (
        <section className="mb-10 animate-fade-in-up stagger-3">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-xl font-bold text-espresso">
              Beans We Think You&apos;ll Love
            </h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {beans.map((bean, i) => (
              <div key={bean.id} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
                <BeanCard bean={bean} />
              </div>
            ))}
          </div>

          {/* Buy bundle */}
          <div className="mt-6 text-center">
            <button
              onClick={handleBuyBundle}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                bundleAdded
                  ? "bg-sage text-white"
                  : "bg-[#E8E4E0] text-[#0F0F0F] hover:bg-white/80 shadow-md hover:shadow-lg"
              }`}
            >
              {bundleAdded
                ? "Bundle Added to Cart!"
                : `Buy Your ${profile.name} Bundle — $${bundleTotal.toFixed(2)}`}
            </button>
            <p className="text-xs text-roast-light/60 mt-2">
              All {beans.length} recommended beans, 12oz whole bean
            </p>
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
        <button
          onClick={onRetake}
          className="px-6 py-2.5 rounded-full text-sm font-medium border-2 border-white/[0.06] text-espresso hover:border-caramel hover:text-caramel transition-all"
        >
          Retake Quiz
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-sm font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
        >
          Browse All Beans
        </Link>
      </div>
    </div>
  );
}
