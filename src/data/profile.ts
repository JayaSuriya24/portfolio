import type { NavLink, Profile } from "@/types";

/**
 * Anything still written as "[ADD ...]" is an unfilled placeholder. The UI
 * detects these with `isPlaceholder` and renders them as inert, visibly
 * marked text rather than a broken link.
 */
export function isPlaceholder(value: string | undefined): boolean {
  return !value || value.trim().startsWith("[ADD");
}

export const profile: Profile = {
  name: "Jaya Suriya",
  fullName: "Jaya Suriya Manickavasagam",
  title: "Software Developer",
  location: "Denton, Texas, USA",
  intro: [
    "Currently an M.S. Computer Science student at the University of North Texas, working on applied ML for incident root-cause analysis.",
  ],
  // **word** is set as white emphasis.
  tagline: "Designing systems that **scale** and applications that **think**.",
  email: "jayasuriya2410@gmail.com",
  github: "https://github.com/JayaSuriya24",
  linkedin: "https://www.linkedin.com/in/jaya-suriya-manickavasagam/",
  siteUrl: "https://jayasuriya-manick-portfolio.netlify.app",
  resumeUrl: "/resume.pdf",
  portrait: {
    src: "/images/portrait.jpg",
    alt: "Jaya Suriya Manickavasagam",
    // Biased upward so the head clears the fixed navigation and the face is
    // never cropped, at any viewport height. Raise the second value to move
    // the crop window down, lower it to move up.
    objectPosition: "50% 22%",
  },
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const about = {
  heading: "Introduction",
  /** Small label above the statement. */
  lead: "Overview",
  /** Large opening line, set word by word. */
  statement:
    "I bridge backend engineering and applied machine learning, specializing in event-driven services and systems that stay diagnosable in production.",
  /**
   * Supporting copy. Wrap a phrase in **double asterisks** to set it in white,
   * so the terms a recruiter scans for stand out of the grey body text.
   */
  paragraphs: [
    "I am a Software Developer with nearly three years building **Java** and **Spring Boot** services for e-commerce orders and payments, including on-call production support, now completing an **M.S. in Computer Science** at the University of North Texas.",
    "Expertise in **Spring Boot**, **Kafka**, **REST APIs**, **PyTorch** and **cloud-native architecture**, with recent work applying **graph neural networks** to microservice incident root-cause analysis.",
  ],
  /** Label / value pairs shown in a row beneath a hairline. */
  facts: [
    { label: "Experience", value: "Nearly 3 years in production backend" },
    { label: "Studying", value: "M.S. Computer Science, UNT" },
    { label: "Focus", value: "Distributed systems & applied ML" },
  ],
};

export const contact = {
  /** Rendered as three stacked lines of large type. */
  headlineLines: ["LET'S BUILD", "SOMETHING", "USEFUL."],
  blurb:
    "I'm open to software engineering roles and internships in backend, full-stack, and applied ML. The fastest way to reach me is LinkedIn.",
};
