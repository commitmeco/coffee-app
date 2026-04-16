import type { Metadata } from "next";
import ProfileView from "@/components/ProfileView";

export const metadata: Metadata = {
  title: "Profile — Coffee App",
  description: "Your coffee profile, badges, and stats.",
};

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <ProfileView />
    </div>
  );
}
