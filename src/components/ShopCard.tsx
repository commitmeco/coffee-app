import Link from "next/link";
import type { Shop } from "@/lib/shops";
import { getPriceLevelLabel } from "@/lib/shops";

export default function ShopCard({ shop }: { shop: Shop }) {
  return (
    <Link
      href={`/shops/${shop.id}`}
      className="group block bg-[#141414] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-white/[0.06] hover:border-caramel/40"
    >
      {/* Header with emoji */}
      <div className="bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] p-5 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{shop.image}</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-espresso leading-tight group-hover:text-caramel transition-colors">
                {shop.name}
              </h3>
              <p className="text-sm text-roast-light">
                {shop.city}, {shop.state}
              </p>
            </div>
          </div>
          <span className="text-sm font-medium text-roast-light shrink-0">
            {getPriceLevelLabel(shop.priceLevel)}
          </span>
        </div>
      </div>

      <div className="p-5 pt-3">
        {/* Specialty */}
        <p className="text-xs italic text-caramel mb-3">{shop.specialty}</p>

        {/* Rating + reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-honey" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-bold text-espresso">{shop.rating}</span>
          </div>
          <span className="text-xs text-roast-light/60">({shop.reviewCount} reviews)</span>
          <span className="text-xs text-roast-light/40 ml-auto">{shop.hours}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {shop.features.slice(0, 4).map((feature) => (
            <span
              key={feature}
              className="text-xs bg-white/[0.06] text-espresso-light px-2 py-0.5 rounded-full capitalize"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Beans count */}
        <p className="text-xs text-roast-light/60 mt-3">
          {shop.beanIds.length} beans available
        </p>
      </div>
    </Link>
  );
}
