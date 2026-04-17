import beansData from "@/data/beans.json";
import curatedData from "@/data/beans_curated.json";

export interface Bean {
  id: number;
  species: string;
  country: string;
  region: string;
  farm: string;
  producer: string;
  variety: string;
  processing_method: string;
  altitude_meters: number | null;
  harvest_year: string;
  color: string;
  scores: {
    aroma: number;
    flavor: number;
    aftertaste: number;
    acidity: number;
    body: number;
    balance: number;
    uniformity: number;
    clean_cup: number;
    sweetness: number;
    cupper_points: number;
    total: number;
  };
  moisture: number;
  defects: {
    category_one: number;
    category_two: number;
  };
}

const beans: Bean[] = beansData as Bean[];
const curated: Bean[] = curatedData as Bean[];

// ── Core Data Access ──

export function getAllBeans(): Bean[] {
  return beans;
}

export function getBeanById(id: number): Bean | undefined {
  return beans.find((b) => b.id === id);
}

export function getCuratedBeans(): Bean[] {
  return curated;
}

export function getUniqueCountries(): string[] {
  const countries = new Set(beans.map((b) => b.country).filter(Boolean));
  return Array.from(countries).sort();
}

export function getUniqueProcessingMethods(): string[] {
  const methods = new Set(
    beans.map((b) => b.processing_method).filter(Boolean)
  );
  return Array.from(methods).sort();
}

// ── Scoring ──

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Outstanding";
  if (score >= 85) return "Excellent";
  if (score >= 80) return "Very Good";
  return "Good";
}

export function getScoreClass(score: number): string {
  if (score >= 90) return "score-outstanding";
  if (score >= 85) return "score-excellent";
  return "score-very-good";
}

// ── Country Flags ──

const countryFlags: Record<string, string> = {
  "Brazil": "🇧🇷",
  "Burundi": "🇧🇮",
  "China": "🇨🇳",
  "Colombia": "🇨🇴",
  "Cote d?Ivoire": "🇨🇮",
  "Costa Rica": "🇨🇷",
  "Ecuador": "🇪🇨",
  "El Salvador": "🇸🇻",
  "Ethiopia": "🇪🇹",
  "Guatemala": "🇬🇹",
  "Haiti": "🇭🇹",
  "Honduras": "🇭🇳",
  "India": "🇮🇳",
  "Indonesia": "🇮🇩",
  "Japan": "🇯🇵",
  "Kenya": "🇰🇪",
  "Laos": "🇱🇦",
  "Malawi": "🇲🇼",
  "Mauritius": "🇲🇺",
  "Mexico": "🇲🇽",
  "Myanmar": "🇲🇲",
  "Nicaragua": "🇳🇮",
  "Panama": "🇵🇦",
  "Papua New Guinea": "🇵🇬",
  "Peru": "🇵🇪",
  "Philippines": "🇵🇭",
  "Rwanda": "🇷🇼",
  "Taiwan": "🇹🇼",
  "Tanzania, United Republic Of": "🇹🇿",
  "Thailand": "🇹🇭",
  "Uganda": "🇺🇬",
  "United States": "🇺🇸",
  "United States (Hawaii)": "🇺🇸",
  "United States (Puerto Rico)": "🇺🇸",
  "Vietnam": "🇻🇳",
  "Zambia": "🇿🇲",
};

export function getCountryFlag(country: string): string {
  return countryFlags[country] ?? "🌍";
}

// ── Flavor Hints ──

export function getFlavorHint(scores: Bean["scores"]): string {
  const { acidity, body, flavor, balance, sweetness, aroma } = scores;
  if (acidity >= 8.3 && flavor >= 8.3) return "Bright & Complex";
  if (body >= 8.2 && sweetness >= 9.5) return "Full & Sweet";
  if (balance >= 8.2 && flavor >= 8.2) return "Smooth & Balanced";
  if (aroma >= 8.3 && acidity >= 8.0) return "Aromatic & Lively";
  if (body >= 8.0 && balance >= 8.0) return "Rich & Harmonious";
  return "Well-Rounded";
}

// ── Similar Beans ──

export function getSimilarBeans(bean: Bean, count = 4): Bean[] {
  return beans
    .filter((b) => b.id !== bean.id)
    .map((b) => ({
      bean: b,
      similarity:
        (b.country === bean.country ? 3 : 0) +
        (b.processing_method === bean.processing_method ? 2 : 0) +
        (b.variety === bean.variety && b.variety ? 1 : 0) +
        Math.max(0, 5 - Math.abs(b.scores.total - bean.scores.total)),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
    .map((x) => x.bean);
}

// ── Catalog Stats ──

export function getCatalogStats() {
  const countries = new Set(beans.map((b) => b.country).filter(Boolean));
  const methods = new Set(beans.map((b) => b.processing_method).filter(Boolean));
  const topScore = Math.max(...beans.map((b) => b.scores.total));
  return {
    totalBeans: beans.length,
    countries: countries.size,
    processingMethods: methods.size,
    topScore,
  };
}

// ── Score Explanations ──

export const scoreExplanations: Record<string, string> = {
  aroma: "The fragrance of dry grounds and the aroma of brewed coffee.",
  flavor: "The overall taste impression — sweetness, acidity, and body combined.",
  aftertaste: "How long the positive flavor lingers after swallowing.",
  acidity: "Brightness and liveliness. Higher often means more fruit-forward.",
  body: "The weight and texture of the coffee on the palate.",
  balance: "How well the flavors work together without one overpowering others.",
  uniformity: "Consistency of flavor across multiple cups of the same bean.",
  clean_cup: "Absence of off-flavors from first sip to finish.",
  sweetness: "The natural sweetness perceived in the coffee.",
  cupper_points: "The overall impression scored by the cupping professional.",
};

// ── Filtering ──

export interface FilterOptions {
  search?: string;
  country?: string;
  processing?: string;
  minScore?: number;
  maxScore?: number;
  sortBy?: "score-desc" | "score-asc" | "country" | "altitude";
}

export function filterBeans(options: FilterOptions): Bean[] {
  let result = [...beans];

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (b) =>
        b.country.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q) ||
        b.farm.toLowerCase().includes(q) ||
        b.producer.toLowerCase().includes(q) ||
        b.variety.toLowerCase().includes(q) ||
        b.processing_method.toLowerCase().includes(q)
    );
  }

  if (options.country) {
    result = result.filter((b) => b.country === options.country);
  }

  if (options.processing) {
    result = result.filter((b) => b.processing_method === options.processing);
  }

  if (options.minScore !== undefined) {
    result = result.filter((b) => b.scores.total >= options.minScore!);
  }

  if (options.maxScore !== undefined) {
    result = result.filter((b) => b.scores.total <= options.maxScore!);
  }

  switch (options.sortBy) {
    case "score-desc":
      result.sort((a, b) => b.scores.total - a.scores.total);
      break;
    case "score-asc":
      result.sort((a, b) => a.scores.total - b.scores.total);
      break;
    case "country":
      result.sort((a, b) => a.country.localeCompare(b.country));
      break;
    case "altitude":
      result.sort(
        (a, b) => (b.altitude_meters ?? 0) - (a.altitude_meters ?? 0)
      );
      break;
    default:
      result.sort((a, b) => b.scores.total - a.scores.total);
  }

  return result;
}
