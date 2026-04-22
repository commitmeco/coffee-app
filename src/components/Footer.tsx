"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{ background: "var(--color-espresso-light)", borderColor: "var(--color-caramel)", color: "rgba(253,250,246,0.55)" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-14 pb-4">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 mb-8 border-b"
          style={{ borderColor: "rgba(253,250,246,0.1)" }}
        >
          {/* Brand */}
          <div>
            <div
              className="font-serif text-[1.5rem] font-bold tracking-[-0.01em] mb-4"
              style={{ color: "var(--color-paper)" }}
            >
              Grounds <span style={{ color: "var(--color-caramel)" }}>&amp;</span> Glory
            </div>
            <p
              className="text-[0.85rem] leading-[1.75] max-w-[260px] font-serif italic"
              style={{ color: "rgba(253,250,246,0.5)", fontWeight: 300 }}
            >
              The specialty coffee journal for curious drinkers, traveling tasters, and dedicated brewers worldwide.
            </p>
          </div>

          {/* Magazine */}
          <div>
            <h4
              className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--color-caramel)" }}
            >
              Magazine
            </h4>
            <ul className="space-y-2.5 text-[0.82rem]">
              {["Current Issue", "Archive", "Subscribe", "Advertising", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white/90">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--color-caramel)" }}
            >
              Explore
            </h4>
            <ul className="space-y-2.5 text-[0.82rem]">
              {[
                { label: "Bean Catalog",   href: "/beans" },
                { label: "Brew Guide",     href: "/brew-guide" },
                { label: "Flavor Quiz",    href: "/quiz" },
                { label: "Coffee Shops",   href: "/shops" },
                { label: "My Diary",       href: "/diary" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-white/90">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4
              className="text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-4"
              style={{ color: "var(--color-caramel)" }}
            >
              My Account
            </h4>
            <ul className="space-y-2.5 text-[0.82rem]">
              {[
                { label: "Coffee Diary",  href: "/diary" },
                { label: "My Cart",       href: "#" },
                { label: "Orders",        href: "/orders" },
                { label: "Profile",       href: "/profile" },
                { label: "Social Feed",   href: "/social" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-white/90">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-2 py-3 text-[0.72rem]"
          style={{ color: "rgba(253,250,246,0.3)" }}
        >
          <p>© 2026 Grounds &amp; Glory. All Rights Reserved.</p>
          <div className="flex gap-3">
            {["𝕏", "📷", "▶", "in"].map((icon) => (
              <button
                key={icon}
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[0.8rem] transition-all cursor-pointer border"
                style={{ borderColor: "rgba(253,250,246,0.15)", background: "transparent", color: "rgba(253,250,246,0.45)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-caramel)"; e.currentTarget.style.color = "var(--color-caramel)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(253,250,246,0.15)"; e.currentTarget.style.color = "rgba(253,250,246,0.45)"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
