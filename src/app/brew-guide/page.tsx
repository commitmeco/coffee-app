import BrewMethodCard from "@/components/BrewMethodCard";
import brewMethodsData from "@/data/brew_methods.json";
import type { BrewMethod } from "@/lib/brewMethods";

const brewMethods = brewMethodsData as BrewMethod[];

export const metadata = {
  title: "Brew guide — Coffee App",
  description:
    "Learn how to brew coffee at home with our step-by-step guides for pour-over, French press, AeroPress, espresso, cold brew, and Moka pot.",
};

export default function BrewGuidePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-3">
          Brew guide
        </h1>
        <p className="text-espresso-light max-w-xl leading-relaxed">
          Every bean deserves the right method. Whether you&apos;re just starting
          out or dialing in your technique, pick a method and we&apos;ll walk you
          through it.
        </p>
      </div>

      {/* Method cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brewMethods.map((method, index) => (
          <div
            key={method.id}
            className={`animate-fade-in-up stagger-${index + 1}`}
          >
            <BrewMethodCard method={method} />
          </div>
        ))}
      </div>
    </main>
  );
}
