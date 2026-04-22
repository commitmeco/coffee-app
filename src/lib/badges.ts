import badgesData from "@/data/badges.json";
import { getBeanById } from "./beans";
import type { DiaryMap } from "./diary";
import type { OrderList } from "./orders";
import type { QuizResult } from "./quiz";

// ── Types ──

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "exploration" | "tasting" | "social" | "shopping";
  requirement: { type: string; count: number };
}

export interface EarnedBadge {
  badgeId: string;
  earnedAt: string;
}

export type BadgeMap = Record<string, EarnedBadge>;

const badges: Badge[] = badgesData as Badge[];

// ── Data Access ──

export function getAllBadges(): Badge[] {
  return badges;
}

export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}

// ── Badge Checking ──

export function checkBadges(
  diary: DiaryMap,
  orders: OrderList,
  quizResult: QuizResult | null,
  currentBadges: BadgeMap
): { newBadges: string[]; allBadges: BadgeMap } {
  const entries = Object.values(diary);
  const newBadges: string[] = [];
  const allBadges = { ...currentBadges };
  const now = new Date().toISOString();

  for (const badge of badges) {
    if (allBadges[badge.id]) continue; // already earned

    let earned = false;
    const { type, count } = badge.requirement;

    switch (type) {
      case "diary_count":
        earned = entries.length >= count;
        break;

      case "countries": {
        const countries = new Set(
          entries.map((e) => getBeanById(e.beanId)?.country).filter(Boolean)
        );
        earned = countries.size >= count;
        break;
      }

      case "high_score":
        earned = entries.some((e) => {
          const bean = getBeanById(e.beanId);
          return bean && bean.scores.total >= count;
        });
        break;

      case "quiz_complete":
        earned = quizResult !== null;
        break;

      case "order_count":
        earned = orders.length >= count;
        break;

      case "processing_methods": {
        const methods = new Set(
          entries.map((e) => getBeanById(e.beanId)?.processing_method).filter(Boolean)
        );
        earned = methods.size >= count;
        break;
      }

      case "altitude":
        earned = entries.some((e) => {
          const bean = getBeanById(e.beanId);
          return bean && (bean.altitude_meters ?? 0) >= count;
        });
        break;

      case "ratings_count":
        earned = entries.filter((e) => e.rating && e.rating > 0).length >= count;
        break;

      case "loved_count":
        earned = entries.filter((e) => e.status === "loved").length >= count;
        break;
    }

    if (earned) {
      allBadges[badge.id] = { badgeId: badge.id, earnedAt: now };
      newBadges.push(badge.id);
    }
  }

  return { newBadges, allBadges };
}
