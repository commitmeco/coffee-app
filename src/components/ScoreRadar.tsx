"use client";

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
  const size = 280;
  const center = size / 2;
  const radius = 110;

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
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* Grid rings */}
      {rings.map((ring) => {
        const ringPoints = CUPPING_SCORES.map((_, i) => getPoint(i, ring));
        const ringPath = ringPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";
        return (
          <path
            key={ring}
            d={ringPath}
            fill="none"
            stroke="#E8E0D8"
            strokeWidth={ring === 10 ? 1.5 : 0.5}
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
            stroke="#E8E0D8"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Data polygon */}
      <path d={dataPath} fill="rgba(122, 139, 111, 0.25)" stroke="#7A8B6F" strokeWidth={2} />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="#7A8B6F" stroke="white" strokeWidth={1.5} />
      ))}

      {/* Labels */}
      {CUPPING_SCORES.map((s, i) => {
        const [x, y] = getPoint(i, 12);
        const val = scores[s.key as keyof typeof scores] as number;
        return (
          <text
            key={s.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[10px] fill-espresso-light font-medium"
          >
            {s.label} ({val.toFixed(1)})
          </text>
        );
      })}
    </svg>
  );
}
