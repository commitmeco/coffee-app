import type { Metadata } from "next";
import ShopExplorer from "@/components/ShopExplorer";

export const metadata: Metadata = {
  title: "Coffee Shops — Coffee App",
  description: "Discover specialty coffee shops near you.",
};

export default function ShopsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ShopExplorer />
    </div>
  );
}
