import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream-dark mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-bold text-cream mb-3">☕ Coffee App</p>
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

          {/* Quick Links */}
          <div>
            <p className="font-medium text-cream text-sm uppercase tracking-wide mb-4">Explore</p>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-caramel-light/80 hover:text-cream transition-colors">
                Browse All Beans
              </Link>
              <Link href="/diary" className="block text-sm text-caramel-light/80 hover:text-cream transition-colors">
                My Diary
              </Link>
              <Link href="/?minScore=90" className="block text-sm text-caramel-light/80 hover:text-cream transition-colors">
                Top Rated (90+)
              </Link>
              <Link href="/#about" className="block text-sm text-caramel-light/80 hover:text-cream transition-colors">
                About This Project
              </Link>
              <a
                href="https://github.com/jldbc/coffee-quality-database"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-caramel-light/80 hover:text-cream transition-colors"
              >
                Data Sources ↗
              </a>
            </div>
          </div>

          {/* Newsletter Placeholder */}
          <div>
            <p className="font-medium text-cream text-sm uppercase tracking-wide mb-4">Stay in the Loop</p>
            <p className="text-sm text-caramel-light/80 mb-3">
              Get notified when we add new beans and features.
            </p>
            <form action="#" className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-espresso-light border border-espresso-light rounded-full px-4 py-2 text-sm text-cream placeholder:text-caramel-light/40 focus:outline-none focus:border-caramel/50"
              />
              <button
                type="submit"
                className="bg-caramel text-espresso rounded-full px-4 py-2 text-sm font-medium hover:bg-caramel-light shrink-0"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-espresso-light/50 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-caramel-light/60">
          <span>Made with care & curiosity</span>
          <span>
            Bean data from the{" "}
            <a
              href="https://github.com/jldbc/coffee-quality-database"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cream transition-colors"
            >
              Coffee Quality Institute
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
