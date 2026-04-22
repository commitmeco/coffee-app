import type { Metadata } from "next";
import CheckoutFlow from "@/components/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout — Coffee App",
  description: "Complete your coffee bean order.",
};

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <CheckoutFlow />
    </div>
  );
}
