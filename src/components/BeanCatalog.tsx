"use client";

import { useState, useMemo } from "react";
import { Bean, filterBeans, FilterOptions } from "@/lib/beans";
import BeanCard from "./BeanCard";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import ActiveFilters from "./ActiveFilters";

interface BeanCatalogProps {
  beans: Bean[];
  countries: string[];
  processingMethods: string[];
}

const PAGE_SIZE = 24;

export default function BeanCatalog({
  beans,
  countries,
  processingMethods,
}: BeanCatalogProps) {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [processing, setProcessing] = useState("");
  const [sort, setSort] = useState("score-desc");
  const [minScore, setMinScore] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const options: FilterOptions = {
      search: search || undefined,
      country: country || undefined,
      processing: processing || undefined,
      minScore: minScore ? Number(minScore) : undefined,
      sortBy: sort as FilterOptions["sortBy"],
    };
    return filterBeans(options);
  }, [search, country, processing, sort, minScore]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Build active filter list for chips
  const activeFilters = [
    ...(search ? [{ label: "Search", key: "search", value: search }] : []),
    ...(country ? [{ label: "Country", key: "country", value: country }] : []),
    ...(processing ? [{ label: "Processing", key: "processing", value: processing }] : []),
    ...(minScore ? [{ label: "Min Score", key: "minScore", value: `${minScore}+` }] : []),
  ];

  function clearFilter(key: string) {
    if (key === "search") setSearch("");
    if (key === "country") setCountry("");
    if (key === "processing") setProcessing("");
    if (key === "minScore") setMinScore("");
    setVisibleCount(PAGE_SIZE);
  }

  function clearAllFilters() {
    setSearch("");
    setCountry("");
    setProcessing("");
    setMinScore("");
    setVisibleCount(PAGE_SIZE);
  }

  function resetAndSet(setter: (v: string) => void, value: string) {
    setter(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-serif text-2xl font-bold text-espresso">All Beans</h2>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <p className="text-sm text-roast-light">
          {filtered.length.toLocaleString()} bean{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-6">
        <SearchBar value={search} onChange={(v) => resetAndSet(setSearch, v)} />
        <Filters
          countries={countries}
          processingMethods={processingMethods}
          selectedCountry={country}
          selectedProcessing={processing}
          selectedSort={sort}
          minScore={minScore}
          onCountryChange={(v) => resetAndSet(setCountry, v)}
          onProcessingChange={(v) => resetAndSet(setProcessing, v)}
          onSortChange={setSort}
          onMinScoreChange={(v) => resetAndSet(setMinScore, v)}
        />
        <ActiveFilters
          filters={activeFilters}
          onRemove={clearFilter}
          onClearAll={clearAllFilters}
        />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-5xl mb-4">☕</div>
          <p className="text-xl font-serif text-espresso mb-2">No beans found</p>
          <p className="text-sm text-roast-light/70 max-w-md mx-auto mb-6">
            Try searching for a country like &ldquo;Ethiopia&rdquo; or a variety
            like &ldquo;Bourbon&rdquo;, or adjust your filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 bg-[#E8E4E0] text-[#0F0F0F] rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((bean, i) => (
              <div key={bean.id} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
                <BeanCard bean={bean} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              {/* Progress bar */}
              <div className="max-w-xs mx-auto mb-3">
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-caramel rounded-full transition-all duration-500"
                    style={{ width: `${(visibleCount / filtered.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-roast-light/60 mt-1.5">
                  Showing {Math.min(visibleCount, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-8 py-3 bg-[#141414] border-2 border-white/[0.08] text-espresso rounded-full hover:bg-white/[0.06] transition-all text-sm font-medium"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
