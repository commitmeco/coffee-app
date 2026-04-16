import type { Metadata } from "next";
import QuizFlow from "@/components/QuizFlow";

export const metadata: Metadata = {
  title: "Flavor Profile Quiz — Coffee App",
  description: "Discover your coffee personality in 60 seconds.",
};

export default function QuizPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <QuizFlow />
    </div>
  );
}
