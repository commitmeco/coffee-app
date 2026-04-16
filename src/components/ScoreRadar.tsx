"use client";

import { useEffect, useState } from "react";
import { Bean } from "@/lib/beans";

interface ScoreRadarProps {
  scores: Bean["scores"];
}

const CUPPING_SCORES = [
  { key: "aroma", label: "Aroma" },
  { key: "flavor", label: "Flavor" },
  { key: "aftertaste", label: "Aftertaste" },
  { key: "acidity", label: "Acidity" },
  { key: "body", label: "Body" },
  { key: "balance", label: "Balance" },
] as const;

export default function ScoreRadar({ scores }: ScoreRadarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const size = 320;
  const center = size / 2;
  const radius = 120;

  const angleStep = (2 * Math.PI) / CUPPING_SCORES.length;

  function getPoint(index: number, value: number): [number, number] {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 10) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  // Build the data polygon
  const dataPoints = CUPPING_SCORES.map((s, i) => {
    const val = scores[s.key as keyof typeof scores] as number;
    return getPoint(i, val);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";

  // Grid rings
  const rings = [2, 4, 6, 8, 10];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] mx-auto">
      {/* Grid rings */}
      {rings.map((ring) => {
        const ringPoints = CUPPING_SCORES.map((_, i) => getPoint(i, ring));
        const ringPath = ringPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";
        return (
          <path
            key={ring}
            d={ringPath}
            fill="none"
            stroke="#2A2A2A"
            strokeWidth={ring === 10 ? 1.5 : 0.3}
          />
        );
      })}

      {/* Axis lines */}
      {CUPPING_SCORES.map((_, i) => {
        const [x, y] = getPoint(i, 10);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#2A2A2A"
            strokeWidth={0.3}
          />
        );
      })}

      {/* Data polygon with draw animation */}
      <path
        d={dataPath}
        fill="rgba(107, 158, 120, 0.15)"
        stroke="#6B9E78"
        strokeWidth={2.5}
        className={mounted ? "radar-polygon" : "opacity-0"}
      />

      {/* Data points with delayed fade-in */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={4}
          fill="#6B9E78"
          stroke="#141414"
          strokeWidth={2}
          className={mounted ? "radar-point" : "opacity-0"}
          style={{ animationDelay: `${0.9 + i * 0.05}s` }}
        />
      ))}

      {/* Labels */}
      {CUPPING_SCORES.map((s, i) => {
        const [x, y] = getPoint(i, 12.5);
        const val = scores[s.key as keyof typeof scores] as number;
        return (
          <text
            key={s.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[11px] fill-espresso-light font-medium"
          >
            {s.label} ({val.toFixed(1)})
          </text>
        );
      })}
    </svg>
  );
}
