"use client";

interface ActiveFilter {
  label: string;
  key: string;
  value: string;
}

interface ActiveFiltersProps {
  filters: ActiveFilter[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center animate-fade-in">
      {filters.map((f) => (
        <span
          key={f.key}
          className="inline-flex items-center gap-1.5 bg-caramel/10 border border-caramel/30 text-espresso rounded-full px-3 py-1 text-xs font-medium"
        >
          {f.label}: {f.value}
          <button
            onClick={() => onRemove(f.key)}
            className="hover:text-roast transition-colors ml-0.5"
            aria-label={`Remove ${f.label} filter`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      {filters.length >= 2 && (
        <button
          onClick={onClearAll}
          className="text-xs text-caramel hover:text-roast underline ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
