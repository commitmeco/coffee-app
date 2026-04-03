export default function Footer() {
  return (
    <footer className="bg-espresso text-cream-dark mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-serif text-lg font-bold mb-2">☕ Coffee App</p>
            <p className="text-sm text-caramel-light max-w-xs">
              Helping you discover amazing coffee beans from around the world.
              Built by a team of designers and researchers using Claude Code.
            </p>
          </div>
          <div className="text-sm text-caramel-light">
            <p>
              Bean data from the{" "}
              <a
                href="https://github.com/jldbc/coffee-quality-database"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cream transition-colors"
              >
                Coffee Quality Institute
              </a>
            </p>
            <p className="mt-1">
              Flavor taxonomy based on the SCA Flavor Wheel
            </p>
          </div>
        </div>
        <div className="border-t border-espresso-light mt-8 pt-6 text-center text-xs text-caramel-light">
          Made with care & curiosity
        </div>
      </div>
    </footer>
  );
}
