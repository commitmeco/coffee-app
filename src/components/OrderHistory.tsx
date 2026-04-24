"use client";

import Link from "next/link";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { getBeanById, getCountryFlag } from "@/lib/beans";
import type { OrderList } from "@/lib/orders";
import { getStatusLabel, getStatusColor } from "@/lib/orders";

export default function OrderHistory() {
  const [orders, , hydrated] = useLocalStorage<OrderList>("coffee-orders", []);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-40 rounded-xl" />
        <div className="skeleton h-40 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="font-serif text-3xl font-bold text-espresso mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">📦</span>
          <p className="font-serif text-xl font-bold text-espresso mb-2">No orders yet</p>
          <p className="text-sm text-roast-light mb-6">Your completed orders will appear here</p>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
          >
            Browse Beans
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] overflow-hidden animate-fade-in-up"
            >
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-[var(--color-border)] bg-white/[0.06]/20">
                <div>
                  <p className="font-mono text-sm font-bold text-espresso">{order.id}</p>
                  <p className="text-xs text-roast-light mt-0.5">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <span className="font-bold text-espresso">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Items */}
              <div className="p-5 space-y-3">
                {order.items.map((item, i) => {
                  const bean = getBeanById(item.beanId);
                  if (!bean) return null;
                  return (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <Link
                          href={`/beans/${bean.id}`}
                          className="text-espresso hover:text-caramel transition-colors truncate"
                        >
                          {getCountryFlag(bean.country)} {bean.country} — {bean.region}
                        </Link>
                        <span className="text-xs text-roast-light/60 shrink-0">
                          x{item.quantity}
                        </span>
                      </div>
                      <span className="text-espresso font-medium shrink-0 ml-4">
                        ${(item.pricePerUnit * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Ship to */}
              <div className="px-5 pb-4 text-xs text-roast-light">
                Shipped to {order.shippingInfo.name}, {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
