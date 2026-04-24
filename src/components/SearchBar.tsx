"use client";

import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SUGGESTIONS = ["Ethiopia", "Washed", "Bourbon", "Gesha", "Natural"];

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-roast-light/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        placeholder="Search by country, region, variety..."
        className="w-full pl-11 pr-10 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-espresso placeholder:text-roast-light/40 focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel focus:shadow-md"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-roast-light/60 hover:text-espresso hover:bg-white/[0.06]"
          aria-label="Clear search"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Quick suggestions */}
      {focused && !value && (
        <div className="absolute top-full left-0 right-0 mt-2 px-4 py-2 flex flex-wrap gap-2 animate-fade-in">
          <span className="text-xs text-roast-light/60">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onChange(s)}
              className="text-xs text-caramel hover:text-roast font-medium hover:underline"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
