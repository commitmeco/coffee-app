"use client";

interface QuizProgressProps {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = ((current + 1) / total) * 100;

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-roast-light">
          Question {current + 1} of {total}
        </span>
        <span className="text-xs text-roast-light/60">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-caramel rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
