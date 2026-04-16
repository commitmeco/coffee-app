import { Bean, getAllBeans } from "./beans";

// ── Types ──

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  emoji: string;
}

export interface QuizQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: QuizOption[];
  allowMultiple?: boolean;
  maxSelections?: number;
  escapeHatch: string;
}

export type QuizAnswers = Record<string, string | string[]>;

export interface FlavorProfile {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  scoreWeights: {
    acidity: number;
    body: number;
    sweetness: number;
    flavor: number;
    aroma: number;
    balance: number;
  };
  preferredProcessing?: string[];
  preferredOrigins?: string[];
}

export interface QuizResult {
  profile: FlavorProfile;
  completedAt: string;
  answers: QuizAnswers;
  recommendedBeanIds: number[];
}

// ── Questions ──

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "taste-vibe",
    title: "What sounds most appealing to you right now?",
    subtitle: "No wrong answers — this helps us understand your palate.",
    options: [
      { id: "bright", label: "Bright & Fruity", description: "Like biting into a fresh berry", emoji: "🍊" },
      { id: "rich", label: "Rich & Chocolatey", description: "Like a warm brownie", emoji: "🍫" },
      { id: "smooth", label: "Smooth & Nutty", description: "Like toasted almonds", emoji: "🥜" },
      { id: "bold", label: "Bold & Intense", description: "Like dark espresso", emoji: "☕" },
    ],
    escapeHatch: "Surprise me!",
  },
  {
    id: "acidity",
    title: "How do you feel about brightness in coffee?",
    subtitle: "Brightness is that lively, tangy quality — think of it like a squeeze of citrus.",
    options: [
      { id: "love-it", label: "Love it", description: "The brighter, the better", emoji: "✨" },
      { id: "some", label: "A nice touch", description: "Balanced brightness is great", emoji: "🌤️" },
      { id: "mellow", label: "Keep it mellow", description: "I prefer smooth and low-acid", emoji: "🌙" },
    ],
    escapeHatch: "Not sure yet",
  },
  {
    id: "body",
    title: "What kind of mouthfeel do you enjoy?",
    subtitle: "Body is how heavy the coffee feels — light like tea, or thick like cream.",
    options: [
      { id: "light", label: "Light & Tea-like", description: "Delicate and clean", emoji: "🍵" },
      { id: "medium", label: "Medium & Silky", description: "Juicy and rounded", emoji: "🥛" },
      { id: "full", label: "Full & Creamy", description: "Rich and coating", emoji: "🍯" },
    ],
    escapeHatch: "No preference",
  },
  {
    id: "flavor-notes",
    title: "Pick the flavors that excite you most.",
    subtitle: "Choose up to 3 — these come from the flavor wheel that professionals use.",
    options: [
      { id: "fruity", label: "Berry & Citrus", description: "Blueberry, lemon, tropical", emoji: "🫐" },
      { id: "floral", label: "Floral & Delicate", description: "Jasmine, lavender, rose", emoji: "🌸" },
      { id: "sweet", label: "Caramel & Honey", description: "Brown sugar, maple, vanilla", emoji: "🍮" },
      { id: "nutty-cocoa", label: "Chocolate & Nutty", description: "Dark chocolate, hazelnut, almond", emoji: "🌰" },
      { id: "spicy", label: "Warm Spices", description: "Cinnamon, clove, cardamom", emoji: "🫚" },
      { id: "roasted", label: "Toasty & Smoky", description: "Toast, malt, tobacco", emoji: "🔥" },
    ],
    allowMultiple: true,
    maxSelections: 3,
    escapeHatch: "I like everything!",
  },
  {
    id: "adventure",
    title: "How adventurous are you feeling?",
    subtitle: "This helps us pick beans with different processing methods — each creates a unique flavor.",
    options: [
      { id: "classic", label: "Keep it classic", description: "Clean, predictable, refined", emoji: "🎯" },
      { id: "curious", label: "Pleasantly surprised", description: "Some sweetness, some familiarity", emoji: "🌈" },
      { id: "adventurous", label: "Bring it on!", description: "Wild, funky, experimental", emoji: "🚀" },
    ],
    escapeHatch: "Dealer's choice",
  },
  {
    id: "occasion",
    title: "When do you usually enjoy coffee?",
    subtitle: "Your go-to moment helps us fine-tune the recommendations.",
    options: [
      { id: "morning", label: "Morning ritual", description: "A warm, comforting start", emoji: "🌅" },
      { id: "focus", label: "Afternoon focus", description: "Something to power through", emoji: "💡" },
      { id: "savoring", label: "Slow savoring", description: "Taking time to really taste it", emoji: "🧘" },
      { id: "social", label: "With friends", description: "Something crowd-pleasing", emoji: "👋" },
    ],
    escapeHatch: "All the time!",
  },
];

