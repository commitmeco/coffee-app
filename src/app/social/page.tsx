import type { Metadata } from "next";
import SocialFeed from "@/components/SocialFeed";

export const metadata: Metadata = {
  title: "Social Feed — Coffee App",
  description: "See what the coffee community is brewing.",
};

export default function SocialPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <SocialFeed />
    </div>
  );
}
