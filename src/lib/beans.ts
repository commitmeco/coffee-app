import beansData from "@/data/beans.json";

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

export function getAllBeans(): Bean[] {
  return beans;
}

export function getBeanById(id: number): Bean | undefined {
  return beans.find((b) => b.id === id);
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
