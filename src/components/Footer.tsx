export default function Footer() {
  return (
    <footer style={{ background: "#0A0804", borderTop: "3px solid #FF5C1A" }} className="text-white/50 px-12 pt-12 pb-0">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12" style={{ borderBottom: "1px solid rgba(250,250,245,0.1)" }}>

        {/* Brand */}
        <div>
          <div
            className="text-[2rem] text-white tracking-[0.06em] mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            One <span style={{ color: "#FF5C1A" }}>More</span> Cup
          </div>
          <p
            className="text-[0.85rem] leading-[1.7] max-w-[280px]"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 300, color: "rgba(250,250,245,0.5)" }}
          >
            The world's premier coffee lifestyle magazine for traveling connoisseurs.
            We go where the beans are best and bring back everything you need to know.
          </p>
        </div>

        {/* Magazine */}
        <div>
          <h4 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "#FF5C1A" }}>
            Magazine
          </h4>
          <ul className="space-y-2.5 text-[0.8rem]">
            {["Current Issue", "Archive", "Subscribe", "Advertising", "Contact"].map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "#FF5C1A" }}>
            Explore
          </h4>
          <ul className="space-y-2.5 text-[0.8rem]">
            {["Destinations", "Coffee School", "Producer Profiles", "Bean Reviews", "Gear Reviews"].map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-[0.68rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: "#FF5C1A" }}>
            My Account
          </h4>
          <ul className="space-y-2.5 text-[0.8rem]">
            {["Coffee Passport", "My Cart", "Orders", "Subscriptions", "Settings"].map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors hover:text-white">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 py-6 text-[0.72rem]" style={{ color: "rgba(250,250,245,0.3)" }}>
        <p>© 2025 One More Cup Media. All Rights Reserved.</p>
        <div className="flex gap-3">
          {["𝕏", "📷", "▶", "in"].map((icon) => (
            <button
              key={icon}
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[0.8rem] transition-all cursor-pointer"
              style={{ border: "1px solid rgba(250,250,245,0.15)", background: "transparent", color: "rgba(250,250,245,0.5)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FF5C1A"; e.currentTarget.style.color = "#FF5C1A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(250,250,245,0.15)"; e.currentTarget.style.color = "rgba(250,250,245,0.5)"; }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
