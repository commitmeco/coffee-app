"use client";

import { useState } from "react";

/* ── Story data (Grounds & Glory editorial) ─────────────────── */

const COVER_STORY = {
  tag: "Cover Story",
  region: "Ethiopia · Yirgacheffe",
  title: "The Women Who Saved Heirloom Coffee",
  blurb:
    "Deep in the Gedeo Zone, a cooperative of 340 women farmers is reviving wild-forest varieties that global agribusiness declared extinct.",
  author: "Lena Mbeki",
  date: "April 2026",
  readTime: "12 min read",
  img: "https://images.unsplash.com/photo-1504627298434-2f0a5c3a3d08?w=1200&q=80",
};

const WORLD_STORIES = [
  {
    tag: "Origin Story",
    region: "Colombia · Huila",
    title: "The Pink Bourbon Comeback",
    blurb:
      "After a decade of neglect, the rare Pink Bourbon variety is fetching record prices at auction — but at what cost to small-holders?",
    author: "Carlos Restrepo",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
  {
    tag: "Harvest Report",
    region: "Yemen · Haraz",
    title: "Coffee in the Time of Crisis",
    blurb:
      "Amid ongoing conflict, Yemen's ancient terraced coffee gardens still produce some of the most complex cups on earth.",
    author: "Nadia Al-Sharif",
    readTime: "10 min",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    tag: "Innovation",
    region: "Japan · Kyoto",
    title: "The Precision Roasters of Kyoto",
    blurb:
      "Inside Japan's smallest roasteries, where batch sizes are measured in grams and flavour notes are mapped to the second.",
    author: "Yuki Tanaka",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
  },
  {
    tag: "Farmer Profile",
    region: "Guatemala · Antigua",
    title: "Volcanic Terroir: Luis Zelaya's Obsession",
    blurb:
      "Luis farms the same three hectares his great-grandfather cleared — and every barista in Copenhagen wants his beans.",
    author: "Sofia Morales",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
  },
];

const INTERVIEWS = [
  {
    name: "Asnakech Thomas",
    title: "Pioneer Farmer · Oromia, Ethiopia",
    quote:
      '"I never wanted to just grow coffee. I wanted to show that a woman in this region could define the flavour of a country."',
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    topics: ["Natural Processing", "Women in Coffee", "Terroir"],
  },
  {
    name: "James Hoffmann",
    title: "World Barista Champion · Author",
    quote:
      '"The best cup of coffee I ever had was in a house with no electricity, made on a jebena over charcoal. Equipment is overrated."',
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    topics: ["Brewing Philosophy", "Specialty Trends", "Home Barista"],
  },
  {
    name: "Vera Santos",
    title: "Q Grader & Co-Founder · Fazenda Serra",
    quote:
      '"Brazil gets dismissed as commercial. Come taste what we\'re doing in Minas Gerais and tell me that again."',
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    topics: ["Brazilian Specialty", "Cup of Excellence", "Processing Methods"],
  },
];

const TRAVEL_STORIES = [
  {
    destination: "Addis Ababa, Ethiopia",
    blurb: "The original coffee ceremony meets third-wave curiosity in Africa's most caffeinated capital.",
    img: "https://images.unsplash.com/photo-1580138822439-7d85deece2c6?w=600&q=80",
    tag: "City Guide",
  },
  {
    destination: "Medellín, Colombia",
    blurb: "From dangerous to delightful — how Medellín became South America's specialty coffee capital.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tag: "City Guide",
  },
  {
    destination: "Chiang Mai, Thailand",
    blurb: "Highland hill-tribe farms, innovative processing, and a coffee scene that punches far above its weight.",
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80",
    tag: "Destination",
  },
];

/* ── Tag pill ─────────────────────────────────────────────── */
function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-[0.62rem] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm"
      style={{ background: "var(--color-caramel)", color: "white" }}
    >
      {label}
    </span>
  );
}

