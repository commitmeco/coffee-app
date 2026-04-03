import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-espresso text-cream sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">☕</span>
          <span className="font-serif text-xl font-bold tracking-tight group-hover:text-caramel-light transition-colors">
            Coffee App
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="hover:text-caramel-light transition-colors"
          >
            Browse Beans
          </Link>
          <Link
            href="/#about"
            className="hover:text-caramel-light transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
