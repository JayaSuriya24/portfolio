import type { SkillGroup } from "@/types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Java", "TypeScript", "Python", "SQL"],
  },
  {
    category: "Backend",
    items: ["Spring Boot", "Express", "REST APIs", "Kafka"],
  },
  {
    category: "Frontend & Mobile",
    items: ["Angular", "React Native", "Expo"],
  },
  {
    category: "Data",
    items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase"],
  },
  {
    category: "ML / AI",
    items: ["PyTorch", "Vertex AI"],
  },
  {
    category: "Tools",
    // List only what you actually use day to day.
    items: ["[ADD TOOLS — e.g. Git, Docker, cloud platforms]"],
  },
];
