"use client";

import { useState, useEffect } from "react";
import { useDiary } from "@/components/DiaryProvider";
import type { DiaryStatus } from "@/lib/diary";

const STATUS_OPTIONS: {
  value: DiaryStatus;
  label: string;
  icon: React.ReactNode;
  activeClass: string;
}[] = [
  {
    value: "tried",
    label: "Tried",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    activeClass: "bg-sage text-white border-sage",
  },
  {
    value: "loved",
    label: "Loved",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    activeClass: "bg-rose-500 text-white border-rose-500",
  },
  {
    value: "want-to-try",
    label: "Want to Try",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    activeClass: "bg-honey text-espresso border-honey",
  },
];

export default function DiaryControls({ beanId }: { beanId: number }) {
  const { getEntry, setEntry, updateNotes, removeEntry, hydrated } = useDiary();
  const entry = getEntry(beanId);
  const [notes, setNotes] = useState("");

  // Sync notes from entry when it loads/changes
  useEffect(() => {
    if (entry) {
      setNotes(entry.notes);
    }
  }, [entry]);

  if (!hydrated) {
    return (
      <div className="bg-white rounded-xl border border-cream-dark p-8 mt-8 animate-fade-in">
        <div className="skeleton h-6 w-48 mb-4" />
        <div className="flex gap-2">
          <div className="skeleton h-10 w-24 rounded-full" />
          <div className="skeleton h-10 w-24 rounded-full" />
          <div className="skeleton h-10 w-32 rounded-full" />
        </div>
      </div>
    );
  }

  function handleStatusClick(status: DiaryStatus) {
    if (entry?.status === status) {
      removeEntry(beanId);
      setNotes("");
    } else {
      setEntry(beanId, status, notes);
    }
  }

  function handleNotesBlur() {
    if (entry) {
      updateNotes(beanId, notes);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-cream-dark p-8 mt-8 animate-fade-in-up stagger-3">
      <h2 className="font-serif text-xl font-bold text-espresso mb-4">
        Your Coffee Diary
      </h2>

      {/* Status buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleStatusClick(opt.value)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              entry?.status === opt.value
                ? opt.activeClass + " shadow-sm"
                : "bg-white text-espresso-light border-cream-dark hover:border-caramel hover:text-espresso"
            }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>

      {/* Notes textarea */}
      {entry ? (
        <div className="animate-fade-in">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleNotesBlur}
            placeholder="Add your personal notes about this coffee..."
            rows={3}
            className="w-full rounded-lg border border-cream-dark px-4 py-3 text-sm text-espresso placeholder:text-roast-light/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-roast-light/60">
              Added {entry.date}
            </p>
            <button
              onClick={() => {
                removeEntry(beanId);
                setNotes("");
              }}
              className="text-xs text-roast-light/60 hover:text-roast transition-colors"
            >
              Remove from diary
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-roast-light/60 italic">
          Select a status to add this bean to your diary.
        </p>
      )}
    </div>
  );
}
