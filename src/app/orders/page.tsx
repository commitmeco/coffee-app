import type { Metadata } from "next";
import OrderHistory from "@/components/OrderHistory";

export const metadata: Metadata = {
  title: "Order History — Coffee App",
  description: "View your past coffee bean orders.",
};

export default function OrdersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <OrderHistory />
    </div>
  );
}
