"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Brew Recipes ─────────────────────────────────────────────────────────────

interface Ingredient { item: string; amount: string; }
interface ShopItem    { name: string; href: string; }

interface Recipe {
  name: string;
  emoji: string;
  tagline: string;
  grind: string;
  ratio: string;
  temp: string;
  brewTime: string;
  ingredients: Ingredient[];
  equipment: string[];
  steps: string[];
  tip: string;
  shopItems: ShopItem[];
}

const RECIPES: Record<string, Recipe> = {
  espresso: {
    name: "Espresso", emoji: "☕", tagline: "Short, intense — the soul of Italian café culture.",
    grind: "Fine (like table salt)", ratio: "1:2 · 18 g coffee → 36 ml espresso",
    temp: "90–96 °C", brewTime: "25–30 seconds",
    ingredients: [
      { item: "Freshly roasted espresso beans", amount: "18 g" },
      { item: "Filtered water",                amount: "~40 ml" },
    ],
    equipment: ["Espresso machine (or Moka pot)", "Burr grinder", "Tamper", "Portafilter basket"],
    steps: [
      "Grind 18 g of coffee to a fine, powdery consistency — like table salt.",
      "Distribute grounds evenly in the portafilter, then tamp with firm level pressure (~15 kg).",
      "Lock the portafilter in. Start your shot — target 36 ml in 25–30 seconds.",
      "A perfect pull runs slow at first, amber-brown, finishing with a golden crema.",
    ],
    tip: "If it gushes fast, grind finer. If it barely drips, go coarser. Dial in one notch at a time.",
    shopItems: [
      { name: "🫘 Espresso Beans",    href: "#shop" },
      { name: "⚙️  Burr Grinder",     href: "#shop" },
      { name: "🫖 Moka Pot",          href: "#shop" },
    ],
  },

  "pour over": {
    name: "Pour Over", emoji: "🫗", tagline: "Clean, bright, and fragrant — lets the bean speak.",
    grind: "Medium-fine (like sea salt)", ratio: "1:16 · 30 g coffee → 480 ml water",
    temp: "92–96 °C", brewTime: "3–4 minutes",
    ingredients: [
      { item: "Light-to-medium roast beans", amount: "30 g" },
      { item: "Filtered water",              amount: "480 ml" },
      { item: "Paper or metal filter",       amount: "1" },
    ],
    equipment: ["V60, Chemex, or Kalita Wave", "Gooseneck kettle", "Scale + timer", "Burr grinder"],
    steps: [
      "Heat water to 93 °C. Rinse the paper filter — this removes paper taste and pre-heats the brewer.",
      "Add 30 g of medium-fine ground coffee. Tare your scale.",
      "Bloom: pour 60 ml of water over the grounds in slow circles. Wait 30–45 seconds for CO₂ to off-gas.",
      "Continue pouring in slow, steady spirals in 3–4 pours, reaching 480 ml total over about 3 minutes.",
    ],
    tip: "The bloom is everything. If the coffee is fresh it'll puff up like a dome — that's a good sign.",
    shopItems: [
      { name: "🫘 Light Roast Beans",      href: "#shop" },
      { name: "🫗 V60 / Chemex",           href: "#shop" },
      { name: "🫙 Gooseneck Kettle",       href: "#shop" },
    ],
  },

  "french press": {
    name: "French Press", emoji: "🧊", tagline: "Rich, full-bodied, with a satisfying weight.",
    grind: "Coarse (like breadcrumbs)", ratio: "1:15 · 30 g coffee → 450 ml water",
    temp: "93–96 °C", brewTime: "4 minutes steep",
    ingredients: [
      { item: "Medium-dark roast beans", amount: "30 g" },
      { item: "Filtered water",          amount: "450 ml" },
    ],
    equipment: ["French press (350 ml+)", "Burr grinder", "Kettle", "Timer"],
    steps: [
      "Preheat the press with hot water, then discard. Add 30 g of coarse-ground coffee.",
      "Start your timer. Pour 450 ml of 94 °C water evenly over the grounds.",
      "Give it one gentle stir, place the lid on (don't plunge yet), and steep for exactly 4 minutes.",
      "Press the plunger slowly and steadily. Pour immediately — don't let it sit or it'll over-extract.",
    ],
    tip: "Use a coarser grind than you think you need. The mesh isn't perfect, and fines make it bitter.",
    shopItems: [
      { name: "🫘 Medium-Dark Beans",   href: "#shop" },
      { name: "☕ French Press",        href: "#shop" },
      { name: "⚙️  Burr Grinder",      href: "#shop" },
    ],
  },

  "cold brew": {
    name: "Cold Brew", emoji: "🧊", tagline: "Smooth, low-acid, and endlessly refreshing.",
    grind: "Extra coarse (like raw sugar)", ratio: "1:8 · 100 g coffee → 800 ml cold water",
    temp: "Cold / room temp", brewTime: "12–18 hours",
    ingredients: [
      { item: "Dark or medium-dark roast beans", amount: "100 g" },
      { item: "Cold filtered water",             amount: "800 ml" },
    ],
    equipment: ["Large jar or cold-brew pitcher", "Fine mesh sieve or cheesecloth", "Burr grinder"],
    steps: [
      "Grind 100 g of coffee extra coarse — chunky, like raw sugar.",
      "Combine coffee and cold water in a large jar. Stir gently to saturate all grounds.",
      "Cover and refrigerate for 12–18 hours. Longer = stronger.",
      "Strain through a fine sieve or cheesecloth into a clean jar. Keeps refrigerated for up to 2 weeks.",
    ],
    tip: "Serve over ice, diluted 1:1 with water or milk. It's a concentrate, not a straight drink.",
    shopItems: [
      { name: "🫘 Dark Roast Beans",        href: "#shop" },
      { name: "🧊 Cold Brew Pitcher",       href: "#shop" },
      { name: "⚙️  Coarse Grinder",         href: "#shop" },
    ],
  },

  aeropress: {
    name: "AeroPress", emoji: "🔧", tagline: "Versatile, forgiving, and produces a killer cup.",
    grind: "Medium-fine", ratio: "1:14 · 17 g coffee → 240 ml water",
    temp: "80–90 °C", brewTime: "1.5–2 minutes",
    ingredients: [
      { item: "Any roast level beans", amount: "17 g" },
      { item: "Filtered water",        amount: "240 ml" },
      { item: "AeroPress filter",      amount: "1 (paper or metal)" },
    ],
    equipment: ["AeroPress + plunger", "Gooseneck kettle", "Scale", "Burr grinder"],
    steps: [
      "Invert the AeroPress. Add a rinsed filter to the cap but don't attach yet.",
      "Add 17 g of medium-fine ground coffee. Pour 240 ml of 85 °C water. Stir for 10 seconds.",
      "Attach the filter cap, flip onto your mug, and press slowly over 30–40 seconds.",
      "Stop pressing when you hear a hiss. That's your cue — don't force the dregs through.",
    ],
    tip: "Lower temperature (85 °C) than pour over. It rounds out acidity and adds sweetness.",
    shopItems: [
      { name: "🫘 Single Origin Beans", href: "#shop" },
      { name: "🔧 AeroPress",          href: "#shop" },
      { name: "⚙️  Burr Grinder",      href: "#shop" },
    ],
  },

  cappuccino: {
    name: "Cappuccino", emoji: "🥛", tagline: "Equal thirds of espresso, steamed milk, and foam.",
    grind: "Fine (espresso)", ratio: "Double shot + 120 ml milk",
    temp: "Milk to 65 °C", brewTime: "5 minutes total",
    ingredients: [
      { item: "Espresso beans",   amount: "18 g (double shot)" },
      { item: "Whole milk",       amount: "120 ml" },
      { item: "Filtered water",   amount: "~40 ml" },
    ],
    equipment: ["Espresso machine with steam wand", "Milk pitcher", "Thermometer", "Tamper"],
    steps: [
      "Pull a double espresso shot into a pre-heated cup (about 60 ml).",
      "Fill a cold milk pitcher one-third full (120 ml). Purge the steam wand.",
      "Submerge the wand tip just below the surface. Open steam. Incorporate air for 3–4 seconds (you'll hear a hiss), then lower the pitcher to heat milk to 65 °C.",
      "Tap and swirl the pitcher to break bubbles. Pour milk over espresso — thick, velvety microfoam last.",
    ],
    tip: "Cold milk, cold pitcher, fast hands. Temperature is everything — stop at 65 °C or the sweetness cooks off.",
    shopItems: [
      { name: "🫘 Espresso Beans",       href: "#shop" },
      { name: "🥛 Milk Frother / Wand",  href: "#shop" },
      { name: "⚙️  Espresso Machine",    href: "#shop" },
    ],
  },

  "flat white": {
    name: "Flat White", emoji: "☕", tagline: "Velvety microfoam over a ristretto — intensely smooth.",
    grind: "Fine (espresso)", ratio: "Double ristretto + 100 ml milk",
    temp: "Milk to 60–65 °C", brewTime: "5 minutes total",
    ingredients: [
      { item: "Espresso beans",  amount: "18 g (double ristretto)" },
      { item: "Whole milk",      amount: "100 ml" },
    ],
    equipment: ["Espresso machine with steam wand", "Small milk pitcher", "5–6 oz cup"],
    steps: [
      "Pull a double ristretto — tighter ratio (1:1.5), so about 27 ml in 20–25 seconds.",
      "Steam 100 ml of cold whole milk to 60 °C with minimal air — you want microfoam, not froth.",
      "Give the pitcher a firm tap and swirl until the milk is glossy and pourable.",
      "Pour from low, letting a thin stream of microfoam settle on top with a natural latte art pattern.",
    ],
    tip: "Smaller cup, stronger coffee, less foam — that's what separates a flat white from a latte.",
    shopItems: [
      { name: "🫘 Espresso Beans",      href: "#shop" },
      { name: "⚙️  Espresso Machine",   href: "#shop" },
      { name: "🥛 Milk Frother",        href: "#shop" },
    ],
  },

  latte: {
    name: "Latte", emoji: "🥛", tagline: "Mellow, creamy, and the perfect canvas for flavours.",
    grind: "Fine (espresso)", ratio: "Double shot + 180 ml milk",
    temp: "Milk to 65 °C", brewTime: "5 minutes total",
    ingredients: [
      { item: "Espresso beans",  amount: "18 g (double shot)" },
      { item: "Whole milk",      amount: "180 ml" },
    ],
    equipment: ["Espresso machine with steam wand", "Milk pitcher", "8–10 oz cup"],
    steps: [
      "Pull a double espresso into a pre-heated 8–10 oz cup.",
      "Steam 180 ml of cold whole milk. Submerge the tip, open steam, add a few seconds of air, then heat to 65 °C.",
      "Tap and swirl the pitcher to dissolve large bubbles. Milk should look like wet paint.",
      "Pour from low in a slow, steady stream. Tip the cup toward you for a natural heart or tulip pattern.",
    ],
    tip: "More milk means a gentler coffee flavour. Use a quality shot — it still needs to punch through 180 ml.",
    shopItems: [
      { name: "🫘 Espresso Beans",     href: "#shop" },
      { name: "⚙️  Espresso Machine",  href: "#shop" },
      { name: "🥛 Milk Frother",       href: "#shop" },
    ],
  },

  "moka pot": {
    name: "Moka Pot", emoji: "🫖", tagline: "Stovetop espresso — bold, rich, and romantic.",
    grind: "Medium-fine", ratio: "Fill basket level — no tamping",
    temp: "Stovetop / medium heat", brewTime: "5–7 minutes",
    ingredients: [
      { item: "Medium-dark roast beans", amount: "Fill the basket" },
      { item: "Hot water",               amount: "Fill chamber to valve" },
    ],
    equipment: ["Moka pot (any size)", "Stovetop or gas burner", "Burr grinder"],
    steps: [
      "Fill the bottom chamber with hot (not boiling) water up to the safety valve.",
      "Fill the filter basket with medium-fine ground coffee — level it off, don't tamp.",
      "Screw the top chamber on tightly. Place on medium-low heat with the lid open.",
      "When coffee starts to gurgle into the top chamber and turns blonde/thin, remove from heat immediately.",
    ],
    tip: "Use pre-heated water and low heat. Rushing on high heat burns the coffee before it extracts properly.",
    shopItems: [
      { name: "🫘 Medium-Dark Beans",  href: "#shop" },
      { name: "🫖 Moka Pot",          href: "#shop" },
      { name: "⚙️  Burr Grinder",     href: "#shop" },
    ],
  },
};

