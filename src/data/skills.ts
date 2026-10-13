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
    items: ["Angular", "React", "React Native", "Expo", "React Query", "Zustand"],
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
    category: "Cloud & Tools",
    // Drawn from experience.ts and projects.ts; list only what you actually use.
    items: ["AWS (EC2, ELB, VPC)", "Jenkins", "Git", "CI/CD pipelines", "Stripe", "Zod"],
  },
];
