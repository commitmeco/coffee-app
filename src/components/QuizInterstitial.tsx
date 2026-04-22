"use client";

import { useEffect, useState } from "react";

export default function QuizInterstitial() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2500;

    function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      {/* Spinning coffee emoji */}
      <div className="text-6xl mb-8 animate-spin-slow">
        ☕
      </div>

      {/* Message */}
      <h2 className="font-serif text-2xl font-bold text-espresso mb-2">
        Brewing your results
        <span className="dot-pulse">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h2>
      <p className="text-sm text-roast-light mb-8">
        Matching your palate to 1,338 beans
      </p>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-caramel rounded-full transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