const DRINK_KEYWORDS: Record<string, string> = {
  espresso: "espresso", shot: "espresso", ristretto: "espresso",
  "pour over": "pour over", pourover: "pour over", v60: "pour over", chemex: "pour over", drip: "pour over",
  "french press": "french press", "french": "french press", press: "french press", cafetière: "french press",
  "cold brew": "cold brew", cold: "cold brew", iced: "cold brew",
  aeropress: "aeropress", areopress: "aeropress",
  cappuccino: "cappuccino", cap: "cappuccino", capp: "cappuccino",
  "flat white": "flat white", flatwhite: "flat white",
  latte: "latte", "cafe latte": "latte",
  moka: "moka pot", "moka pot": "moka pot", stovetop: "moka pot",
};

const MENU_CHIPS = ["Espresso ☕", "Pour Over 🫗", "French Press", "Cold Brew 🧊", "AeroPress", "Cappuccino 🥛", "Flat White ☕", "Latte 🥛", "Moka Pot 🫖", "Surprise me ✨"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function matchDrink(input: string): Recipe | null {
  const lower = input.toLowerCase().trim();
  for (const [kw, key] of Object.entries(DRINK_KEYWORDS)) {
    if (lower.includes(kw)) return RECIPES[key] ?? null;
  }
  if (lower === "surprise me ✨" || lower === "surprise me" || lower === "surprise") {
    const keys = Object.keys(RECIPES);
    return RECIPES[keys[Math.floor(Math.random() * keys.length)]];
  }
  return null;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ConvStep = "greeting" | "ask_name" | "ask_drink" | "brewing" | "show_recipe" | "show_ingredients" | "show_shop" | "follow_up";

interface Msg {
  id: number;
  from: "barista" | "user";
  text: string;
  chips?: string[];
  isRecipeCard?: boolean;
  recipe?: Recipe;
  isIngredientCard?: boolean;
  isShopCard?: boolean;
}

// ─── Steam Animation ──────────────────────────────────────────────────────────

function SteamCup({ drinkName }: { drinkName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 select-none">
      {/* Steam wisps */}
      <div className="relative w-[120px] h-[70px] mb-1">
        {/* Wisp 1 */}
        <svg className="omc-steam-1 absolute left-[18px] top-0" width="18" height="60" viewBox="0 0 18 60" fill="none">
          <path d="M9 58 C3 48 15 38 9 28 C3 18 15 8 9 2" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {/* Wisp 2 */}
        <svg className="omc-steam-2 absolute left-[50px] top-0" width="18" height="60" viewBox="0 0 18 60" fill="none">
          <path d="M9 58 C14 48 4 38 10 28 C15 18 5 8 9 2" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {/* Wisp 3 */}
        <svg className="omc-steam-3 absolute left-[82px] top-0" width="18" height="60" viewBox="0 0 18 60" fill="none">
          <path d="M9 58 C3 48 15 38 9 28 C3 18 15 8 9 2" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {/* Wisp 4 (centre extra) */}
        <svg className="omc-steam-4 absolute left-[34px] top-[5px]" width="18" height="55" viewBox="0 0 18 55" fill="none">
          <path d="M9 53 C14 43 4 33 10 23 C15 13 5 5 9 1" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Cup SVG */}
      <svg className="omc-brew-pulse" width="120" height="100" viewBox="0 0 120 100" fill="none">
        {/* Saucer */}
        <ellipse cx="60" cy="92" rx="46" ry="7" fill="#3D2000" opacity="0.7"/>
        {/* Cup body */}
        <path d="M22 48 Q20 82 60 86 Q100 82 98 48 Z" fill="#2A1500"/>
        <path d="M22 48 Q20 82 60 86 Q100 82 98 48 Z" fill="url(#cupGrad)" opacity="0.5"/>
        {/* Cup rim */}
        <ellipse cx="60" cy="48" rx="38" ry="7" fill="#3A1F00"/>
        {/* Coffee surface */}
        <ellipse cx="60" cy="48" rx="35" ry="6" fill="#6B3A1F"/>
        <ellipse cx="56" cy="47" rx="10" ry="3" fill="#8B5A2B" opacity="0.5"/>
        {/* Handle */}
        <path d="M98 58 Q118 58 118 72 Q118 86 98 86" stroke="#3A1F00" strokeWidth="9" strokeLinecap="round" fill="none"/>
        <path d="M98 58 Q114 58 114 72 Q114 86 98 86" stroke="#5A3010" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <defs>
          <linearGradient id="cupGrad" x1="22" y1="48" x2="98" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-caramel)" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="var(--color-caramel)" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>

      <p className="mt-4 text-[0.8rem] font-semibold tracking-[0.12em] uppercase" style={{ color: "var(--color-caramel)" }}>
        Brewing your {drinkName}…
      </p>
      <p className="mt-1 text-[0.72rem]" style={{ color: "rgba(250,250,245,0.45)", fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
        Just give me a moment
      </p>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "var(--color-caramel)" }}>
        👨‍🍳
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5" style={{ background: "#1E1208" }}>
        <span className="omc-dot-1 w-2 h-2 rounded-full inline-block" style={{ background: "rgba(255,92,26,0.7)" }} />
        <span className="omc-dot-2 w-2 h-2 rounded-full inline-block" style={{ background: "rgba(255,92,26,0.7)" }} />
        <span className="omc-dot-3 w-2 h-2 rounded-full inline-block" style={{ background: "rgba(255,92,26,0.7)" }} />
      </div>
    </div>
  );
}

