import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-[#706860] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-bold text-[#E8E4E0] mb-3">☕ Coffee App</p>
            <p className="text-sm text-caramel-light/80 leading-relaxed max-w-xs">
              Helping you discover amazing coffee beans from around the world.
              Built by a team of designers and researchers using Claude Code.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="w-3 h-3 rounded-full bg-caramel" />
              <span className="w-3 h-3 rounded-full bg-sage" />
              <span className="w-3 h-3 rounded-full bg-roast-light" />
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <p className="font-medium text-[#E8E4E0] text-sm uppercase tracking-wide mb-4">Explore</p>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                Browse Beans
              </Link>
              <Link href="/shops" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                Coffee Shops
              </Link>
              <Link href="/quiz" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                Flavor Quiz
              </Link>
              <Link href="/social" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                Community
              </Link>
            </div>

            <p className="font-medium text-[#E8E4E0] text-sm uppercase tracking-wide mb-4 mt-6">Account</p>
            <div className="space-y-2">
              <Link href="/diary" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                My Diary
              </Link>
              <Link href="/profile" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                Profile & Badges
              </Link>
              <Link href="/orders" className="block text-sm text-caramel-light/80 hover:text-[#E8E4E0] transition-colors">
                Order History
              </Link>
            </div>
          </div>

          {/* Newsletter Placeholder */}
          <div>
            <p className="font-medium text-[#E8E4E0] text-sm uppercase tracking-wide mb-4">Stay in the Loop</p>
            <p className="text-sm text-caramel-light/80 mb-3">
              Get notified when we add new beans and features.
            </p>
            <form action="#" className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/[0.06] border border-white/[0.06] rounded-full px-4 py-2 text-sm text-[#E8E4E0] placeholder:text-white/30 focus:outline-none focus:border-caramel/50"
              />
              <button
                type="submit"
                className="bg-caramel text-[#0F0F0F] rounded-full px-4 py-2 text-sm font-medium hover:bg-caramel-light shrink-0"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-caramel-light/60">
          <span>Made with care & curiosity</span>
          <span>
            Bean data from the{" "}
            <a
              href="https://github.com/jldbc/coffee-quality-database"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#E8E4E0] transition-colors"
            >
              Coffee Quality Institute
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
