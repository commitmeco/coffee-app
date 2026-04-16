"use client";

import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { CartMap, CartItem } from "@/lib/cart";
import { cartItemKey, getCartTotal, getCartCount, getShippingCost } from "@/lib/cart";
import type { BagSize, GrindType } from "@/lib/pricing";

interface CartContextValue {
  items: CartMap;
  hydrated: boolean;
  addItem: (beanId: number, grind: GrindType, size: BagSize, pricePerUnit: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  shippingCost: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, hydrated] = useLocalStorage<CartMap>("coffee-cart", {});

  const addItem = useCallback(
    (beanId: number, grind: GrindType, size: BagSize, pricePerUnit: number) => {
      const key = cartItemKey(beanId, grind, size);
      setItems((prev) => {
        const existing = prev[key];
        return {
          ...prev,
          [key]: {
            beanId,
            grind,
            size,
            pricePerUnit,
            quantity: (existing?.quantity ?? 0) + 1,
          },
        };
      });
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (key: string, quantity: number) => {
      setItems((prev) => {
        if (quantity <= 0) {
          const next = { ...prev };
          delete next[key];
          return next;
        }
        const existing = prev[key];
        if (!existing) return prev;
        return { ...prev, [key]: { ...existing, quantity } };
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (key: string) => {
      setItems((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [setItems]
  );

  const clearCart = useCallback(() => {
    setItems({});
  }, [setItems]);

  const cartTotal = getCartTotal(items);
  const cartCount = getCartCount(items);
  const shippingCost = getShippingCost(cartTotal);

  return (
    <CartContext.Provider
      value={{
        items,
        hydrated,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        cartTotal,
        cartCount,
        shippingCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
