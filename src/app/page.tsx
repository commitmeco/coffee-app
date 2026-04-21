"use client";

import { useState, useEffect, useRef } from "react";
import ArticleModal, { type ArticleId } from "@/components/ArticleModal";
import { useCart } from "@/components/CartProvider";

/* ── Toast ──────────────────────────────────────────────────── */
function useToast() {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toast(text: string) {
    setMsg(text);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2800);
  }
  return { msg, visible, toast };
}

/* ── Tag pill ───────────────────────────────────────────────── */
const PILL_COLORS: Record<string, string> = {
  default: "#FF5C1A",
  yellow:  "#FFD700",
  teal:    "#1A7A6E",
  pink:    "#FF3D6B",
  sage:    "#6B8C5E",
};

function TagPill({ label, color = "default" }: { label: string; color?: string }) {
  const bg = PILL_COLORS[color] ?? color;
  const textColor = color === "yellow" ? "#0A0804" : "white";
  return (
    <span
      className="inline-block text-[0.62rem] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm"
      style={{ background: bg, color: textColor }}
    >
      {label}
    </span>
  );
}

/* ── Section divider ────────────────────────────────────────── */
function SectionBar({ label, meta }: { label: string; meta?: string }) {
  return (
    <div className="flex items-center gap-4 px-12 py-6" style={{ borderBottom: "1px solid rgba(10,8,4,0.1)" }}>
      <span
        className="text-[0.9rem] tracking-[0.2em] shrink-0"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FF5C1A" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(10,8,4,0.1)" }} />
      {meta && <span className="text-[0.7rem] uppercase tracking-[0.06em] shrink-0" style={{ color: "#8B7355" }}>{meta}</span>}
    </div>
  );
}