/* ── Section header ──────────────────────────────────────── */
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: "var(--color-caramel)" }}>
          Grounds &amp; Glory
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: "var(--color-espresso-light)" }}>
          {title}
        </h2>
      </div>
      {sub && (
        <a
          href="#"
          className="text-[0.78rem] font-semibold tracking-[0.04em] transition-colors hidden sm:block"
          style={{ color: "var(--color-caramel)" }}
        >
          {sub} →
        </a>
      )}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function MagazineSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="magazine" className="py-16 md:py-24" style={{ background: "var(--color-cream)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">

        {/* ── Cover Story ──────────────────────────────── */}
        <SectionHeader title="From the Current Issue" sub="View archive" />

        <div
          className="relative rounded-xl overflow-hidden mb-16 group cursor-pointer omc-card-lift"
          style={{ minHeight: 480 }}
          onClick={() => setExpanded(expanded === "cover" ? null : "cover")}
        >
          <img
            src={COVER_STORY.img}
            alt={COVER_STORY.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,21,16,0.92) 0%, rgba(28,21,16,0.3) 60%, transparent 100%)" }} />

          <div className="relative flex flex-col justify-end p-8 md:p-12 h-full" style={{ minHeight: 480 }}>
            <div className="flex items-center gap-3 mb-3">
              <Tag label={COVER_STORY.tag} />
              <span className="text-[0.7rem] font-medium tracking-[0.06em] uppercase" style={{ color: "rgba(253,250,246,0.6)" }}>
                {COVER_STORY.region}
              </span>
            </div>
            <h3 className="font-serif text-3xl md:text-5xl font-bold leading-[1.1] mb-3 max-w-2xl" style={{ color: "var(--color-paper)" }}>
              {COVER_STORY.title}
            </h3>
            <p className="font-serif italic text-[1rem] leading-[1.7] max-w-xl mb-5" style={{ color: "rgba(253,250,246,0.72)", fontWeight: 300 }}>
              {COVER_STORY.blurb}
            </p>
            <div className="flex items-center gap-4">
              <div className="text-[0.75rem] font-semibold" style={{ color: "rgba(253,250,246,0.55)" }}>
                By {COVER_STORY.author} &nbsp;·&nbsp; {COVER_STORY.date} &nbsp;·&nbsp; {COVER_STORY.readTime}
              </div>
              <button
                className="text-[0.75rem] font-bold tracking-[0.07em] uppercase px-5 py-2.5 rounded-sm transition-all"
                style={{ background: "var(--color-caramel)", color: "white" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-caramel-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-caramel)"; }}
              >
                Read Story
              </button>
            </div>
          </div>
        </div>

        {/* ── World Stories Grid ────────────────────── */}
        <SectionHeader title="Around the World" sub="See all stories" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {WORLD_STORIES.map((story, i) => (
            <article
              key={i}
              className="group cursor-pointer omc-card-lift rounded-lg overflow-hidden border"
              style={{ background: "var(--color-paper)", borderColor: "var(--color-border)" }}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: "62%" }}>
                <img
                  src={story.img}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag label={story.tag} />
                </div>
                <p className="text-[0.65rem] font-semibold tracking-[0.06em] uppercase mb-1.5" style={{ color: "var(--color-roast-light)" }}>
                  {story.region}
                </p>
                <h3 className="font-serif text-[1rem] font-bold leading-[1.3] mb-2" style={{ color: "var(--color-espresso-light)" }}>
                  {story.title}
                </h3>
                <p className="text-[0.78rem] leading-[1.6]" style={{ color: "var(--color-roast-light)" }}>
                  {story.blurb}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[0.68rem]" style={{ color: "var(--color-roast-light)" }}>
                    {story.author} · {story.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Interviews ───────────────────────────── */}
        <SectionHeader title="In Conversation" sub="All interviews" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {INTERVIEWS.map((iv, i) => (
            <article
              key={i}
              className="omc-card-lift rounded-lg overflow-hidden border p-6 flex gap-5"
              style={{ background: "var(--color-paper)", borderColor: "var(--color-border)" }}
            >
              <img
                src={iv.img}
                alt={iv.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-caramel"
              />
              <div>
                <p
                  className="font-serif italic text-[0.92rem] leading-[1.6] mb-3"
                  style={{ color: "var(--color-espresso-light)", fontWeight: 300 }}
                >
                  {iv.quote}
                </p>
                <p className="text-[0.78rem] font-bold" style={{ color: "var(--color-espresso-light)" }}>{iv.name}</p>
                <p className="text-[0.7rem]" style={{ color: "var(--color-roast-light)" }}>{iv.title}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {iv.topics.map((t) => (
                    <span
                      key={t}
                      className="text-[0.6rem] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full"
                      style={{ background: "var(--color-cream-dark)", color: "var(--color-roast)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Travel ───────────────────────────────── */}
        <SectionHeader title="Coffee Destinations" sub="Travel guide" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRAVEL_STORIES.map((s, i) => (
            <article
              key={i}
              className="group cursor-pointer omc-card-lift rounded-lg overflow-hidden border"
              style={{ background: "var(--color-paper)", borderColor: "var(--color-border)" }}
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: "58%" }}>
                <img
                  src={s.img}
                  alt={s.destination}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute top-3 left-3">
                  <Tag label={s.tag} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-[1.05rem] font-bold mb-1.5" style={{ color: "var(--color-espresso-light)" }}>
                  {s.destination}
                </h3>
                <p className="text-[0.8rem] leading-[1.6]" style={{ color: "var(--color-roast-light)" }}>
                  {s.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
