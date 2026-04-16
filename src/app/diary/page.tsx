import type { Metadata } from "next";
import { getAllBeans } from "@/lib/beans";
import DiaryView from "@/components/DiaryView";

export const metadata: Metadata = {
  title: "My Coffee Diary — Coffee App",
  description: "Your personal coffee tasting journal.",
};

export default function DiaryPage() {
  const beans = getAllBeans();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <DiaryView beans={beans} />
    </div>
  );
}
