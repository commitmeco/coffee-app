"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bean } from "@/lib/beans";
import { useDiary } from "@/components/DiaryProvider";
import BeanCard from "./BeanCard";
import type { DiaryStatus } from "@/lib/diary";

const STATUS_FILTERS: { value: DiaryStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "loved", label: "Loved" },
  { value: "tried", label: "Tried" },
  { value: "want-to-try", label: "Want to Try" },
];

export default function DiaryView({ beans }: { beans: Bean[] }) {
  const { entries, hydrated } = useDiary();
  const [statusFilter, setStatusFilter] = useState<DiaryStatus | "all">("all");

  const beanMap = useMemo(() => {
    const map = new Map<number, Bean>();
    beans.forEach((b) => map.set(b.id, b));
    return map;
  }, [beans]);

  const diaryBeans = useMemo(() => {
    return Object.values(entries)
      .filter((entry) => statusFilter === "all" || entry.status === statusFilter)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((entry) => ({
        entry,
        bean: beanMap.get(entry.beanId),
      }))
      .filter((item): item is { entry: typeof item.entry; bean: Bean } => item.bean !== undefined);
  }, [entries, statusFilter, beanMap]);

  const entryCount = Object.keys(entries).length;

  if (!hydrated) {
    return (
      <div>
        <div className="skeleton h-10 w-64 mb-4" />
        <div className="skeleton h-5 w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-52 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <h1 className="font-serif text-3xl font-bold text-espresso">My Coffee Diary</h1>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <p className="text-sm text-roast-light">
          {entryCount} bean{entryCount !== 1 ? "s" : ""}
        </p>
      </div>
      <p className="text-roast-light mb-8">
        Your personal coffee tasting journal.
      </p>

      {/* Status filter pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {STATUS_FILTERS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatusFilter(opt.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
              statusFilter === opt.value
                ? "bg-[#E8E4E0] text-[#0F0F0F] border-[#E8E4E0] shadow-sm"
                : "bg-[#141414] text-espresso-light border-white/[0.06] hover:border-caramel hover:text-espresso"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {diaryBeans.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-5xl mb-4">📓</div>
          <p className="text-xl font-serif text-espresso mb-2">
            {entryCount === 0 ? "Your diary is empty" : "No beans match this filter"}
          </p>
          <p className="text-sm text-roast-light/70 max-w-md mx-auto mb-6">
            {entryCount === 0
              ? "Browse beans and mark them as tried, loved, or want to try."
              : "Try selecting a different status filter."}
          </p>
          {entryCount === 0 && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8E4E0] text-[#0F0F0F] rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
            >
              Browse Beans
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {diaryBeans.map(({ bean, entry }, i) => (
            <div key={entry.beanId} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
              <BeanCard bean={bean} />
              {entry.notes && (
                <p className="mt-1.5 px-2 text-xs text-roast-light/70 italic line-clamp-2">
                  &ldquo;{entry.notes}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