/* ── Scroll reveal hook ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  const [articleId, setArticleId] = useState<ArticleId>(null);
  const { toast, msg, visible } = useToast();
  const { addItem } = useCart();

  function openArticle(id: ArticleId) { setArticleId(id); }

  function addToCart(name: string) {
    addItem({ id: `omc-${name}`, name, price: 0, quantity: 1 });
    toast(`${name} added to cart 🛒`);
  }

  /* Scroll-reveal refs */
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  const r4 = useReveal(), r5 = useReveal(), r6 = useReveal();

  return (
    <>
      {/* Google Fonts for OMC magazine typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&display=swap');
        body { background: #FAFAF5 !important; color: #0A0804 !important; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="grid min-h-[92vh]"
        style={{ gridTemplateColumns: "1fr 1fr", minHeight: 650 }}
      >
        {/* Left — text */}
        <div
          className="flex flex-col justify-center px-12 py-16 relative overflow-hidden"
          style={{ background: "#0A0804" }}
        >
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: "#FF5C1A", opacity: 0.08 }} />
          <div className="absolute -bottom-20 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "#FFD700", opacity: 0.06 }} />

          <div className="relative z-10 max-w-[560px]">
            <div className="omc-fade-1 inline-flex items-center gap-2 text-white text-[0.68rem] font-bold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-sm mb-6" style={{ background: "#FF5C1A" }}>
              📰 April 2025 — Issue 47
            </div>
            <p className="omc-fade-2 text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#FF5C1A" }}>
              Cover Story · Ethiopia
            </p>
            <h1
              className="omc-fade-3 leading-[0.95] mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem,6vw,5.5rem)", letterSpacing: "0.02em", color: "white" }}
            >
              The Last Wild
              <em style={{ color: "#FFD700", fontStyle: "normal", display: "block" }}>Coffee Forest</em>
            </h1>
            <p
              className="omc-fade-4 text-[1.05rem] leading-[1.65] mb-8 max-w-[420px]"
              style={{ fontFamily: "'Fraunces', serif", color: "rgba(250,250,245,0.72)", fontStyle: "italic", fontWeight: 300 }}
            >
              Deep in Ethiopia's Kaffa region, where coffee was born, a vanishing ecosystem holds secrets that could redefine how we understand and taste the world's most beloved drink.
            </p>
            <div className="omc-fade-5 flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0" style={{ background: "linear-gradient(135deg,#C4843A,#FF5C1A)", border: "2px solid rgba(255,92,26,0.4)" }}>
                👤
              </div>
              <div>
                <div className="text-white font-semibold text-[0.78rem]">Elena Vasquez</div>
                <div className="text-[0.7rem] tracking-[0.04em]" style={{ color: "rgba(250,250,245,0.45)" }}>Field Correspondent · Addis Ababa</div>
              </div>
            </div>
            <div className="omc-fade-6 flex gap-3">
              <button
                onClick={() => openArticle("wild-forest")}
                className="text-[0.8rem] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm cursor-pointer transition-all text-white"
                style={{ background: "#FF5C1A" }}
                onMouseEnter={(e) => { e.currentTarget.style.background="#FFD700"; e.currentTarget.style.color="#0A0804"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="#FF5C1A"; e.currentTarget.style.color="white"; e.currentTarget.style.transform="translateY(0)"; }}
              >
                Read the Story →
              </button>
              <a
                href="#destinations"
                className="text-[0.8rem] font-semibold tracking-[0.06em] uppercase px-6 py-3.5 rounded-sm cursor-pointer transition-all"
                style={{ background: "transparent", border: "1px solid rgba(250,250,245,0.2)", color: "rgba(250,250,245,0.65)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="#FF5C1A"; e.currentTarget.style.color="#FF5C1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(250,250,245,0.2)"; e.currentTarget.style.color="rgba(250,250,245,0.65)"; }}
              >
                3 Days in Ethiopia
              </a>
            </div>
          </div>
        </div>

        {/* Right — illustrated landscape */}
        <div className="relative overflow-hidden" style={{ background: "#1A120C" }}>
          <svg className="omc-hero-zoom w-full h-full absolute inset-0 object-cover" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.85 }}>
            <defs>
              <radialGradient id="sky" cx="50%" cy="30%">
                <stop offset="0%" stopColor="#FF8C4A"/><stop offset="40%" stopColor="#FF5C1A"/><stop offset="100%" stopColor="#1A0A04"/>
              </radialGradient>
              <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D5A1B"/><stop offset="100%" stopColor="#1A3410"/>
              </linearGradient>
              <linearGradient id="fore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A2E10"/><stop offset="100%" stopColor="#0A1508"/>
              </linearGradient>
            </defs>
            <rect width="800" height="700" fill="url(#sky)"/>
            <ellipse cx="400" cy="180" rx="120" ry="80" fill="rgba(255,220,100,0.25)"/>
            <ellipse cx="400" cy="200" rx="60" ry="40" fill="rgba(255,240,160,0.4)"/>
            <path d="M0,380 Q100,280 200,320 Q300,260 400,300 Q500,240 600,290 Q700,260 800,310 L800,700 L0,700Z" fill="#1C3A0E" opacity="0.6"/>
            <path d="M0,420 Q120,340 250,370 Q380,320 520,360 Q640,300 800,350 L800,700 L0,700Z" fill="url(#hill1)"/>
            <ellipse cx="200" cy="390" rx="180" ry="40" fill="rgba(255,220,150,0.15)"/>
            <path d="M0,500 Q200,440 400,460 Q600,420 800,470 L800,700 L0,700Z" fill="#3D7A28" opacity="0.8"/>
            <path d="M0,580 Q200,520 400,540 Q600,500 800,545 L800,700 L0,700Z" fill="url(#fore)"/>
            <g fill="#0D1E08">
              <ellipse cx="80" cy="570" rx="35" ry="45"/><rect x="75" y="570" width="10" height="60"/>
              <ellipse cx="160" cy="555" rx="45" ry="55"/><rect x="155" y="575" width="10" height="65"/>
              <ellipse cx="260" cy="565" rx="38" ry="48"/><rect x="255" y="582" width="10" height="58"/>
              <ellipse cx="650" cy="558" rx="42" ry="52"/><rect x="645" y="575" width="10" height="62"/>
              <ellipse cx="730" cy="568" rx="36" ry="46"/><rect x="725" y="582" width="10" height="58"/>
            </g>
            <g fill="#C0392B" opacity="0.8">
              <circle cx="65" cy="558" r="4"/><circle cx="88" cy="548" r="3.5"/><circle cx="78" cy="565" r="3"/>
              <circle cx="148" cy="542" r="4"/><circle cx="168" cy="535" r="3.5"/><circle cx="175" cy="550" r="3"/>
            </g>
            <g fill="rgba(255,240,200,0.7)">
              <circle cx="100" cy="80" r="1.5"/><circle cx="200" cy="60" r="1"/><circle cx="340" cy="90" r="1.5"/>
              <circle cx="560" cy="70" r="1"/><circle cx="700" cy="100" r="1.5"/><circle cx="480" cy="40" r="1.5"/>
            </g>
            <rect width="800" height="700" fill="rgba(10,8,4,0.2)"/>
          </svg>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right,rgba(10,8,4,0.3) 0%,transparent 60%),linear-gradient(to top,rgba(10,8,4,0.4) 0%,transparent 40%)" }} />
          <div
            className="absolute top-8 left-8 text-white text-[1.1rem] tracking-[0.1em] px-4 py-2 rounded-sm"
            style={{ fontFamily: "'Bebas Neue', sans-serif", background: "#FF5C1A", transform: "rotate(-3deg)" }}
          >
            COVER STORY
          </div>
          <div
            className="absolute bottom-8 right-8 text-[0.68rem] px-3 py-2 rounded-sm tracking-[0.06em]"
            style={{ background: "rgba(10,8,4,0.75)", color: "rgba(250,250,245,0.7)", backdropFilter: "blur(6px)", borderLeft: "2px solid #FF5C1A" }}
          >
            Kaffa Forest Reserve, Ethiopia · Photography: Marco Bellini
          </div>
        </div>
      </section>

      {/* ── LATEST STORIES ──────────────────────────────────────── */}
      <SectionBar label="Latest Stories" meta="April 10, 2025" />

      <div className="px-12 py-8 grid gap-6" style={{ gridTemplateColumns: "2fr 1fr" }}>

        {/* Feature card */}
        <div
          className="relative rounded-sm overflow-hidden cursor-pointer group"
          style={{ minHeight: 550, background: "#0A0804" }}
          onClick={() => openArticle("panama-gesha")}
        >
          <svg className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" viewBox="0 0 700 560" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.75 }}>
            <defs>
              <linearGradient id="fg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A4A20"/><stop offset="100%" stopColor="#0D2A12"/>
              </linearGradient>
              <radialGradient id="sunburst" cx="75%" cy="20%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6"/><stop offset="100%" stopColor="transparent"/>
              </radialGradient>
            </defs>
            <rect width="700" height="560" fill="#0D2A12"/>
            <rect width="700" height="560" fill="url(#sunburst)"/>
            <path d="M0,200 Q175,140 350,180 Q525,120 700,165 L700,560 L0,560Z" fill="#1A4A20"/>
            <path d="M0,260 Q175,200 350,240 Q525,180 700,220 L700,560 L0,560Z" fill="#1E5526"/>
            <path d="M0,320 Q175,265 350,300 Q525,245 700,280 L700,560 L0,560Z" fill="#22602C"/>
            <g fill="#145A1C">
              <ellipse cx="80" cy="280" rx="28" ry="35"/><ellipse cx="180" cy="265" rx="32" ry="40"/>
              <ellipse cx="290" cy="275" rx="28" ry="36"/><ellipse cx="410" cy="258" rx="30" ry="38"/>
              <ellipse cx="530" cy="270" rx="28" ry="35"/>
            </g>
            <g>
              <circle cx="70" cy="272" r="5" fill="#C0392B"/><circle cx="86" cy="268" r="4.5" fill="#E74C3C"/>
              <circle cx="175" cy="255" r="5" fill="#E74C3C"/><circle cx="285" cy="265" r="5" fill="#E74C3C"/>
              <circle cx="405" cy="248" r="5" fill="#E74C3C"/><circle cx="525" cy="258" r="5" fill="#E74C3C"/>
            </g>
            <g fill="#0A1E0E">
              <circle cx="350" cy="355" r="14"/>
              <rect x="344" y="369" width="12" height="35" rx="4"/>
              <ellipse cx="350" cy="344" rx="20" ry="6"/><ellipse cx="350" cy="344" rx="12" ry="14"/>
            </g>
            <path d="M325,400 L375,400 L370,430 L330,430Z" fill="#8B6914"/>
            <g fill="#C0392B"><circle cx="338" cy="397" r="5"/><circle cx="350" cy="394" r="5"/><circle cx="362" cy="397" r="5"/></g>
            <rect width="700" height="560" fill="rgba(10,8,4,0.35)"/>
          </svg>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(10,8,4,0.95) 0%,rgba(10,8,4,0.3) 50%,transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <TagPill label="Exclusive" color="yellow" />
            <h2
              className="text-white leading-none mt-3 mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", letterSpacing: "0.03em" }}
            >
              Inside Panama's<br />Gesha Revolution
            </h2>
            <p className="mb-4 text-[0.88rem] leading-[1.6]" style={{ fontFamily: "'Fraunces', serif", color: "rgba(250,250,245,0.72)", fontStyle: "italic", fontWeight: 300 }}>
              How one family farm in Chiriquí province changed everything we thought we knew about premium coffee — and why the world's most expensive beans might also be its most sustainable.
            </p>
            <div className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.06em]" style={{ color: "rgba(250,250,245,0.45)" }}>
              <span>By James Thornton</span><span>·</span><span>12 min read</span>
            </div>
          </div>
        </div>

        {/* Side cards */}
        <div className="flex flex-col gap-6">
          {[
            { id: "tokyo-cafes" as ArticleId,            tag: "Destinations", tagColor: "teal",  title: "Tokyo's Third Wave: The 10 Cafés Rewriting Coffee Culture", blurb: "From Shimokitazawa to Yanaka, Japan's capital has become the world's most exciting specialty coffee city.", meta: "7 min read · Tokyo, Japan" },
            { id: "anaerobic-fermentation" as ArticleId, tag: "Science",       tagColor: "pink",  title: "Anaerobic Fermentation Is Changing Coffee Forever",          blurb: "The controversial technique borrowed from winemaking is producing the most polarizing coffees in history.",  meta: "9 min read · Specialty Science" },
          ].map((s) => (
            <div
              key={s.id}
              className="omc-card-lift rounded-sm overflow-hidden cursor-pointer flex flex-col"
              style={{ background: "#F5ECD7", flex: 1 }}
              onClick={() => openArticle(s.id)}
            >
              <div className="h-[160px] overflow-hidden relative" style={{ background: "#2C1810" }}>
                <div className="w-full h-full" style={{ background: "linear-gradient(135deg,#3D2000,#1A0D00)" }} />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <TagPill label={s.tag} color={s.tagColor} />
                <h3 className="mt-2 mb-2 font-bold leading-[1.3]" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.05rem", color: "#0A0804" }}>
                  {s.title}
                </h3>
                <p className="text-[0.78rem] leading-[1.6] flex-1" style={{ color: "#8B7355" }}>{s.blurb}</p>
                <div className="mt-3 text-[0.65rem] uppercase tracking-[0.06em] flex gap-2 items-center" style={{ color: "#8B7355" }}>
                  <span style={{ color: "#FF5C1A" }}>{s.meta.split("·")[0].trim()}</span>
                  <span>·</span><span>{s.meta.split("·")[1].trim()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESTINATIONS ────────────────────────────────────────── */}
      <div id="destinations">
        <SectionBar label="Destination Guide" meta="3 Days In..." />
      </div>

      {/* Oaxaca spread */}
      <div
        className="mx-12 mb-12 rounded-md overflow-hidden grid cursor-pointer transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(255,92,26,0.2)]"
        style={{ gridTemplateColumns: "1.2fr 0.8fr", minHeight: 480, background: "#0A0804" }}
        onClick={() => openArticle("oaxaca-3days")}
      >
        <div className="relative overflow-hidden" style={{ background: "#1A0D00" }}>
          <svg className="w-full h-full absolute inset-0 object-cover opacity-80 transition-transform duration-[6s] hover:scale-[1.03]" viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="oaxSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#87CEEB"/><stop offset="60%" stopColor="#FFB347"/><stop offset="100%" stopColor="#FF6B35"/>
              </linearGradient>
            </defs>
            <rect width="600" height="520" fill="url(#oaxSky)"/>
            <rect x="150" y="150" width="300" height="280" fill="#C8A450"/>
            <rect x="160" y="80" width="70" height="200" fill="#C0963C"/>
            <rect x="370" y="80" width="70" height="200" fill="#C0963C"/>
            <path d="M258,430 L258,320 Q300,290 342,320 L342,430Z" fill="#1A1200"/>
            <rect x="0" y="430" width="600" height="90" fill="#8B7350"/>
            <path d="M40,410 Q80,395 120,410" fill="#FF5C1A"/>
            <path d="M480,408 Q520,393 560,408" fill="#FF5C1A"/>
            <rect width="600" height="520" fill="rgba(10,5,0,0.25)"/>
          </svg>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right,transparent 60%,rgba(10,8,4,0.8) 100%)" }} />
          <div
            className="absolute top-8 left-8 leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "5rem", color: "rgba(255,92,26,0.35)" }}
          >03</div>
          <div className="absolute bottom-8 left-8 text-4xl">🇲🇽</div>
        </div>
        <div className="p-12 flex flex-col justify-center">
          <div
            className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#FF5C1A" }}
          >
            <span className="w-8 h-0.5 inline-block" style={{ background: "#FF5C1A" }} />
            3 Days In
          </div>
          <h2
            className="leading-none mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "white", letterSpacing: "0.04em" }}
          >
            Oaxaca,<br /><em style={{ color: "#FFD700", fontStyle: "normal" }}>Mexico</em>
          </h2>
          <p className="mb-6 text-[0.9rem] leading-[1.7]" style={{ fontFamily: "'Fraunces', serif", color: "rgba(250,250,245,0.7)", fontStyle: "italic", fontWeight: 300 }}>
            Where ancient mole traditions meet single-origin coffee culture. Oaxaca's Sierra Norte highlands are quietly producing some of Mexico's most extraordinary beans.
          </p>
          <ul className="mb-8 space-y-4">
            {[
              { day: "Day 01", title: "Arrive, Orient, Caffeinate", desc: "Check in to Casa Oaxaca. First pour-over at Café Brujula — order the Sierra Norte natural process." },
              { day: "Day 02", title: "Farm Visit & Market Immersion", desc: "Dawn ride to Finca El Paraíso, 2,200m. Watch hand-sorting, tour fermentation tanks." },
              { day: "Day 03", title: "Roastery Tour & Mezcal Pairing", desc: "Morning at Origen Tostadores. Evening: mezcal and coffee cocktail flight at In Situ." },
            ].map((d) => (
              <li key={d.day} className="flex gap-4 pb-4" style={{ borderBottom: "1px solid rgba(250,250,245,0.08)" }}>
                <span className="text-[0.85rem] tracking-[0.1em] min-w-[48px] pt-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FF5C1A" }}>{d.day}</span>
                <div>
                  <div className="text-[0.82rem] font-semibold text-white mb-0.5">{d.title}</div>
                  <div className="text-[0.73rem] leading-[1.5]" style={{ color: "rgba(250,250,245,0.5)" }}>{d.desc}</div>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="w-fit text-[0.8rem] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm cursor-pointer transition-all text-white"
            style={{ background: "#FF5C1A" }}
            onClick={(e) => { e.stopPropagation(); openArticle("oaxaca-3days"); }}
            onMouseEnter={(e) => { e.currentTarget.style.background="#FFD700"; e.currentTarget.style.color="#0A0804"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="#FF5C1A"; e.currentTarget.style.color="white"; }}
          >
            Full Itinerary →
          </button>
        </div>
      </div>

      {/* More destinations strip */}
      <div className="px-12 pb-12">
        <div className="flex items-baseline gap-4 mb-6">
          <h2 className="text-[2rem] tracking-[0.05em]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            More <em style={{ color: "#FF5C1A", fontStyle: "normal" }}>Destinations</em>
          </h2>
          <a href="#" className="ml-auto text-[0.72rem] font-semibold tracking-[0.1em] uppercase cursor-pointer" style={{ color: "#FF5C1A" }}>All Guides →</a>
        </div>
        <div ref={r1} className="omc-reveal grid grid-cols-4 gap-5">
          {[
            { id: "colombia" as ArticleId,    tag: "Colombia", tagColor: "default", title: "Huila & Nariño: Colombia's Twin Coffee Crowns", meta: "🇨🇴 · 4 days", bg: "#0D2A0A" },
            { id: "ethiopia-trip" as ArticleId, tag: "Ethiopia", tagColor: "sage",    title: "Yirgacheffe: A Pilgrim's Coffee Journey",           meta: "🇪🇹 · 5 days", bg: "#1A0A04" },
            { id: "kyoto" as ArticleId,        tag: "Japan",    tagColor: "pink",    title: "Kyoto's Hidden Kissaten — Old School Perfection",    meta: "🇯🇵 · 3 days", bg: "#1A0814" },
            { id: "rwanda" as ArticleId,       tag: "Rwanda",   tagColor: "teal",    title: "Land of a Thousand Hills, One Perfect Cup",          meta: "🇷🇼 · 4 days", bg: "#0A1A0A" },
          ].map((c) => (
            <div
              key={c.id}
              className="omc-card-lift rounded-sm overflow-hidden cursor-pointer"
              style={{ background: "#0A0804" }}
              onClick={() => openArticle(c.id)}
            >
              <div className="h-[200px] relative" style={{ background: c.bg, opacity: 0.9 }} />
              <div className="p-4" style={{ background: "#F5ECD7" }}>
                <TagPill label={c.tag} color={c.tagColor} />
                <h3 className="mt-2 mb-1.5 font-bold leading-[1.35] text-[0.95rem]" style={{ fontFamily: "'Fraunces', serif", color: "#0A0804" }}>
                  {c.title}
                </h3>
                <div className="text-[0.68rem] uppercase tracking-[0.05em]" style={{ color: "#8B7355" }}>{c.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── INTERVIEW ───────────────────────────────────────────── */}
      <SectionBar label="In Conversation" meta="Producer Profile" />

      <div ref={r2} className="omc-reveal mx-12 mb-12 grid overflow-hidden rounded-md" style={{ gridTemplateColumns: "1fr 1fr", background: "#F5ECD7" }}>
        {/* Photo side */}
        <div className="relative overflow-hidden" style={{ background: "#1A0D05", minHeight: 500 }}>
          <svg className="w-full h-full absolute inset-0 object-cover opacity-75" viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg">
            <rect width="500" height="600" fill="#1A0D05"/>
            <path d="M0,200 Q125,140 250,175 Q375,120 500,160 L500,600 L0,600Z" fill="#1A4010"/>
            <path d="M0,280 Q150,230 300,255 Q420,220 500,245 L500,600 L0,600Z" fill="#20501A"/>
            <circle cx="250" cy="270" r="35" fill="#8B5E3C"/>
            <ellipse cx="250" cy="248" rx="42" ry="12" fill="#3D2800"/>
            <ellipse cx="250" cy="245" rx="28" ry="20" fill="#4A3200"/>
            <path d="M210,305 Q250,295 290,305 L300,420 Q250,430 200,420Z" fill="#E8D5B0"/>
            <path d="M210,315 Q175,340 165,370" stroke="#8B5E3C" strokeWidth="22" strokeLinecap="round" fill="none"/>
            <path d="M290,315 Q325,340 335,370" stroke="#8B5E3C" strokeWidth="22" strokeLinecap="round" fill="none"/>
            <path d="M200,420 L190,530 L230,530 L250,470 L270,530 L310,530 L300,420Z" fill="#4A3200"/>
            <g fill="#1C4A12"><ellipse cx="80" cy="310" rx="40" ry="50"/><ellipse cx="420" cy="300" rx="45" ry="55"/></g>
            <g fill="#C0392B">
              <circle cx="68" cy="298" r="5"/><circle cx="82" cy="290" r="4.5"/><circle cx="95" cy="300" r="5"/>
              <circle cx="410" cy="288" r="5"/><circle cx="425" cy="280" r="4.5"/><circle cx="440" cy="290" r="5"/>
            </g>
            <rect width="500" height="600" fill="rgba(10,5,0,0.3)"/>
          </svg>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top,rgba(44,24,16,0.8) 0%,transparent 50%)" }} />
          <div
            className="absolute top-8 right-8 text-[#0A0804] text-[0.9rem] tracking-[0.12em] px-4 py-2 rounded-sm"
            style={{ fontFamily: "'Bebas Neue', sans-serif", background: "#FFD700", transform: "rotate(3deg)" }}
          >
            Q&A
          </div>
          <div className="absolute bottom-8 left-8">
            <div className="text-white text-[1.8rem] leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>Don Pachi Serracín</div>
            <div className="text-[0.72rem] uppercase tracking-[0.08em]" style={{ color: "rgba(250,250,245,0.6)" }}>5th Generation Coffee Producer · Chiriquí, Panama</div>
          </div>
        </div>

        {/* Content side */}
        <div className="p-12">
          <h2
            className="leading-none mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", letterSpacing: "0.04em", color: "#0A0804" }}
          >
            "Coffee is not a{" "}
            <em style={{ color: "#FF5C1A", fontStyle: "normal" }}>product</em>.
            <br />It's a language."
          </h2>
          <p className="mb-8 text-[0.95rem] leading-[1.65]" style={{ fontFamily: "'Fraunces', serif", color: "#8B7355", fontStyle: "italic", fontWeight: 300 }}>
            At 4,800 feet above the Barú volcano, the Serracín family has been growing Gesha since 1963. We sat with Don Pachi at dawn as workers began the first pick of the season.
          </p>
          <div className="mb-6">
            <p className="text-[0.72rem] font-bold tracking-[0.1em] uppercase mb-1.5" style={{ color: "#FF5C1A" }}>
              OMC: When did you first understand you had something truly special?
            </p>
            <p className="text-[0.88rem] leading-[1.7]" style={{ fontFamily: "'Fraunces', serif", color: "#0A0804", fontWeight: 300 }}>
              It was 2004. We submitted to Best of Panama almost as an afterthought. When that Gesha lot sold for over $21 a pound — three times anything before — I knew we were dealing with something that changed the rules. I sat with my father and we both cried.
            </p>
          </div>
          <blockquote
            className="px-6 py-4 mb-6"
            style={{ borderLeft: "4px solid #FF5C1A", background: "rgba(255,92,26,0.06)" }}
          >
            <p className="text-[1.1rem] leading-[1.55]" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}>
              "When a buyer in Tokyo tells me they can taste the volcanic soil, the morning mist, the hands that picked — that is the highest compliment in any language."
            </p>
            <cite className="block mt-2 text-[0.7rem] uppercase tracking-[0.08em]" style={{ color: "#8B7355" }}>— Don Pachi Serracín</cite>
          </blockquote>
          <button
            className="text-[0.8rem] font-bold tracking-[0.08em] uppercase px-7 py-3.5 rounded-sm cursor-pointer transition-all text-white"
            style={{ background: "#FF5C1A" }}
            onClick={() => openArticle("panama-interview")}
            onMouseEnter={(e) => { e.currentTarget.style.background="#FFD700"; e.currentTarget.style.color="#0A0804"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="#FF5C1A"; e.currentTarget.style.color="white"; }}
          >
            Read Full Interview →
          </button>
        </div>
      </div>

      {/* ── TRAINING / COFFEE SCHOOL ────────────────────────────── */}
      <div id="training">
        <SectionBar label="Coffee School" meta="Learn & Brew" />
      </div>

      <div className="px-12 pb-12">
        <div className="flex items-baseline gap-4 mb-6">
          <h2 className="text-[2rem] tracking-[0.05em]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Level Up Your <em style={{ color: "#FF5C1A", fontStyle: "normal" }}>Brew</em>
          </h2>
          <a href="#" className="ml-auto text-[0.72rem] font-semibold tracking-[0.1em] uppercase cursor-pointer" style={{ color: "#FF5C1A" }}>All Courses →</a>
        </div>
        <div ref={r3} className="omc-reveal grid grid-cols-3 gap-5">
          {[
            {
              tag: "Brewing", tagColor: "yellow", level: "Intermediate",
              title: "The Perfect Pour Over: Mastering the V60",
              desc: "Bloom, pour ratios, temperature control, and grind consistency — everything your barista never told you.",
              lessons: 6, hours: "4.2hrs", format: "Online", price: "Free",
              bg: "#1A0D00",
            },
            {
              tag: "Espresso", tagColor: "pink", level: "Advanced",
              title: "Espresso Fundamentals: Dialing In Like a Champion",
              desc: "Pressure profiling, extraction time, channeling diagnosis, and how to taste the difference between 26 and 28 seconds.",
              lessons: 10, hours: "7.5hrs", format: "Hybrid", price: "$49",
              bg: "#080808",
            },
            {
              tag: "Tasting", tagColor: "sage", level: "Beginner",
              title: "The Art of Cupping: Train Your Palate",
              desc: "The SCA cupping protocol, aroma wheel navigation, defect identification, and building your personal flavor memory.",
              lessons: 8, hours: "5hrs", format: "Online + Kit", price: "$39",
              bg: "#F5ECD7",
            },
          ].map((c) => (
            <div key={c.title} className="omc-card-lift rounded-sm overflow-hidden cursor-pointer" style={{ background: "#0A0804" }}>
              <div className="h-[200px] relative flex items-center justify-center" style={{ background: c.bg }}>
                <div className="absolute top-3 right-3">
                  <span className="text-[0.62rem] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-sm" style={{ background: "rgba(10,8,4,0.7)", color: "#FFD700", backdropFilter: "blur(4px)" }}>
                    {c.level}
                  </span>
                </div>
              </div>
              <div className="p-6" style={{ background: "#F5ECD7" }}>
                <TagPill label={c.tag} color={c.tagColor} />
                <h3 className="mt-2 mb-2 font-bold leading-[1.3]" style={{ fontFamily: "'Fraunces', serif", fontSize: "1.05rem", color: "#0A0804" }}>
                  {c.title}
                </h3>
                <p className="text-[0.78rem] leading-[1.6] mb-4" style={{ color: "#8B7355" }}>{c.desc}</p>
                <div className="flex gap-4 text-[0.68rem] uppercase tracking-[0.05em] mb-4" style={{ color: "#8B7355" }}>
                  <span><strong style={{ color: "#FF5C1A" }}>{c.lessons}</strong> lessons</span>
                  <span><strong style={{ color: "#FF5C1A" }}>{c.hours}</strong> total</span>
                  <span>{c.format}</span>
                </div>
                <button
                  className="w-full text-white font-bold text-[0.75rem] tracking-[0.1em] uppercase py-2.5 rounded-sm cursor-pointer transition-all"
                  style={{ background: "#FF5C1A" }}
                  onClick={() => toast(`Enrolled! Check your email for course access.`)}
                  onMouseEnter={(e) => { e.currentTarget.style.background="#0A0804"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background="#FF5C1A"; }}
                >
                  Enroll {c.price !== "Free" ? `— ${c.price}` : "Free"} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SHOP ────────────────────────────────────────────────── */}
      <div id="shop">
        <SectionBar label="The Shop" meta="Gear, Beans & Gifts" />
      </div>
      <div className="px-12 pb-12" style={{ background: "#0A0804" }}>
        <div className="flex items-baseline gap-4 py-8">
          <h2 className="text-[2rem] tracking-[0.05em] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            What Every Coffee <em style={{ color: "#FF5C1A", fontStyle: "normal" }}>Traveler</em> Needs
          </h2>
          <a href="#" className="ml-auto text-[0.72rem] font-semibold tracking-[0.1em] uppercase cursor-pointer" style={{ color: "#C4843A" }}>Full Shop →</a>
        </div>
        <div ref={r4} className="omc-reveal grid grid-cols-4 gap-5">
          {[
            { emoji: "☕", name: "Fellow Ode Gen 2 Grinder",         sub: "Flat burr · 31 settings · Espresso to filter",    price: "$345", badge: "Editor's Pick" },
            { emoji: "🫖", name: "Fellow Stagg EKG Kettle",           sub: "Variable temp · 0.9L · Travel lid",               price: "$195", badge: null },
            { emoji: "🫘", name: "Panama Gesha — La Esmeralda",       sub: "Natural · 2024 harvest · 100g",                   price: "$58",  badge: "New" },
            { emoji: "📦", name: "Traveler's Brew Kit",               sub: "Aeropress + grinder + 4 origin samples",          price: "$120", badge: null },
            { emoji: "🔬", name: "Atago Pocket Refractometer",        sub: "Measure TDS & extraction yield",                  price: "$185", badge: null },
            { emoji: "🏆", name: "COE Rwanda Lot #12",                sub: "Cup of Excellence · 92.5pts · 250g",              price: "$74",  badge: "Limited" },
            { emoji: "⚗️", name: "Chemex 6-Cup + Filters Bundle",     sub: "Classic glass · 100 natural filters",             price: "$58",  badge: null },
            { emoji: "🎁", name: "OMC Gift Subscription",             sub: "3 origins/mo · Tasting notes · Free shipping",    price: "$45/mo", badge: null },
          ].map((p) => (
            <div
              key={p.name}
              className="omc-card-lift rounded-sm overflow-hidden cursor-pointer transition-all"
              style={{ background: "rgba(250,250,245,0.05)", border: "1px solid rgba(250,250,245,0.1)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="#FF5C1A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(250,250,245,0.1)"; }}
            >
              <div className="h-[160px] flex items-center justify-center relative" style={{ background: "rgba(250,250,245,0.03)" }}>
                {p.badge && (
                  <span className="absolute top-2 left-2 text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2 py-1 rounded-sm text-white" style={{ background: "#FF3D6B" }}>
                    {p.badge}
                  </span>
                )}
                <span className="text-[4rem] transition-transform duration-300 hover:scale-110 hover:rotate-[-5deg]">{p.emoji}</span>
              </div>
              <div className="p-4">
                <div className="text-[0.85rem] font-semibold text-white mb-1 leading-[1.3]">{p.name}</div>
                <div className="text-[0.7rem] mb-3" style={{ color: "rgba(250,250,245,0.45)" }}>{p.sub}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[1.2rem] tracking-[0.04em]" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FFD700" }}>{p.price}</span>
                  <button
                    className="text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-sm text-white cursor-pointer transition-all"
                    style={{ background: "#FF5C1A" }}
                    onClick={() => addToCart(p.name)}
                    onMouseEnter={(e) => { e.currentTarget.style.background="#FFD700"; e.currentTarget.style.color="#0A0804"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background="#FF5C1A"; e.currentTarget.style.color="white"; }}
                  >
                    Add →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PASSPORT MODULE ─────────────────────────────────────── */}
      <div id="passport" className="px-12 pt-12">
        <SectionBar label="Your Coffee Passport" meta="Track your journey" />
      </div>
      <div ref={r5} className="omc-reveal mx-12 mb-12 rounded-md overflow-hidden grid" style={{ gridTemplateColumns: "1fr 2fr", background: "#2C1810" }}>
        <div
          className="p-12 flex flex-col justify-between"
          style={{ background: "linear-gradient(135deg,#FF5C1A,#C44A10)" }}
        >
          <div>
            <div className="text-[4rem] mb-4">✈️</div>
            <h2
              className="text-white leading-none mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", letterSpacing: "0.04em" }}
            >
              Bean Passport
            </h2>
            <p className="text-[0.85rem] leading-[1.6] mb-6" style={{ color: "rgba(250,250,245,0.8)" }}>
              Track every coffee you've tasted from every corner of the globe. Collect stamps, build your leaderboard, get personalized recommendations based on your actual palate.
            </p>
          </div>
          <button
            className="w-fit text-[0.78rem] font-bold tracking-[0.1em] uppercase px-6 py-3 rounded-sm cursor-pointer transition-all"
            style={{ background: "#FAFAF5", color: "#FF5C1A" }}
            onClick={() => toast("Opening your Bean Passport...")}
            onMouseEnter={(e) => { e.currentTarget.style.background="#FFD700"; e.currentTarget.style.color="#0A0804"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="#FAFAF5"; e.currentTarget.style.color="#FF5C1A"; }}
          >
            Open My Passport →
          </button>
        </div>
        <div className="p-12">
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { num: "0", label: "Beans Tried" },
              { num: "0", label: "Countries" },
              { num: "0", label: "Favorites" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="block leading-none mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "#FFD700" }}>{s.num}</span>
                <span className="text-[0.7rem] uppercase tracking-[0.08em]" style={{ color: "rgba(250,250,245,0.5)" }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-6" style={{ borderTop: "1px solid rgba(250,250,245,0.1)" }}>
            {[
              { flag: "🇪🇹", country: "Ethiopia" }, { flag: "🇵🇦", country: "Panama" },
              { flag: "🇨🇴", country: "Colombia" }, { flag: "🇬🇹", country: "Guatemala" },
              { flag: "🇯🇵", country: "Japan" },    { flag: "🇰🇪", country: "Kenya" },
              { flag: "🇾🇪", country: "Yemen" },    { flag: "🇷🇼", country: "Rwanda" },
              { flag: "🇨🇷", country: "Costa Rica" },{ flag: "🇮🇩", country: "Indonesia" },
              { flag: "🇵🇪", country: "Peru" },     { flag: "🇲🇽", country: "Mexico" },
            ].map(({ flag, country }) => (
              <div
                key={country}
                className="flex items-center gap-1.5 text-[0.72rem] px-3.5 py-2 rounded-sm cursor-pointer transition-all"
                style={{ background: "rgba(250,250,245,0.08)", border: "1px solid rgba(250,250,245,0.15)", color: "rgba(250,250,245,0.7)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,92,26,0.15)"; e.currentTarget.style.borderColor="#FF5C1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="rgba(250,250,245,0.08)"; e.currentTarget.style.borderColor="rgba(250,250,245,0.15)"; }}
              >
                {flag} {country}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLE MODAL ───────────────────────────────────────── */}
      <ArticleModal articleId={articleId} onClose={() => setArticleId(null)} />

      {/* ── TOAST ───────────────────────────────────────────────── */}
      <div
        className="fixed bottom-8 right-8 z-[700] text-white text-[0.82rem] font-semibold px-5 py-3 rounded-sm pointer-events-none transition-all duration-300 shadow-[0_8px_24px_rgba(255,92,26,0.35)]"
        style={{
          background: "#FF5C1A",
          transform: visible ? "translateY(0)" : "translateY(100px)",
          opacity: visible ? 1 : 0,
        }}
      >
        {msg}
      </div>
    </>
  );
}
