import type { EducationEntry } from "@/types";

export const education: EducationEntry[] = [
  {
    id: "unt-ms-cs",
    degree: "M.S. Computer Science",
    school: "University of North Texas",
    location: "Denton, Texas, USA",
    dates: "Aug 2025 – May 2027 (expected)",
    // Official stacked logo, unaltered, from webassets.unt.edu/assets/branding,
    // on white — the ground UNT green is designed for; it is too dark on black.
    logo: {
      src: "/images/logos/unt.svg",
      width: 235,
      height: 107,
      fit: "lockup",
      background: "#FFFFFF",
    },
    coursework: [
      "Fundamentals of Artificial Intelligence",
      "Software Development for AI",
      "AI for Wearables and Healthcare",
    ],
  },
  {
    id: "sjc-bca",
    degree: "Bachelor of Computer Applications",
    school: "St. Joseph's College",
    location: "Tiruchirappalli, India",
    dates: "[ADD DATES]",
  },
];
