"use client";

import { useState, useMemo } from "react";
import { Bean, filterBeans, FilterOptions } from "@/lib/beans";
import BeanCard from "./BeanCard";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

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

  const hasActiveFilters = search || country || processing || minScore;

  function clearFilters() {
    setSearch("");
    setCountry("");
    setProcessing("");
    setMinScore("");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      {/* Search & Filters */}
      <div className="space-y-3 mb-8">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setVisibleCount(PAGE_SIZE); }} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Filters
            countries={countries}
            processingMethods={processingMethods}
            selectedCountry={country}
            selectedProcessing={processing}
            selectedSort={sort}
            minScore={minScore}
            onCountryChange={(v) => { setCountry(v); setVisibleCount(PAGE_SIZE); }}
            onProcessingChange={(v) => { setProcessing(v); setVisibleCount(PAGE_SIZE); }}
            onSortChange={setSort}
            onMinScoreChange={(v) => { setMinScore(v); setVisibleCount(PAGE_SIZE); }}
          />
          <p className="text-sm text-roast-light">
            {filtered.length} bean{filtered.length !== 1 ? "s" : ""}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-2 text-caramel hover:text-roast underline text-sm"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-roast-light mb-2">No beans found</p>
          <p className="text-sm text-roast-light/70">
            Try adjusting your search or filters
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-caramel text-white rounded-lg hover:bg-roast-light transition-colors text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="px-6 py-2.5 bg-espresso text-cream rounded-lg hover:bg-espresso-light transition-colors text-sm font-medium"
              >
                Load more ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