// ── Flavor Profiles ──

export const FLAVOR_PROFILES: FlavorProfile[] = [
  {
    name: "The Explorer",
    tagline: "Bright, complex, fruit-forward",
    description:
      "You crave the unexpected. Your ideal cup is bursting with fruit and floral notes, with enough brightness to keep your palate guessing. Ethiopian and Kenyan single origins were made for you.",
    icon: "🧭",
    scoreWeights: { acidity: 0.9, body: 0.3, sweetness: 0.6, flavor: 0.9, aroma: 0.8, balance: 0.5 },
    preferredProcessing: ["Washed / Wet"],
    preferredOrigins: ["Ethiopia", "Kenya", "Colombia"],
  },
  {
    name: "The Comforter",
    tagline: "Rich, chocolatey, full-bodied",
    description:
      "You reach for warmth and depth. Think dark chocolate, toasted nuts, and a hug in a mug. Brazilian and Indonesian beans will feel like coming home.",
    icon: "🛋️",
    scoreWeights: { acidity: 0.2, body: 0.9, sweetness: 0.7, flavor: 0.7, aroma: 0.6, balance: 0.8 },
    preferredProcessing: ["Natural / Dry"],
    preferredOrigins: ["Brazil", "Indonesia", "Guatemala"],
  },
  {
    name: "The Purist",
    tagline: "Clean, balanced, refined",
    description:
      "You appreciate subtlety and craftsmanship. A perfectly balanced cup with no rough edges is your holy grail. Washed Central Americans are your playground.",
    icon: "💎",
    scoreWeights: { acidity: 0.5, body: 0.5, sweetness: 0.6, flavor: 0.7, aroma: 0.6, balance: 0.95 },
    preferredProcessing: ["Washed / Wet"],
    preferredOrigins: ["Costa Rica", "Guatemala", "Colombia"],
  },
  {
    name: "The Adventurer",
    tagline: "Wild, funky, natural-processed",
    description:
      "Rules are meant to be broken. You love the unpredictable magic of natural processing — winey, fermented, and bursting with character. The weirder, the better.",
    icon: "🚀",
    scoreWeights: { acidity: 0.6, body: 0.7, sweetness: 0.8, flavor: 0.9, aroma: 0.9, balance: 0.3 },
    preferredProcessing: ["Natural / Dry"],
    preferredOrigins: ["Ethiopia", "Brazil", "El Salvador"],
  },
  {
    name: "The Sweetheart",
    tagline: "Sweet, aromatic, honeyed",
    description:
      "Life is too short for bitter coffee. You gravitate toward natural sweetness — caramel, honey, and maple syrup notes that make every sip feel like dessert.",
    icon: "🍯",
    scoreWeights: { acidity: 0.3, body: 0.6, sweetness: 0.95, flavor: 0.8, aroma: 0.7, balance: 0.6 },
    preferredProcessing: ["Pulped natural / honey"],
    preferredOrigins: ["Costa Rica", "El Salvador", "Honduras"],
  },
  {
    name: "The Connoisseur",
    tagline: "Complex, layered, aromatic",
    description:
      "You taste in layers. First the aroma hits, then the flavor unfolds, and the finish keeps evolving. You want coffees that reward attention — and these deliver.",
    icon: "🔬",
    scoreWeights: { acidity: 0.7, body: 0.6, sweetness: 0.7, flavor: 0.95, aroma: 0.95, balance: 0.7 },
    preferredOrigins: ["Ethiopia", "Panama", "Kenya", "Colombia"],
  },
  {
    name: "The Crowd-Pleaser",
    tagline: "Smooth, approachable, everyone's favorite",
    description:
      "You want a cup that makes everyone smile. Not too wild, not too mild — just perfectly drinkable. These are the beans you share with friends.",
    icon: "🤝",
    scoreWeights: { acidity: 0.4, body: 0.5, sweetness: 0.6, flavor: 0.6, aroma: 0.5, balance: 0.9 },
    preferredOrigins: ["Colombia", "Brazil", "Guatemala"],
  },
];

// ── Profile Matching ──

