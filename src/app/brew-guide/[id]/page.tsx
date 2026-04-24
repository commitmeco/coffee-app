import { notFound } from "next/navigation";
import BrewMethodDetail from "@/components/BrewMethodDetail";
import brewMethodsData from "@/data/brew_methods.json";
import type { BrewMethod } from "@/lib/brewMethods";

const brewMethods = brewMethodsData as BrewMethod[];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return brewMethods.map((method) => ({ id: method.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const method = brewMethods.find((m) => m.id === id);
  if (!method) return { title: "Not found" };

  return {
    title: `${method.name} brew guide — Coffee App`,
    description: `Learn how to brew ${method.name.toLowerCase()}: ${method.tagline.toLowerCase()}. Step-by-step guide with timing, grind size, and bean recommendations.`,
  };
}

export default async function BrewMethodPage({ params }: PageProps) {
  const { id } = await params;
  const method = brewMethods.find((m) => m.id === id);

  if (!method) {
    notFound();
  }

  return <BrewMethodDetail method={method} />;
}
