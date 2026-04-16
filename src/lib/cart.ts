import type { BagSize, GrindType } from "./pricing";

// ── Cart Types ──

export interface CartItem {
  beanId: number;
  quantity: number;
  grind: GrindType;
  size: BagSize;
  pricePerUnit: number;
}

// Key format: `${beanId}-${grind}-${size}`
export type CartMap = Record<string, CartItem>;

export function cartItemKey(beanId: number, grind: GrindType, size: BagSize): string {
  return `${beanId}-${grind}-${size}`;
}

export function getCartTotal(items: CartMap): number {
  return Object.values(items).reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );
}

export function getCartCount(items: CartMap): number {
  return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
}

export function getShippingCost(subtotal: number): number {
  return subtotal >= 40 ? 0 : 5;
}
