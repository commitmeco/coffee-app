"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useDiary } from "@/components/DiaryProvider";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { getBeanById } from "@/lib/beans";
import { getAllBadges, checkBadges } from "@/lib/badges";
import type { BadgeMap } from "@/lib/badges";
import type { QuizResult } from "@/lib/quiz";
import type { OrderList } from "@/lib/orders";

export default function ProfileView() {
  const { entries, hydrated } = useDiary();
  const [quizResult] = useLocalStorage<QuizResult | null>("coffee-quiz-result", null);
  const [orders] = useLocalStorage<OrderList>("coffee-orders", []);
  const [earnedBadges, setEarnedBadges] = useLocalStorage<BadgeMap>("coffee-badges", {});

  const allBadges = getAllBadges();
  const diaryEntries = Object.values(entries);

  // Check for new badges
  const { allBadges: updatedBadges } = useMemo(() => {
    if (!hydrated) return { newBadges: [], allBadges: earnedBadges };
    const result = checkBadges(entries, orders, quizResult, earnedBadges);
    if (result.newBadges.length > 0) {
      // Update badges (deferred to avoid render-during-render)
      setTimeout(() => setEarnedBadges(result.allBadges), 0);
    }
    return result;
  }, [entries, orders, quizResult, earnedBadges, hydrated, setEarnedBadges]);

  // Stats
  const stats = useMemo(() => {
    const countries = new Set(
      diaryEntries.map((e) => getBeanById(e.beanId)?.country).filter(Boolean)
    );
    const ratings = diaryEntries.filter((e) => e.rating);
    const avgRating = ratings.length > 0
      ? ratings.reduce((s, e) => s + (e.rating ?? 0), 0) / ratings.length
      : 0;

    return {
      beansTried: diaryEntries.length,
      countriesExplored: countries.size,
      avgRating: avgRating.toFixed(1),
      ordersPlaced: orders.length,
      lovedBeans: diaryEntries.filter((e) => e.status === "loved").length,
    };
  }, [diaryEntries, orders]);

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-40 rounded-2xl" />
        <div className="skeleton h-32 rounded-xl" />
        <div className="skeleton h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#0F0F0F] rounded-2xl p-8 text-center mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_var(--color-caramel-light)_0%,_transparent_50%)] opacity-15" />
        <div className="relative">
          {quizResult ? (
            <>
              <div className="text-5xl mb-3 animate-scale-in">{quizResult.profile.icon}</div>
              <h1 className="font-serif text-3xl font-bold text-[#E8E4E0] mb-1">{quizResult.profile.name}</h1>
              <p className="text-caramel-light font-medium">{quizResult.profile.tagline}</p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3">☕</div>
              <h1 className="font-serif text-3xl font-bold text-[#E8E4E0] mb-1">Coffee Explorer</h1>
              <p className="text-[#E8E4E0]/60">
                <Link href="/quiz" className="text-caramel-light hover:text-caramel underline">Take the quiz</Link>
                {" "}to discover your flavor personality
              </p>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Beans Tried", value: stats.beansTried, icon: "☕" },
          { label: "Countries", value: stats.countriesExplored, icon: "🌍" },
          { label: "Avg Rating", value: stats.avgRating, icon: "⭐" },
          { label: "Orders", value: stats.ordersPlaced, icon: "📦" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-4 text-center">
            <span className="text-2xl mb-1 block">{stat.icon}</span>
            <p className="font-serif text-2xl font-bold text-espresso">{stat.value}</p>
            <p className="text-xs text-roast-light">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-serif text-xl font-bold text-espresso">Badges</h2>
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-sm text-roast-light">
            {Object.keys(updatedBadges).length}/{allBadges.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {allBadges.map((badge) => {
            const earned = updatedBadges[badge.id];
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 text-center transition-all ${
                  earned
                    ? "bg-[var(--color-cream-light)] border-caramel/30 shadow-sm"
                    : "bg-white/[0.06]/30 border-[var(--color-border)] opacity-50"
                }`}
              >
                <span className={`text-3xl mb-2 block ${!earned ? "grayscale" : ""}`}>
                  {badge.icon}
                </span>
                <p className="text-xs font-medium text-espresso">{badge.name}</p>
                <p className="text-[10px] text-roast-light/60 mt-0.5">{badge.description}</p>
                {earned && (
                  <p className="text-[10px] text-sage mt-1 font-medium">
                    Earned {new Date(earned.earnedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/diary" className="px-5 py-2 rounded-full text-sm font-medium border-2 border-[var(--color-border)] text-espresso hover:border-caramel hover:text-caramel transition-all">
          My Diary
        </Link>
        <Link href="/orders" className="px-5 py-2 rounded-full text-sm font-medium border-2 border-[var(--color-border)] text-espresso hover:border-caramel hover:text-caramel transition-all">
          Orders
        </Link>
        <Link href="/social" className="px-5 py-2 rounded-full text-sm font-medium border-2 border-[var(--color-border)] text-espresso hover:border-caramel hover:text-caramel transition-all">
          Social Feed
        </Link>
      </div>
    </div>
  );
}
