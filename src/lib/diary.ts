export type DiaryStatus = "tried" | "loved" | "want-to-try";

export interface DiaryEntry {
  beanId: number;
  status: DiaryStatus;
  notes: string;
  date: string; // ISO date string, e.g. "2026-04-03"
}

// Keyed by bean ID for O(1) lookup
export type DiaryMap = Record<number, DiaryEntry>;
