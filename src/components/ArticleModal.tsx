"use client";

import { useEffect } from "react";

export type ArticleId =
  | "wild-forest" | "panama-gesha" | "oaxaca-3days" | "tokyo-cafes"
  | "anaerobic-fermentation" | "panama-interview" | "colombia"
  | "ethiopia-trip" | "kyoto" | "rwanda" | null;

const ARTICLES: Record<
  Exclude<ArticleId, null>,
  { tag: string; tagColor: string; title: string; subtitle: string; bgColor: string; body: string }
> = {
  "wild-forest": {
    tag: "Cover Story", tagColor: "#FF5C1A",
    title: "The Last Wild Coffee Forest",
    subtitle: "Kaffa, Ethiopia — April 2025",
    bgColor: "#1A4010",
    body: `<p>The path into the Kaffa forest begins at the edge of a small village called Bonga, where a weathered wooden sign marks the boundary of what may be the most important piece of agricultural real estate on earth. These are the forests where Coffea arabica evolved — where wild coffee trees grow unpruned, unirrigated, and unkempt, reaching heights of twelve meters and lifespans of centuries.</p>
<h3>A Living Library</h3>
<p>Ethiopia's southwestern cloud forests contain genetic diversity in wild coffee populations that commercial cultivation has long since engineered away. Dr. Tadesse Woldemariam Gole, who has spent thirty years mapping these forests, calls it "a living seed bank for the entire global coffee industry." When leaf rust devastated Central American crops in 2012, it was genes from Ethiopian wild populations that offered the most promising resistance traits.</p>
<p>Walking through Kaffa at dawn is a sensory experience unlike anything in the manicured farms of Colombia or Panama. Wild coffee cherries hang at every level of the canopy, from ground-hugging seedlings to canopy giants. Colobus monkeys watch from above, having themselves spread coffee seeds across the forest for millennia before any human thought to cultivate the plant.</p>
<h3>The Threat</h3>
<p>The forest is shrinking. Satellite imagery shows a 70% reduction in Kaffa's forest cover since 1970. Smallholder farmers clearing land for staple crops, government-sanctioned timber operations, and a growing population pushing into the highland margins have carved the ancient forest into fragments. An estimated 50% of wild Coffea arabica genetic diversity has been lost in the last fifty years.</p>`,
  },
  "panama-gesha": {
    tag: "Exclusive", tagColor: "#FFD700",
    title: "Inside Panama's Gesha Revolution",
    subtitle: "Chiriquí Province, Panama — March 2025",
    bgColor: "#1A4A20",
    body: `<p>The road to Hacienda La Esmeralda climbs through cloud forest so dense it feels like driving through a living waterfall. Mist drifts across the windshield, and then suddenly — the gate. Bougainvillea, a hand-painted sign, and the faint, intoxicating smell of coffee flowers in bloom.</p>
<h3>The Accidental Discovery</h3>
<p>The Peterson family acquired La Esmeralda in 1967, primarily as a cattle operation. It was Daniel Peterson who first noticed that one section of the farm produced coffee that tasted unlike anything else. Not just better. Different. Startlingly, almost disconcertingly different. Those trees were eventually identified as Gesha — a variety brought to Panama in the 1960s from a research station in Costa Rica, originally collected from the Gesha region of western Ethiopia.</p>
<h3>The Price of Perfection</h3>
<p>At the 2004 Best of Panama auction, the Esmeralda Gesha sold for $21 per pound — shattering every record. By 2019, a single lot sold for $1,029 per pound. What makes Esmeralda Gesha so singular is the layering: notes of jasmine, bergamot, papaya, and peach — not in succession but simultaneously, like a chord rather than a melody.</p>`,
  },
  "oaxaca-3days": {
    tag: "Destination", tagColor: "#1A7A6E",
    title: "3 Days in Oaxaca: The Coffee Itinerary",
    subtitle: "Sierra Norte, Mexico — February 2025",
    bgColor: "#3D2800",
    body: `<p>Oaxaca is not Mexico's most famous coffee region. But for the traveling coffee expert it offers something more interesting: a city whose food culture is so extraordinary that its coffee scene has had to evolve to match it, creating a specialty culture that is uniquely, defiantly local.</p>
<h3>Day One: Arrival and Orientation</h3>
<p>Land at Xoxocotlán airport, take a taxi to the centro. Check in to Casa Oaxaca. Walk to Boulenc on Calle Macedonia Alcalá — probably the finest bakery in Mexico, and its morning coffee sourced from local cooperatives in the Sierra Norte is your calibration drink for the entire trip.</p>
<h3>Day Two: Into the Mountains</h3>
<p>A pre-dawn departure. The farms here sit between 1,600 and 2,200 meters. Finca El Paraíso uses shade trees that create a forest garden rather than a monoculture. Watch the sorting tables — El Paraíso still hand-selects by ripeness. This, more than any varietal or processing method, is what makes their coffee exceptional.</p>`,
  },
  "tokyo-cafes": {
    tag: "Destinations", tagColor: "#1A7A6E",
    title: "Tokyo's Third Wave: The 10 Cafés Rewriting Coffee Culture",
    subtitle: "Tokyo, Japan — January 2025",
    bgColor: "#0A0814",
    body: `<p>Tokyo was an unlikely candidate to become the world's most exciting specialty coffee city. The kissaten — the old-school Japanese coffee house — was a different thing entirely: dark, smoky, serving deeply roasted blend coffee in a context that was about refuge and ritual, not terroir and technique.</p>
<h3>The Quiet Revolution</h3>
<p>Beginning in the early 2010s, a generation of Japanese coffee professionals who had trained under Australian and Scandinavian specialty roasters returned home and began opening cafés that combined the Japanese obsession with craft and precision with the global specialty movement's focus on origin, variety, and processing. Walk into Koffee Mameya in Omotesando and you will find no menu — a host will interview you and prescribe your coffee.</p>
<h3>The Ten</h3>
<p>Fuglen Coffee in Tomigaya offers a double life: Norwegian-designed café by day, cocktail bar at night. % Arabica maintains its best expression in its Higashiyama location. Sarutahiko Coffee in Ebisu is essential — staff who will happily spend twenty minutes explaining why the Kenyan washed they're currently pouring is unlike any other on the menu.</p>`,
  },
  "anaerobic-fermentation": {
    tag: "Science", tagColor: "#FF3D6B",
    title: "Anaerobic Fermentation Is Changing Coffee Forever",
    subtitle: "Special Report — Specialty Science 2025",
    bgColor: "#1A0D00",
    body: `<p>At the 2019 World Barista Championship, Diego Campos of Colombia presented an anaerobic fermented coffee that tasted like fermented strawberry hard candy. The judges gave it the highest scores in the history of the competition. The coffee world has been arguing about it ever since.</p>
<h3>What Is Anaerobic Fermentation?</h3>
<p>Anaerobic fermentation — processing coffee in sealed, oxygen-free tanks — was borrowed wholesale from winemaking, where it has been used to produce carbonic maceration wines since the 1930s. When applied to coffee, the absence of oxygen creates conditions where specific strains of yeast and bacteria dominate, producing dramatically different organic compounds than traditional open-air fermentation.</p>
<h3>The Science</h3>
<p>Dr. Chahan Yeretzian at the Zurich University of Applied Sciences found that anaerobic fermentation significantly increases concentrations of ethyl acetate (fruity/floral), lactic acid, and unusual esters that don't appear in traditionally processed coffee at all. "We're talking about a fundamentally different aromatic profile. Not better or worse, but genuinely distinct from anything that came before."</p>`,
  },
  "panama-interview": {
    tag: "Q&A", tagColor: "#FFD700",
    title: "Don Pachi Serracín: 'Coffee Is a Language'",
    subtitle: "Hacienda La Esmeralda, Chiriquí, Panama",
    bgColor: "#1A0D00",
    body: `<p>We arrived at the Serracín family home at 5am, before first light, because Don Pachi insists that the best way to understand his farm is to see it wake up. By the time we had drunk our first cup — a Gesha natural, served black in small ceramic cups — the workers had already begun moving toward the harvest trees.</p>
<h3>Five Generations</h3>
<p><strong>OMC:</strong> Your family has been on this land for over 100 years. How has your relationship to coffee changed?</p>
<p><em>Pachi:</em> For my great-grandfather, coffee was survival. For my grandfather, it became pride. For my father, it became science. For me, it has become language. A cup of our Gesha is a conversation between this volcano, this rain, these hands, and whoever is drinking it anywhere in the world.</p>
<h3>On Sustainability</h3>
<p><em>Pachi:</em> The forest provides our shade trees, which regulate temperature, prevent erosion, provide habitat. The birds control insects. The soil biology, if you treat it with respect, does everything chemical fertilizers do and more. Our highest-rated lots come from the oldest trees, the most biodiverse blocks. Complexity of flavor requires complexity of environment.</p>`,
  },
  colombia: {
    tag: "Destination", tagColor: "#1A7A6E",
    title: "Huila & Nariño: Colombia's Twin Coffee Crowns",
    subtitle: "Colombian Coffee Belt — February 2025",
    bgColor: "#1A4A14",
    body: `<p>Colombia produces roughly 800,000 metric tons of coffee annually, making it the world's third-largest producer. But within that vast output lies an extraordinary diversity — fifty-plus distinct regions, each with its own elevation profile, variety mix, and processing tradition.</p>
<h3>Huila: The Craft Heart</h3>
<p>Huila's Andes terrain creates dozens of distinct microclimates. The department has embraced specialty production with particular intensity — driven partly by geography, partly by a generation of young producers who grew up watching their parents sell commodity coffee and decided there was another way. In the municipality of Acevedo, you'll find small farms producing honey-processed Caturra that would comfortably sit at the top of any specialty auction.</p>`,
  },
  "ethiopia-trip": {
    tag: "Ethiopia", tagColor: "#6B8C5E",
    title: "Yirgacheffe: A Coffee Pilgrim's Journey",
    subtitle: "Southern Ethiopia — March 2025",
    bgColor: "#1C3A0E",
    body: `<p>Every serious coffee drinker knows the name Yirgacheffe. It appears on menus in Melbourne and Manhattan, in specialty shops in Oslo and Osaka. But few have been to the place itself — a small town in the Gedeo Zone of southern Ethiopia, at an elevation of about 1,750 meters, surrounded by some of the most spectacular coffee-growing landscape on earth.</p>
<h3>The Washing Stations</h3>
<p>The key infrastructure of Yirgacheffe coffee is its washing stations — cooperative-run facilities where smallholder farmers bring their freshly picked cherries for processing. Visit Kochere Washing Station at 7am, when the first deliveries arrive, and you'll witness something that has barely changed in decades: families arriving by donkey and foot, baskets overflowing with ripe red and purple cherries.</p>`,
  },
  kyoto: {
    tag: "Japan", tagColor: "#FF3D6B",
    title: "Kyoto's Hidden Kissaten — Old School Perfection",
    subtitle: "Kyoto, Japan — December 2024",
    bgColor: "#1A0814",
    body: `<p>There is a kissaten in Kyoto's Nakagyo ward that has been serving the same blend since 1962. The owner, now in his eighties, roasts every batch himself in a drum roaster that predates the specialty movement by two decades. He does not know what a Q Grader is. His coffee is extraordinary.</p>
<h3>The Old Guard</h3>
<p>Japan's kissaten culture — the traditional coffee house — is a different beast from the third-wave café. Dark wood, low lighting, jazz or classical music at conversation-suppressing volume. The coffee is typically a medium-dark blend, served in proper porcelain, with nothing to distract from the ritual of drinking. This is what serious coffee culture looked like before social media decided it needed to be photogenic.</p>`,
  },
  rwanda: {
    tag: "Rwanda", tagColor: "#1A7A6E",
    title: "Land of a Thousand Hills, One Perfect Cup",
    subtitle: "Rwanda — January 2025",
    bgColor: "#0A1A0A",
    body: `<p>Rwanda's transformation from commodity coffee producer to specialty powerhouse is one of the great stories in modern coffee. In 2000, virtually all Rwandan coffee was low-grade robusta. Today, the country produces some of the most sought-after washed Bourbon coffees in the world, with Cup of Excellence lots fetching prices that would have been unimaginable twenty years ago.</p>
<h3>The Washing Station Revolution</h3>
<p>The key was infrastructure. With significant investment from USAID and private specialty buyers, Rwanda built over 250 washing stations — centralized processing facilities that allowed smallholder farmers (most working less than half a hectare) to access the quality controls necessary for specialty markets. The results speak in the cup: clean, bright acidity, caramel sweetness, and a floral complexity that rivals Ethiopia's best.</p>`,
  },
};

