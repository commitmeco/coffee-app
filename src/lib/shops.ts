import shopsData from "@/data/shops.json";
import { getBeanById } from "./beans";
import type { Bean } from "./beans";

// ── Types ──

export interface Shop {
  id: number;
  name: string;
  city: string;
  state: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  hours: string;
  specialty: string;
  beanIds: number[];
  image: string;
  priceLevel: number;
  features: string[];
}

const shops: Shop[] = shopsData as Shop[];

// ── Core Data Access ──

export function getAllShops(): Shop[] {
  return shops;
}

export function getShopById(id: number): Shop | undefined {
  return shops.find((s) => s.id === id);
}

// ── Relational Queries ──

export function getShopsForBean(beanId: number): Shop[] {
  return shops.filter((s) => s.beanIds.includes(beanId));
}

export function getBeansForShop(shop: Shop): Bean[] {
  return shop.beanIds
    .map((id) => getBeanById(id))
    .filter((b): b is Bean => b !== undefined);
}

// ── Distance ──

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearbyShops(lat: number, lng: number, radiusMiles = 50): (Shop & { distance: number })[] {
  return shops
    .map((s) => ({ ...s, distance: haversine(lat, lng, s.lat, s.lng) }))
    .filter((s) => s.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance);
}

// ── Filtering ──

export interface ShopFilterOptions {
  search?: string;
  city?: string;
  feature?: string;
  beanId?: number;
  minRating?: number;
}

export function filterShops(options: ShopFilterOptions): Shop[] {
  let result = [...shops];

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.specialty.toLowerCase().includes(q)
    );
  }

  if (options.city) {
    result = result.filter((s) => s.city === options.city);
  }

  if (options.feature) {
    result = result.filter((s) => s.features.includes(options.feature!));
  }

  if (options.beanId) {
    result = result.filter((s) => s.beanIds.includes(options.beanId!));
  }

  if (options.minRating) {
    result = result.filter((s) => s.rating >= options.minRating!);
  }

  return result.sort((a, b) => b.rating - a.rating);
}

// ── Helpers ──

export function getUniqueCities(): string[] {
  return Array.from(new Set(shops.map((s) => `${s.city}, ${s.state}`))).sort();
}

export function getUniqueFeatures(): string[] {
  const features = new Set<string>();
  shops.forEach((s) => s.features.forEach((f) => features.add(f)));
  return Array.from(features).sort();
}

export function getPriceLevelLabel(level: number): string {
  return "$".repeat(level);
}