// ─── Recipe Card ──────────────────────────────────────────────────────────────

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mt-2 rounded-xl overflow-hidden text-[0.8rem]" style={{ background: "#120A03", border: "1px solid rgba(255,92,26,0.25)" }}>
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: "rgba(255,92,26,0.12)", borderBottom: "1px solid rgba(255,92,26,0.2)" }}>
        <span className="text-xl">{recipe.emoji}</span>
        <div>
          <p className="font-bold text-white text-[0.85rem]">{recipe.name}</p>
          <p style={{ color: "rgba(250,250,245,0.5)", fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>{recipe.tagline}</p>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {[
          ["Grind",    recipe.grind],
          ["Ratio",    recipe.ratio],
          ["Temp",     recipe.temp],
          ["Time",     recipe.brewTime],
        ].map(([label, val]) => (
          <div key={label} className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-[0.62rem] uppercase tracking-[0.1em] mb-0.5" style={{ color: "var(--color-caramel)" }}>{label}</p>
            <p className="text-white font-medium leading-tight text-[0.78rem]">{val}</p>
          </div>
        ))}
      </div>
      {/* Steps */}
      <div className="px-4 py-3">
        <p className="text-[0.62rem] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--color-caramel)" }}>Method</p>
        <ol className="space-y-2">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-2.5 leading-snug" style={{ color: "rgba(250,250,245,0.75)" }}>
              <span className="flex-shrink-0 w-4 h-4 rounded-full text-[0.6rem] flex items-center justify-center font-bold mt-0.5" style={{ background: "var(--color-caramel)", color: "#0A0804" }}>{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-3 px-3 py-2 rounded-lg text-[0.75rem] leading-snug" style={{ background: "rgba(255,92,26,0.1)", color: "rgba(250,250,245,0.7)", fontFamily: "'Fraunces', serif", fontStyle: "italic", borderLeft: "2px solid var(--color-caramel)" }}>
          💬 Marco's tip: {recipe.tip}
        </div>
      </div>
    </div>
  );
}