export function determineProfile(answers: QuizAnswers): FlavorProfile {
  const prefs = {
    acidity: 0.5,
    body: 0.5,
    sweetness: 0.5,
    flavor: 0.5,
    aroma: 0.5,
    balance: 0.5,
    wantsAdventure: 0.5,
  };

  // Q1: taste-vibe
  switch (answers["taste-vibe"]) {
    case "bright":
      prefs.acidity += 0.3; prefs.aroma += 0.2; break;
    case "rich":
      prefs.body += 0.3; prefs.sweetness += 0.2; break;
    case "smooth":
      prefs.balance += 0.3; prefs.body += 0.1; break;
    case "bold":
      prefs.body += 0.3; prefs.flavor += 0.2; break;
  }

  // Q2: acidity
  switch (answers["acidity"]) {
    case "love-it":
      prefs.acidity += 0.4; break;
    case "some":
      prefs.acidity += 0.1; prefs.balance += 0.15; break;
    case "mellow":
      prefs.acidity -= 0.2; prefs.balance += 0.2; break;
  }

  // Q3: body
  switch (answers["body"]) {
    case "light":
      prefs.body -= 0.2; prefs.acidity += 0.1; break;
    case "medium":
      prefs.balance += 0.15; break;
    case "full":
      prefs.body += 0.4; prefs.sweetness += 0.1; break;
  }

  // Q4: flavor-notes (multi-select)
  const notes = Array.isArray(answers["flavor-notes"]) ? answers["flavor-notes"] : [];
  if (notes.includes("fruity")) { prefs.acidity += 0.15; prefs.aroma += 0.15; }
  if (notes.includes("floral")) { prefs.aroma += 0.25; }
  if (notes.includes("sweet")) { prefs.sweetness += 0.2; }
  if (notes.includes("nutty-cocoa")) { prefs.body += 0.15; prefs.balance += 0.1; }
  if (notes.includes("spicy")) { prefs.flavor += 0.15; }
  if (notes.includes("roasted")) { prefs.body += 0.2; }

  // Q5: adventure
  switch (answers["adventure"]) {
    case "classic":
      prefs.balance += 0.2; prefs.wantsAdventure = 0.2; break;
    case "curious":
      prefs.wantsAdventure = 0.5; break;
    case "adventurous":
      prefs.wantsAdventure = 0.9; prefs.flavor += 0.15; break;
  }

  // Q6: occasion
  switch (answers["occasion"]) {
    case "morning":
      prefs.balance += 0.15; prefs.body += 0.1; break;
    case "focus":
      prefs.body += 0.15; prefs.flavor += 0.1; break;
    case "savoring":
      prefs.aroma += 0.2; prefs.flavor += 0.2; break;
    case "social":
      prefs.balance += 0.25; break;
  }

  // Clamp all to 0–1
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const w = {
    acidity: clamp(prefs.acidity),
    body: clamp(prefs.body),
    sweetness: clamp(prefs.sweetness),
    flavor: clamp(prefs.flavor),
    aroma: clamp(prefs.aroma),
    balance: clamp(prefs.balance),
  };

  // Dot product each profile against user prefs
  let bestProfile = FLAVOR_PROFILES[0];
  let bestScore = -Infinity;

  for (const profile of FLAVOR_PROFILES) {
    let score = 0;
    for (const key of Object.keys(w) as (keyof typeof w)[]) {
      score += w[key] * profile.scoreWeights[key];
    }
    // Adventure affinity bonuses
    if (profile.name === "The Adventurer") score += prefs.wantsAdventure * 0.3;
    if (profile.name === "The Purist") score += (1 - prefs.wantsAdventure) * 0.2;
    if (profile.name === "The Crowd-Pleaser") score += (1 - prefs.wantsAdventure) * 0.15;

    if (score > bestScore) {
      bestScore = score;
      bestProfile = profile;
    }
  }

  return bestProfile;
}

// ── Bean Recommendations ──

export function getRecommendedBeans(profile: FlavorProfile, count = 4): Bean[] {
  const allBeans = getAllBeans();

  const scored = allBeans.map((bean) => {
    let score = 0;
    const s = bean.scores;
    const w = profile.scoreWeights;

    // Weighted score dimensions
    score += s.acidity * w.acidity;
    score += s.body * w.body;
    score += s.sweetness * w.sweetness * 0.5; // sweetness often maxes at 10, dampen
    score += s.flavor * w.flavor;
    score += s.aroma * w.aroma;
    score += s.balance * w.balance;

    // Origin bonus
    if (profile.preferredOrigins?.includes(bean.country)) {
      score += 2;
    }

    // Processing bonus
    if (profile.preferredProcessing?.includes(bean.processing_method)) {
      score += 1.5;
    }

    // Quality floor bonus
    if (bean.scores.total >= 85) score += 1;
    if (bean.scores.total >= 88) score += 1;

    return { bean, score };
  });

  // Sort by match score, then quality as tiebreaker
  scored.sort((a, b) => b.score - a.score || b.bean.scores.total - a.bean.scores.total);

  // Ensure country diversity (max 2 from same country)
  const results: Bean[] = [];
  const countryCounts: Record<string, number> = {};

  for (const { bean } of scored) {
    if (results.length >= count) break;
    const cc = countryCounts[bean.country] || 0;
    if (cc >= 2) continue;
    countryCounts[bean.country] = cc + 1;
    results.push(bean);
  }

  return results;
}
