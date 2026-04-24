"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { getPriceForSize } from "@/lib/pricing";
import type { BagSize, GrindType } from "@/lib/pricing";

interface AddToCartControlsProps {
  beanId: number;
  basePrice: number;
  roaster: string;
  roastLevel: string;
  inStock: boolean;
}

const GRINDS: { value: GrindType; label: string }[] = [
  { value: "whole", label: "Whole Bean" },
  { value: "coarse", label: "Coarse" },
  { value: "medium", label: "Medium" },
  { value: "fine", label: "Fine" },
];

const SIZES: { value: BagSize; label: string }[] = [
  { value: "8oz", label: "8oz" },
  { value: "12oz", label: "12oz" },
  { value: "2lb", label: "2lb" },
];

export default function AddToCartControls({
  beanId,
  basePrice,
  roaster,
  roastLevel,
  inStock,
}: AddToCartControlsProps) {
  const [grind, setGrind] = useState<GrindType>("whole");
  const [size, setSize] = useState<BagSize>("12oz");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const currentPrice = getPriceForSize(basePrice, size);

  function handleAdd() {
    addItem(beanId, grind, size, currentPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-[var(--color-cream-light)] rounded-xl border border-[var(--color-border)] p-6 md:p-8 mt-8 animate-fade-in-up stagger-3">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-espresso">Purchase</h2>
          <p className="text-sm text-roast-light mt-0.5">{roaster}</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-2xl font-bold text-espresso">${currentPrice.toFixed(2)}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 bg-white/[0.06] text-roast-light rounded-full">
              {roastLevel} Roast
            </span>
            {inStock ? (
              <span className="text-xs px-2 py-0.5 bg-sage/10 text-sage rounded-full font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-xs px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded-full font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grind selector */}
      <div className="mb-4">
        <label className="text-sm font-medium text-espresso mb-2 block">Grind</label>
        <div className="flex flex-wrap gap-2">
          {GRINDS.map((g) => (
            <button
              key={g.value}
              onClick={() => setGrind(g.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                grind === g.value
                  ? "bg-[#E8E4E0] text-[#0F0F0F] shadow-sm"
                  : "bg-white/[0.06] text-roast hover:bg-white/[0.06]/80"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div className="mb-6">
        <label className="text-sm font-medium text-espresso mb-2 block">Size</label>
        <div className="flex gap-2">
          {SIZES.map((s) => {
            const sizePrice = getPriceForSize(basePrice, s.value);
            return (
              <button
                key={s.value}
                onClick={() => setSize(s.value)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                  size === s.value
                    ? "border-caramel bg-caramel/5 text-espresso shadow-sm"
                    : "border-[var(--color-border)] text-roast hover:border-caramel/40"
                }`}
              >
                <span className="block">{s.label}</span>
                <span className="block text-xs text-roast-light mt-0.5">${sizePrice.toFixed(2)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleAdd}
        disabled={!inStock}
        className={`w-full py-3.5 rounded-full font-medium text-base transition-all ${
          added
            ? "bg-sage text-white"
            : inStock
              ? "bg-caramel text-white hover:bg-caramel-light shadow-sm hover:shadow-md active:scale-[0.98]"
              : "bg-white/[0.06] text-roast-light/50 cursor-not-allowed"
        }`}
      >
        {added ? "Added to Cart!" : inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