// ─── Ingredient Card ──────────────────────────────────────────────────────────

function IngredientCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mt-2 rounded-xl overflow-hidden text-[0.8rem]" style={{ background: "#120A03", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.1em]" style={{ background: "rgba(255,255,255,0.04)", color: "var(--color-caramel)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        Ingredients &amp; Equipment
      </div>
      <div className="px-4 pt-3 pb-1">
        <p className="text-[0.68rem] uppercase tracking-[0.08em] mb-2" style={{ color: "rgba(250,250,245,0.4)" }}>You'll need</p>
        {recipe.ingredients.map((ing, i) => (
          <div key={i} className="flex justify-between items-center py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span style={{ color: "rgba(250,250,245,0.8)" }}>{ing.item}</span>
            <span className="ml-3 flex-shrink-0 text-[0.75rem] font-semibold" style={{ color: "var(--color-caramel)" }}>{ing.amount}</span>
          </div>
        ))}
      </div>
      <div className="px-4 pt-2 pb-3">
        <p className="text-[0.68rem] uppercase tracking-[0.08em] mb-2" style={{ color: "rgba(250,250,245,0.4)" }}>Equipment</p>
        {recipe.equipment.map((eq, i) => (
          <div key={i} className="flex items-center gap-2 py-1" style={{ color: "rgba(250,250,245,0.65)" }}>
            <span style={{ color: "var(--color-caramel)" }}>·</span> {eq}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shop Card ────────────────────────────────────────────────────────────────

function ShopCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mt-2 rounded-xl overflow-hidden text-[0.8rem]" style={{ background: "#120A03", border: "1px solid rgba(255,92,26,0.2)" }}>
      <div className="px-4 py-2.5 text-[0.62rem] uppercase tracking-[0.1em]" style={{ background: "rgba(255,92,26,0.1)", color: "var(--color-caramel)", borderBottom: "1px solid rgba(255,92,26,0.15)" }}>
        Grab the supplies
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        {recipe.shopItems.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all"
            style={{ background: "rgba(255,92,26,0.08)", color: "rgba(250,250,245,0.85)", border: "1px solid rgba(255,92,26,0.15)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,92,26,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#FAFAF5"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,92,26,0.08)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,250,245,0.85)"; }}
          >
            <span>{item.name}</span>
            <span className="text-[0.7rem]" style={{ color: "var(--color-caramel)" }}>Shop →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

let msgCounter = 0;
function mkMsg(from: Msg["from"], text: string, extras?: Partial<Msg>): Msg {
  return { id: ++msgCounter, from, text, ...extras };
}

export default function BaristaChat() {
  const [open,       setOpen]       = useState(false);
  const [msgs,       setMsgs]       = useState<Msg[]>([]);
  const [step,       setStep]       = useState<ConvStep>("greeting");
  const [isBrewing,  setIsBrewing]  = useState(false);
  const [brewName,   setBrewName]   = useState("");
  const [isTyping,   setIsTyping]   = useState(false);
  const [input,      setInput]      = useState("");
  const [unread,     setUnread]     = useState(0);
  const [recipe,     setRecipe]     = useState<Recipe | null>(null);
  const [hasOpened,  setHasOpened]  = useState(false);

  const endRef    = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // ── localStorage helpers ────────────────────────────────────────────────────
  const getStoredName = () => {
    try { return localStorage.getItem("omc_guest_name") || ""; } catch { return ""; }
  };
  const setStoredName = (n: string) => {
    try { localStorage.setItem("omc_guest_name", n); } catch { /* noop */ }
  };
  const getStoredDrink = () => {
    try { return localStorage.getItem("omc_last_brew") || ""; } catch { return ""; }
  };
  const setStoredDrink = (d: string) => {
    try { localStorage.setItem("omc_last_brew", d); } catch { /* noop */ }
  };

  // ── Add a barista message with a typing delay ───────────────────────────────
  const addBarista = useCallback((text: string, delay = 700, extras?: Partial<Msg>) => {
    return new Promise<void>(resolve => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMsgs(prev => [...prev, mkMsg("barista", text, extras)]);
        if (!open) setUnread(u => u + 1);
        resolve();
      }, delay);
    });
  }, [open]);

  // ── Scroll to bottom on new messages ────────────────────────────────────────
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, isTyping, isBrewing]);

  // ── Focus input when chat opens ──────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // ── Start conversation on first open ────────────────────────────────────────
  useEffect(() => {
    if (!open || hasOpened) return;
    setHasOpened(true);

    const name      = getStoredName();
    const lastDrink = getStoredDrink();

    const run = async () => {
      if (name) {
        // Returning visitor
        await addBarista(`${getGreeting()}! Welcome back, ${name}. Great to see you again. ☕`, 600);
        if (lastDrink) {
          await addBarista(
            `Last time you were in the mood for a ${lastDrink} — shall I make that again? Or are you feeling something different today?`,
            900,
            {
              chips: [
                `${lastDrink} again please!`,
                "Something different",
                "Show me the menu",
              ]
            }
          );
          setStep("ask_drink");
        } else {
          await addBarista(
            "What can I brew for you today?",
            800,
            { chips: MENU_CHIPS }
          );
          setStep("ask_drink");
        }
      } else {
        // First visit
        await addBarista(`${getGreeting()}! Welcome to One More Cup. ☕`, 500);
        await addBarista("I'm Marco, your barista. Pull up a stool — I'll get something perfect on for you.", 900);
        await addBarista("First things first — what's your name?", 800);
        setStep("ask_name");
      }
    };

    run();
  }, [open, hasOpened, addBarista]);

  // ── Brew sequence ────────────────────────────────────────────────────────────
  const startBrew = useCallback(async (rec: Recipe, name: string) => {
    setRecipe(rec);
    setStoredDrink(rec.name);
    setBrewName(rec.name);
    setStep("brewing");
    setIsBrewing(true);

    // Brewing lasts 3.8 seconds
    await new Promise<void>(resolve => setTimeout(resolve, 3800));
    setIsBrewing(false);

    // Now drip out the recipe in parts
    await addBarista(`There we go — your ${rec.name} is ready, ${name || "friend"}. ☕ Here's the full recipe:`, 400, {
      isRecipeCard: true,
      recipe: rec,
    });
    setStep("show_ingredients");
    await addBarista("And here's everything you'll need:", 900, {
      isIngredientCard: true,
      recipe: rec,
    });
    setStep("show_shop");
    await addBarista("Want to grab the supplies? I've got you covered:", 900, {
      isShopCard: true,
      recipe: rec,
    });
    setStep("follow_up");
    await addBarista(
      `How does that sound? Can I get anything else for you today?`,
      900,
      {
        chips: ["Make me another ☕", "Tell me about the beans", "Coffee origins 🌍", "I'm all set, thanks!"],
      }
    );
  }, [addBarista]);

  // ── Handle user input ────────────────────────────────────────────────────────
  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");

    setMsgs(prev => [...prev, mkMsg("user", trimmed)]);

    const name = getStoredName();

    // ── ask_name ───────────────────────────────────────────────────────────────
    if (step === "ask_name") {
      const cleanName = trimmed.replace(/^(i'm|i am|my name is|call me)\s+/i, "").split(" ")[0];
      const cap = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      setStoredName(cap);
      await addBarista(`Lovely to meet you, ${cap}! 😊`, 500);
      await addBarista(
        "So, what are you in the mood for today? I can brew any of these for you:",
        700,
        { chips: MENU_CHIPS }
      );
      setStep("ask_drink");
      return;
    }

    // ── ask_drink or follow_up ────────────────────────────────────────────────
    if (step === "ask_drink" || step === "follow_up") {
      const lower = trimmed.toLowerCase();

      // "all set" / "thanks" / dismiss
      if (lower.match(/all set|no thanks|nothing|that'?s? (all|it)|goodbye|bye|cheers/)) {
        await addBarista(`Pleasure, ${name || "friend"}! Come back whenever you need a brew. ☕`, 600);
        return;
      }

      // Origins / beans info
      if (lower.match(/origin|bean|farm|ethiopia|colombia|rwanda|kenya|panama/)) {
        await addBarista(
          "Ooh, that's my favourite topic. Head up to the magazine — our Features section has full-length stories from Ethiopia, Colombia, Panama, and Rwanda. Each one will make you want to book a flight. ✈️",
          700,
          { chips: ["Brew me something from Ethiopia ☕", "Show me the menu", "I'm all set, thanks!"] }
        );
        return;
      }

      // "another" / "menu"
      if (lower.match(/another|menu|something (different|else)|show me/)) {
        await addBarista(
          "Of course! What are you feeling?",
          500,
          { chips: MENU_CHIPS }
        );
        return;
      }

      // Try to match a drink
      const rec = matchDrink(trimmed);
      if (rec) {
        await addBarista(`${rec.name}? Excellent choice. Give me just a moment — I'll get that going.`, 600);
        await startBrew(rec, name);
      } else {
        await addBarista(
          `Hmm, I'm not sure I know that one. Here's what I can make for you today — pick one!`,
          700,
          { chips: MENU_CHIPS }
        );
      }
      return;
    }

    // ── brewing (shouldn't happen but handle gracefully) ──────────────────────
    if (step === "brewing") {
      await addBarista("Bear with me — still brewing! ☕", 400);
      return;
    }

    // ── fallback ──────────────────────────────────────────────────────────────
    await addBarista(
      "I'm best at brewing coffee! What can I make for you?",
      500,
      { chips: MENU_CHIPS }
    );
  }, [step, addBarista, startBrew]);

  const handleChip = (chip: string) => handleSend(chip);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend(input);
  };

  // ── Find last chips to show (from last barista message) ──────────────────────
  const lastChips = [...msgs].reverse().find(m => m.from === "barista" && m.chips)?.chips;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Toggle Button ─────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close barista chat" : "Open barista chat"}
        className="fixed bottom-6 right-6 z-[900] w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl transition-all"
        style={{
          background: open ? "#0A0804" : "var(--color-caramel)",
          border: open ? "2px solid var(--color-caramel)" : "none",
          boxShadow: "0 4px 24px rgba(255,92,26,0.4)",
          transform: open ? "scale(0.95)" : "scale(1)",
        }}
        onMouseEnter={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-caramel-light)"; }}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-caramel)"; }}
      >
        {open ? "✕" : "☕"}
        {!open && unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[0.65rem] font-bold flex items-center justify-center"
            style={{ background: "var(--color-caramel-light)", color: "#0A0804" }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat Window ────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="omc-chat-in fixed bottom-24 right-6 z-[890] flex flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{
            width: "clamp(320px, 90vw, 400px)",
            height: "clamp(480px, 80vh, 580px)",
            background: "#0A0804",
            border: "1px solid rgba(255,92,26,0.3)",
          }}
        >
          {/* ── Header ───────────────────────────────────────────────────── */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "#110900", borderBottom: "1px solid rgba(255,92,26,0.2)" }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "var(--color-caramel)" }}>
              👨‍🍳
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[0.9rem] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>
                Marco <span style={{ color: "var(--color-caramel)" }}>· Barista</span>
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: isBrewing ? "var(--color-caramel-light)" : "#22C55E" }} />
                <span className="text-[0.65rem] tracking-[0.08em]" style={{ color: "rgba(250,250,245,0.45)" }}>
                  {isBrewing ? "Brewing…" : "Online · One More Cup Café"}
                </span>
              </div>
            </div>
            <p className="text-[1rem]" style={{ color: "rgba(250,250,245,0.2)" }}>☕</p>
          </div>

          {/* ── Messages / Brewing Animation ─────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1" style={{ scrollbarWidth: "none" }}>

            {/* Brewing overlay */}
            {isBrewing ? (
              <div className="flex flex-col items-center justify-center h-full">
                <SteamCup drinkName={brewName} />
              </div>
            ) : (
              <>
                {msgs.map((msg) => (
                  <div
                    key={msg.id}
                    className={`omc-msg-in flex ${msg.from === "user" ? "justify-end" : "items-end gap-2"} mb-2`}
                  >
                    {msg.from === "barista" && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 self-end mb-0.5" style={{ background: "var(--color-caramel)" }}>
                        👨‍🍳
                      </div>
                    )}
                    <div className={`max-w-[82%] ${msg.from === "user" ? "" : ""}`}>
                      {/* Text bubble */}
                      <div
                        className="px-4 py-2.5 rounded-2xl text-[0.83rem] leading-relaxed"
                        style={
                          msg.from === "barista"
                            ? { background: "#1E1208", color: "rgba(250,250,245,0.88)", borderBottomLeftRadius: "4px" }
                            : { background: "var(--color-caramel)", color: "#0A0804", fontWeight: 600, borderBottomRightRadius: "4px" }
                        }
                      >
                        {msg.text}
                      </div>
                      {/* Recipe card */}
                      {msg.isRecipeCard && msg.recipe && <RecipeCard recipe={msg.recipe} />}
                      {/* Ingredient card */}
                      {msg.isIngredientCard && msg.recipe && <IngredientCard recipe={msg.recipe} />}
                      {/* Shop card */}
                      {msg.isShopCard && msg.recipe && <ShopCard recipe={msg.recipe} />}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={endRef} />
              </>
            )}
          </div>

          {/* ── Quick Reply Chips ─────────────────────────────────────────── */}
          {!isBrewing && lastChips && lastChips.length > 0 && (
            <div
              className="flex-shrink-0 px-4 py-2 flex flex-wrap gap-1.5 overflow-x-auto"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0D0704", scrollbarWidth: "none" }}
            >
              {lastChips.map((chip, i) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  className={`omc-chip-in flex-shrink-0 px-3 py-1.5 rounded-full text-[0.75rem] font-semibold transition-all cursor-pointer`}
                  style={{
                    background: "rgba(255,92,26,0.1)",
                    color: "var(--color-caramel)",
                    border: "1px solid rgba(255,92,26,0.3)",
                    animationDelay: `${i * 60}ms`,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-caramel)"; (e.currentTarget as HTMLButtonElement).style.color = "#0A0804"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,92,26,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--color-caramel)"; }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* ── Input ────────────────────────────────────────────────────── */}
          <div
            className="flex-shrink-0 flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0D0704" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isBrewing ? "Brewing…" : step === "ask_name" ? "Type your name…" : "Ask me anything…"}
              disabled={isBrewing}
              className="flex-1 bg-transparent text-[0.83rem] outline-none placeholder-white/20"
              style={{
                color: "rgba(250,250,245,0.88)",
                caretColor: "var(--color-caramel)",
                padding: "0.5rem 0.75rem",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isBrewing || !input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: input.trim() && !isBrewing ? "var(--color-caramel)" : "rgba(255,92,26,0.2)",
                color: input.trim() && !isBrewing ? "#0A0804" : "rgba(255,92,26,0.4)",
              }}
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L6.5 7.5M13 1L9 13L6.5 7.5M13 1L1 5L6.5 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