interface ArticleModalProps {
  articleId: ArticleId;
  onClose: () => void;
}

export default function ArticleModal({ articleId, onClose }: ArticleModalProps) {
  const article = articleId ? ARTICLES[articleId] : null;

  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [article]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/90 flex items-start justify-center overflow-y-auto p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[600] w-10 h-10 rounded-full flex items-center justify-center text-white text-lg transition-all"
        style={{ background: "#FF5C1A" }}
        aria-label="Close article"
      >
        ✕
      </button>

      <div className="omc-modal-in bg-[#FAFAF5] max-w-[760px] w-full rounded-sm overflow-hidden my-auto">
        {/* Hero */}
        <div className="relative h-[340px] overflow-hidden flex items-end" style={{ background: article.bgColor }}>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,4,0.85) 0%, transparent 50%)" }} />
          <div className="relative z-10 p-8">
            <span
              className="inline-block text-[0.62rem] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm mb-3 text-white"
              style={{ background: article.tagColor }}
            >
              {article.tag}
            </span>
            <h2
              className="text-white text-4xl font-bold leading-none mb-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              {article.title}
            </h2>
            <p className="text-white/60 text-xs tracking-[0.08em] uppercase">{article.subtitle}</p>
          </div>
        </div>

        {/* Body */}
        <div
          className="p-10 prose prose-lg max-w-none"
          style={{ fontFamily: "'Fraunces', serif" }}
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </div>

      <style>{`
        .omc-modal-in p { font-size: 1rem; line-height: 1.8; color: #2A2018; margin-bottom: 1.25rem; font-weight: 300; }
        .omc-modal-in p:first-of-type::first-letter {
          font-size: 3.5rem; font-weight: 900; font-family: 'Bebas Neue', sans-serif;
          line-height: 0.8; float: left; margin: 0.1em 0.1em 0 0; color: #FF5C1A;
        }
        .omc-modal-in h3 { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 0.05em; color: #0A0804; margin: 2rem 0 0.75rem; }
        .omc-modal-in strong { font-weight: 700; color: #0A0804; }
        .omc-modal-in em { font-style: italic; }
      `}</style>
    </div>
  );
}
