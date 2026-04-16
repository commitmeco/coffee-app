import type { Bean } from "./beans";

// ── Roaster Names ──

const ROASTER_NAMES = [
  "Counter Culture Coffee",
  "Onyx Coffee Lab",
  "Verve Coffee Roasters",
  "Blue Bottle Coffee",
  "Stumptown Coffee",
  "Intelligentsia Coffee",
  "Heart Coffee Roasters",
  "Parlor Coffee",
  "Driftaway Coffee",
  "George Howell Coffee",
  "Ruby Coffee Roasters",
  "Brandywine Coffee",
  "Sey Coffee",
  "Little Wolf Coffee",
  "Methodical Coffee",
  "Tandem Coffee Roasters",
  "Ceremony Coffee",
  "Broadsheet Coffee",
  "Proud Mary Coffee",
  "Passenger Coffee",
];

// ── Deterministic Seed ──
// Use bean id as seed for consistent pricing across renders

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ── Price Generation ──

export function generatePrice(bean: Bean): number {
  const base = 14;

  // Score bonus: $0.50 per point above 80
  const scoreBonus = Math.max(0, bean.scores.total - 80) * 0.5;

  // Origin premium
  const premiumOrigins: Record<string, number> = {
    Ethiopia: 2,
    Kenya: 2,
    Panama: 4,
    "Costa Rica": 1.5,
    Colombia: 1,
    Guatemala: 1,
    Rwanda: 1.5,
    Japan: 5,
    Taiwan: 3,
  };
  const originBonus = premiumOrigins[bean.country] ?? 0;

  // Altitude bonus
  const altBonus = (bean.altitude_meters ?? 0) > 1800 ? 1 : 0;

  // Small deterministic variance so every bean isn't exactly the same
  const variance = (seededRandom(bean.id) - 0.5) * 2; // -1 to +1

  const raw = base + scoreBonus + originBonus + altBonus + variance;

  // Round to .50 increments, clamp between $12 and $38
  return Math.max(12, Math.min(38, Math.round(raw * 2) / 2));
}

// ── Roast Level ──

export function assignRoastLevel(bean: Bean): "Light" | "Medium" | "Dark" {
  const { acidity, body } = bean.scores;
  if (acidity >= 8.0 && body < 7.8) return "Light";
  if (body >= 8.2 && acidity < 7.8) return "Dark";
  return "Medium";
}

// ── Roaster Assignment ──

export function assignRoaster(bean: Bean): string {
  const idx = Math.floor(seededRandom(bean.id + 7) * ROASTER_NAMES.length);
  return ROASTER_NAMES[idx];
}

// ── Stock Status ──

export function isInStock(bean: Bean): boolean {
  // ~90% of beans in stock
  return seededRandom(bean.id + 13) > 0.1;
}

// ── Size Multipliers ──

export const SIZE_MULTIPLIERS: Record<string, number> = {
  "8oz": 0.75,
  "12oz": 1,
  "2lb": 2.2,
};

export type BagSize = "8oz" | "12oz" | "2lb";
export type GrindType = "whole" | "coarse" | "medium" | "fine";

export function getPriceForSize(basePrice: number, size: BagSize): number {
  return Math.round(basePrice * SIZE_MULTIPLIERS[size] * 100) / 100;
}
