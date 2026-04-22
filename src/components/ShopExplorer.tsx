"use client";

import { useState, useMemo } from "react";
import { getAllShops, getUniqueCities, getUniqueFeatures, filterShops } from "@/lib/shops";
import ShopCard from "./ShopCard";

export default function ShopExplorer() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");

  const cities = useMemo(() => getUniqueCities(), []);
  const features = useMemo(() => getUniqueFeatures(), []);

  const shops = useMemo(
    () =>
      filterShops({
        search: search || undefined,
        city: selectedCity ? selectedCity.split(",")[0] : undefined,
        feature: selectedFeature || undefined,
      }),
    [search, selectedCity, selectedFeature]
  );

  const totalShops = getAllShops().length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-2">
          Coffee Shops
        </h1>
        <p className="text-roast-light">
          Discover {totalShops} specialty coffee shops across the country
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-roast-light/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shops by name or city..."
            className="w-full pl-10 pr-4 py-2.5 border border-white/[0.06] rounded-xl text-sm text-espresso focus:outline-none focus:border-caramel"
          />
        </div>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-espresso bg-[#141414] focus:outline-none focus:border-caramel"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={selectedFeature}
          onChange={(e) => setSelectedFeature(e.target.value)}
          className="border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-espresso bg-[#141414] focus:outline-none focus:border-caramel capitalize"
        >
          <option value="">All Features</option>
          {features.map((f) => (
            <option key={f} value={f} className="capitalize">{f}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-roast-light mb-6">
        {shops.length} shop{shops.length !== 1 ? "s" : ""} found
      </p>

      {/* Shop grid */}
      {shops.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-roast-light">No shops match your filters. Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shops.map((shop, i) => (
            <div key={shop.id} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
              <ShopCard shop={shop} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
