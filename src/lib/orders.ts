import type { CartItem } from "./cart";

// ── Types ──

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingInfo: ShippingInfo;
  date: string;
  status: "confirmed" | "shipped" | "delivered";
}

export type OrderList = Order[];

// ── Helpers ──

export function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "CF-";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export function getStatusLabel(status: Order["status"]): string {
  switch (status) {
    case "confirmed": return "Order Confirmed";
    case "shipped": return "Shipped";
    case "delivered": return "Delivered";
  }
}

export function getStatusColor(status: Order["status"]): string {
  switch (status) {
    case "confirmed": return "bg-honey/10 text-honey";
    case "shipped": return "bg-caramel/10 text-caramel";
    case "delivered": return "bg-sage/10 text-sage";
  }
}
