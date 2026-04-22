"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import activityData from "@/data/social_activity.json";
import { getBeanById, getCountryFlag } from "@/lib/beans";
import { getBadgeById } from "@/lib/badges";

interface ActivityItem {
  id: string;
  userName: string;
  userAvatar: string;
  userProfile: string;
  action: "tried" | "loved" | "reviewed" | "ordered" | "badge";
  beanId?: number;
  badgeId?: string;
  rating?: number;
  comment?: string;
  date: string;
  toasts: number;
}

const mockActivity: ActivityItem[] = activityData as ActivityItem[];

function getActionLabel(action: string): string {
  switch (action) {
    case "tried": return "tried";
    case "loved": return "loved";
    case "reviewed": return "reviewed";
    case "ordered": return "ordered";
    case "badge": return "earned a badge";
    default: return action;
  }
}

function getActionEmoji(action: string): string {
  switch (action) {
    case "tried": return "☕";
    case "loved": return "❤️";
    case "reviewed": return "📝";
    case "ordered": return "📦";
    case "badge": return "🏅";
    default: return "☕";
  }
}

function timeAgo(dateStr: string): string {
  const ms = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

export default function SocialFeed() {
  const [toastCounts, setToastCounts] = useState<Record<string, number>>({});

  const items = useMemo(() => {
    return [...mockActivity].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  function handleToast(itemId: string) {
    setToastCounts((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] ?? 0) + 1,
    }));
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-2">
          Community Feed
        </h1>
        <p className="text-roast-light">
          See what the coffee community is brewing
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const bean = item.beanId ? getBeanById(item.beanId) : null;
          const badge = item.badgeId ? getBadgeById(item.badgeId) : null;
          const extraToasts = toastCounts[item.id] ?? 0;

          return (
            <div
              key={item.id}
              className="bg-[#141414] rounded-xl border border-white/[0.06] p-5 animate-fade-in-up"
            >
              {/* User header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{item.userAvatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-espresso">{item.userName}</span>
                    <span className="text-xs text-roast-light/60">{getActionEmoji(item.action)} {getActionLabel(item.action)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-roast-light/50">
                    <span>{item.userProfile}</span>
                    <span>·</span>
                    <span>{timeAgo(item.date)}</span>
                  </div>
                </div>
              </div>

              {/* Comment */}
              {item.comment && (
                <p className="text-sm text-roast mb-3 leading-relaxed">{item.comment}</p>
              )}

              {/* Rating */}
              {item.rating && (
                <div className="flex items-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= item.rating! ? "text-honey" : "text-white/10"}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              )}

              {/* Bean preview */}
              {bean && (
                <Link
                  href={`/beans/${bean.id}`}
                  className="block bg-white/[0.06]/30 rounded-lg p-3 hover:bg-white/[0.06]/50 transition-colors mb-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-espresso">
                        {getCountryFlag(bean.country)} {bean.country} — {bean.region}
                      </p>
                      <p className="text-xs text-roast-light">{bean.processing_method}</p>
                    </div>
                    <span className="text-xs font-bold text-espresso bg-[#141414] px-2 py-1 rounded-full">
                      {bean.scores.total.toFixed(1)}
                    </span>
                  </div>
                </Link>
              )}

              {/* Badge preview */}
              {badge && (
                <div className="bg-white/[0.06]/30 rounded-lg p-3 mb-3 flex items-center gap-3">
                  <span className="text-3xl">{badge.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-espresso">{badge.name}</p>
                    <p className="text-xs text-roast-light">{badge.description}</p>
                  </div>
                </div>
              )}

              {/* Toast button */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]/50">
                <button
                  onClick={() => handleToast(item.id)}
                  className="flex items-center gap-1.5 text-sm text-roast-light hover:text-caramel transition-colors group"
                >
                  <span className="group-hover:scale-110 transition-transform">☕</span>
                  <span>Toast</span>
                </button>
                <span className="text-xs text-roast-light/60">
                  {item.toasts + extraToasts} toast{(item.toasts + extraToasts) !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
