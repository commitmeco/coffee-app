export type DiaryStatus = "tried" | "loved" | "want-to-try";

export type BrewMethod = "Pour-over" | "French Press" | "Espresso" | "Drip" | "AeroPress" | "Cold Brew";

export const BREW_METHODS: BrewMethod[] = [
  "Pour-over", "French Press", "Espresso", "Drip", "AeroPress", "Cold Brew",
];

export interface DiaryEntry {
  beanId: number;
  status: DiaryStatus;
  notes: string;
  date: string; // ISO date string, e.g. "2026-04-03"
  rating?: number; // 1-5 stars
  brewMethod?: BrewMethod;
  isPublic?: boolean; // share to social feed
}

// Keyed by bean ID for O(1) lookup
export type DiaryMap = Record<number, DiaryEntry>;
