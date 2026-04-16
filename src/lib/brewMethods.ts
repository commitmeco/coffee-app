export interface BrewMethod {
  id: string;
  name: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  brew_time: string;
  grind_size: string;
  water_temp: string;
  ratio: string;
  equipment: string[];
  steps: string[];
  best_for: string;
  flavor_impact: string;
  icon: string;
}
