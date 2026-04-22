"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getBeanById, getCountryFlag } from "@/lib/beans";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, hydrated, updateQuantity, removeItem, clearCart, cartTotal, cartCount, shippingCost } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const itemEntries = Object.entries(items);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />


      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0F0F0F] shadow-[-8px_0_32px_rgba(0,0,0,0.6)] flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-serif text-xl font-bold text-espresso flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Your Cart
            {cartCount > 0 && (
              <span className="text-sm font-normal text-roast-light">({cartCount} items)</span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 text-espresso" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-5">
          {!hydrated ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
          ) : itemEntries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-5xl mb-4">🛒</span>
              <p className="font-serif text-lg font-bold text-espresso mb-1">Your cart is empty</p>
              <p className="text-sm text-roast-light mb-6">Discover beans you&apos;ll love</p>
              <Link
                href="/"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-sm font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm"
              >
                Browse Beans
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {itemEntries.map(([key, item]) => {
                const bean = getBeanById(item.beanId);
                if (!bean) return null;
                const lineTotal = item.pricePerUnit * item.quantity;

                return (
                  <div
                    key={key}
                    className="bg-[#141414] rounded-xl border border-white/[0.06] p-4 animate-fade-in"
                  >
                    <div className="flex items-start gap-3">
                      {/* Bean info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/beans/${bean.id}`}
                          onClick={onClose}
                          className="font-medium text-espresso text-sm hover:text-caramel transition-colors line-clamp-1"
                        >
                          {getCountryFlag(bean.country)} {bean.country} — {bean.region}
                        </Link>
                        <p className="text-xs text-roast-light mt-0.5">
                          {bean.roaster}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-roast-light/70">
                          <span className="px-2 py-0.5 bg-white/[0.06] rounded-full capitalize">{item.grind}</span>
                          <span className="px-2 py-0.5 bg-white/[0.06] rounded-full">{item.size}</span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => removeItem(key)}
                        className="p-1 rounded hover:bg-white/[0.06] text-roast-light/50 hover:text-roast transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity + price */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-white/[0.06] flex items-center justify-center text-sm hover:border-caramel hover:text-caramel transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium text-espresso w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-white/[0.06] flex items-center justify-center text-sm hover:border-caramel hover:text-caramel transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-espresso">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="text-xs text-roast-light/60 hover:text-roast transition-colors underline"
              >
                Clear cart
              </button>
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {hydrated && itemEntries.length > 0 && (
          <div className="border-t border-white/[0.06] p-5 bg-[#141414]/50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-roast">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-roast">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? <span className="text-sage">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-roast-light/60">
                  Free shipping on orders over $40
                </p>
              )}
              <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-white/[0.06]">
                <span>Total</span>
                <span>${(cartTotal + shippingCost).toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center px-6 py-3 rounded-full font-medium bg-caramel text-white hover:bg-caramel-light transition-all shadow-sm hover:shadow-md"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
