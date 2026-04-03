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
    "px-3 py-2 rounded-lg border border-cream-dark bg-white text-espresso text-sm focus:outline-none focus:ring-2 focus:ring-caramel/40 focus:border-caramel transition-colors";

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All Countries</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={selectedProcessing}
        onChange={(e) => onProcessingChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All Processing</option>
        {processingMethods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={minScore}
        onChange={(e) => onMinScoreChange(e.target.value)}
        className={selectClass}
      >
        <option value="">Any Score</option>
        <option value="90">90+ Outstanding</option>
        <option value="85">85+ Excellent</option>
        <option value="80">80+ Very Good</option>
      </select>

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
  );
}
