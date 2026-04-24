"use client";

interface FiltersProps {
  countries: string[];
  processingMethods: string[];
  selectedCountry: string;
  selectedProcessing: string;
  selectedSort: string;
  minScore: string;
  onCountryChange: (value: string) => void;
  onProcessingChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onMinScoreChange: (value: string) => void;
}

const SCORE_OPTIONS = [
  { label: "All", value: "" },
  { label: "90+ Outstanding", value: "90" },
  { label: "85+ Excellent", value: "85" },
  { label: "80+ Very Good", value: "80" },
];

export default function Filters({
  countries,
  processingMethods,
  selectedCountry,
  selectedProcessing,
  selectedSort,
  minScore,
  onCountryChange,
  onProcessingChange,
  onSortChange,
  onMinScoreChange,
}: FiltersProps) {
  const selectClass =
    "appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full pl-4 pr-9 py-2 text-sm text-espresso cursor-pointer focus:outline-none focus:ring-2 focus:ring-caramel/30 focus:border-caramel bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23706860%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat";

  return (
    <div className="space-y-3">
      {/* Score pills */}
      <div className="flex gap-2 flex-wrap">
        {SCORE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onMinScoreChange(opt.value)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
              minScore === opt.value
                ? "bg-[#E8E4E0] text-[#0F0F0F] border-[#E8E4E0] shadow-sm"
                : "bg-[var(--color-surface)] text-espresso-light border-[var(--color-border)] hover:border-caramel hover:text-espresso"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Selects row */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className={selectClass}
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedProcessing}
          onChange={(e) => onProcessingChange(e.target.value)}
          className={selectClass}
        >
          <option value="">All Processing</option>
          {processingMethods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-roast-light/60 uppercase tracking-wide hidden sm:inline">Sort</span>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className={selectClass}
          >
            <option value="score-desc">Highest Score</option>
            <option value="score-asc">Lowest Score</option>
            <option value="country">Country A–Z</option>
            <option value="altitude">Highest Altitude</option>
          </select>
        </div>
      </div>
    </div>
  );
}
