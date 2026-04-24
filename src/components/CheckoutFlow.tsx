"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { getBeanById, getCountryFlag } from "@/lib/beans";
import type { Order, OrderList, ShippingInfo } from "@/lib/orders";
import { generateOrderId } from "@/lib/orders";

type Step = "review" | "shipping" | "payment" | "confirmation";
const STEPS: { key: Step; label: string }[] = [
  { key: "review", label: "Review" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Done" },
];

export default function CheckoutFlow() {
  const { items, hydrated, cartTotal, shippingCost, updateQuantity, removeItem, clearCart } = useCart();
  const [orders, setOrders] = useLocalStorage<OrderList>("coffee-orders", []);
  const [step, setStep] = useState<Step>("review");
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "", address: "", city: "", state: "", zip: "",
  });
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const itemEntries = Object.entries(items);
  const currentStepIndex = STEPS.findIndex((s) => s.key === step);
  const total = cartTotal + shippingCost;

  const handlePlaceOrder = useCallback(() => {
    const order: Order = {
      id: generateOrderId(),
      items: Object.values(items),
      subtotal: cartTotal,
      shipping: shippingCost,
      total,
      shippingInfo: shipping,
      date: new Date().toISOString(),
      status: "confirmed",
    };
    setOrders((prev) => [order, ...prev]);
    setCompletedOrder(order);
    clearCart();
    setStep("confirmation");
  }, [items, cartTotal, shippingCost, total, shipping, setOrders, clearCart]);

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-64 rounded-xl" />
      </div>
    );
  }

  // Empty cart redirect
  if (itemEntries.length === 0 && step !== "confirmation") {
    return (
      <div className="text-center py-20 animate-fade-in">
        <span className="text-5xl mb-4 block">🛒</span>
        <h1 className="font-serif text-2xl font-bold text-espresso mb-2">Your cart is empty</h1>
        <p className="text-roast-light mb-6">Add some beans to get started</p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full text-sm font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
        >
          Browse Beans
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Demo banner */}
      <div className="bg-honey/10 border border-honey/30 rounded-xl px-4 py-3 mb-8 flex items-center gap-3">
        <span className="text-lg">🧪</span>
        <p className="text-sm text-roast">
          <strong>Demo Mode</strong> — This is a simulated checkout. No real charges will be made.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < currentStepIndex
                    ? "bg-sage text-white"
                    : i === currentStepIndex
                      ? "bg-caramel text-white shadow-md"
                      : "bg-white/[0.06] text-roast-light"
                }`}
              >
                {i < currentStepIndex ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-xs mt-1.5 font-medium ${i <= currentStepIndex ? "text-espresso" : "text-roast-light/60"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full ${i < currentStepIndex ? "bg-sage" : "bg-white/[0.06]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step: Review */}
      {step === "review" && (
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-2xl font-bold text-espresso mb-6">Review Your Order</h1>
          <div className="space-y-3 mb-6">
            {itemEntries.map(([key, item]) => {
              const bean = getBeanById(item.beanId);
              if (!bean) return null;
              return (
                <div key={key} className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-espresso text-sm">
                      {getCountryFlag(bean.country)} {bean.country} — {bean.region}
                    </p>
                    <p className="text-xs text-roast-light mt-0.5">
                      {item.size} / {item.grind} / Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(key, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center text-xs hover:border-caramel transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(key, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-[var(--color-border)] flex items-center justify-center text-xs hover:border-caramel transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-bold text-espresso w-16 text-right">
                      ${(item.pricePerUnit * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(key)}
                      className="text-roast-light/40 hover:text-roast transition-colors"
                      aria-label="Remove"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-5 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-roast">Subtotal</span>
              <span className="text-espresso">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-roast">Shipping</span>
              <span className="text-espresso">{shippingCost === 0 ? <span className="text-sage font-medium">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-espresso pt-3 border-t border-[var(--color-border)]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setStep("shipping")}
            className="w-full py-3 rounded-full font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
          >
            Continue to Shipping
          </button>
        </div>
      )}

      {/* Step: Shipping */}
      {step === "shipping" && (
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-2xl font-bold text-espresso mb-6">Shipping Address</h1>
          <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-6 space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-espresso block mb-1.5">Full Name</label>
              <input
                type="text"
                value={shipping.name}
                onChange={(e) => setShipping((s) => ({ ...s, name: e.target.value }))}
                className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-espresso block mb-1.5">Address</label>
              <input
                type="text"
                value={shipping.address}
                onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))}
                className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                placeholder="123 Coffee Lane"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-espresso block mb-1.5">City</label>
                <input
                  type="text"
                  value={shipping.city}
                  onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
                  className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                  placeholder="Portland"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-espresso block mb-1.5">State</label>
                  <input
                    type="text"
                    value={shipping.state}
                    onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))}
                    className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                    placeholder="OR"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-espresso block mb-1.5">ZIP</label>
                  <input
                    type="text"
                    value={shipping.zip}
                    onChange={(e) => setShipping((s) => ({ ...s, zip: e.target.value }))}
                    className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                    placeholder="97201"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("review")}
              className="px-6 py-3 rounded-full text-sm font-medium border-2 border-[var(--color-border)] text-espresso hover:border-caramel transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep("payment")}
              disabled={!shipping.name || !shipping.address || !shipping.city || !shipping.state || !shipping.zip}
              className={`flex-1 py-3 rounded-full font-medium transition-all ${
                shipping.name && shipping.address && shipping.city && shipping.state && shipping.zip
                  ? "bg-caramel text-white hover:bg-caramel-light shadow-sm"
                  : "bg-white/[0.06] text-roast-light/50 cursor-not-allowed"
              }`}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Step: Payment */}
      {step === "payment" && (
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-2xl font-bold text-espresso mb-6">Payment</h1>

          <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-6 space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-espresso block mb-1.5">Card Number</label>
              <input
                type="text"
                className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                placeholder="4242 4242 4242 4242"
                defaultValue="4242 4242 4242 4242"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-espresso block mb-1.5">Expiry</label>
                <input
                  type="text"
                  className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                  placeholder="12/28"
                  defaultValue="12/28"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-espresso block mb-1.5">CVV</label>
                <input
                  type="text"
                  className="w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-espresso focus:outline-none focus:border-caramel"
                  placeholder="123"
                  defaultValue="123"
                />
              </div>
            </div>
            <p className="text-xs text-roast-light/60 italic">
              Demo mode — any values will work. No real payment is processed.
            </p>
          </div>

          {/* Order summary */}
          <div className="bg-white/[0.06]/50 rounded-xl p-5 mb-6">
            <p className="text-sm font-medium text-espresso mb-2">Order Summary</p>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-roast">{Object.values(items).reduce((s, i) => s + i.quantity, 0)} items</span>
              <span className="text-espresso">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-roast">Shipping</span>
              <span className="text-espresso">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-[var(--color-border)]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("shipping")}
              className="px-6 py-3 rounded-full text-sm font-medium border-2 border-[var(--color-border)] text-espresso hover:border-caramel transition-all"
            >
              Back
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex-1 py-3 rounded-full font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm hover:shadow-md"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </div>
        </div>
      )}

      {/* Step: Confirmation */}
      {step === "confirmation" && completedOrder && (
        <div className="text-center animate-fade-in-up">
          <div className="text-6xl mb-4 animate-scale-in">🎉</div>
          <h1 className="font-serif text-3xl font-bold text-espresso mb-2">Order Confirmed!</h1>
          <p className="text-roast-light mb-8">
            Your order <span className="font-mono font-bold text-espresso">{completedOrder.id}</span> has been placed.
          </p>

          <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-6 text-left mb-8 max-w-md mx-auto">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-roast-light">Order ID</span>
                <span className="font-mono font-bold text-espresso">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-roast-light">Items</span>
                <span className="text-espresso">{completedOrder.items.reduce((s, i) => s + i.quantity, 0)} bags</span>
              </div>
              <div className="flex justify-between">
                <span className="text-roast-light">Total</span>
                <span className="font-bold text-espresso">${completedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-roast-light">Ship to</span>
                <span className="text-espresso text-right">{completedOrder.shippingInfo.city}, {completedOrder.shippingInfo.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-roast-light">Est. Delivery</span>
                <span className="text-espresso">
                  {new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {" — "}
                  {new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/orders"
              className="px-6 py-2.5 rounded-full text-sm font-medium border-2 border-[var(--color-border)] text-espresso hover:border-caramel hover:text-caramel transition-all"
            >
              View Orders
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full text-sm font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
