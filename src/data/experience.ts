import type { ExperienceEntry } from "@/types";

// Most recent first.
export const experience: ExperienceEntry[] = [
  {
    id: "international-innovation-center",
    start: "Oct 2026",
    end: "Present",
    role: "Mobile Application Developer",
    company: "International Innovation Center (IIC)",
    location: "Las Vegas, Nevada",
    note: "(StartUpNV)",
    logo: {
      src: "/images/logos/iic-startupnv.png",
      width: 1024,
      height: 434,
      fit: "lockup",
      background: "#1C2143",
    },
    description:
      "Developing the cross-platform iOS and Android app for International Innovation Center (IIC), connecting startup community members to coworking spaces and meeting facilities.",
    accomplishments: [
      "Developing a cross-platform mobile application for IIC, supporting access to coworking spaces, meeting facilities, and startup-community resources",
      "Building reusable mobile interfaces with React Native, Expo, TypeScript, and Expo Router, and integrating Express APIs with Supabase/PostgreSQL for application data and user workflows",
      "Working on UI/UX, application architecture, validation, testing, and reliable frontend-to-backend integration for a maintainable iOS and Android experience",
    ],
    // Paste the App Store / Google Play link here to activate the button.
    download: "[ADD APP DOWNLOAD URL]",
  },
  {
    id: "hacker-dojo",
    start: "Jun 2026",
    end: "Present",
    role: "Full-Stack Mobile Developer",
    company: "Hacker Dojo",
    location: "Mountain View, California",
    note: "(Member)",
    // Official white torii from hackerdojo.org, on the brand red sampled from
    // the site's own logo.png. Rebuilt this way because that file is 84px.
    logo: {
      src: "/images/logos/hacker-dojo.png",
      width: 656,
      height: 440,
      background: "#E13838",
    },
    description:
      "Built the cross-platform iOS and Android app for Hacker Dojo, a community hackerspace, with membership and payments handled server-side.",
    accomplishments: [
      "Built one TypeScript codebase for iOS and Android with Expo, React Native, and Expo Router, using Tamagui, React Query, and Zustand on the client",
      "Derived membership state entirely server-side from Stripe webhooks, so the app never decides for itself whether a member has paid",
      "Enforced row-level security on every Supabase table and validated all API input with Zod in an Express 5 backend",
    ],
  },
  {
    id: "sunline-endeavour",
    start: "Sep 2022",
    end: "May 2025",
    role: "Software Developer",
    company: "Sunline Endeavour",
    location: "Tiruchirappalli, India",
    description:
      "Backend engineer on the order and payment services behind an e-commerce checkout, from API design through production support.",
    accomplishments: [
      "Built the order lifecycle APIs (create, confirm, cancel, status tracking) on asynchronous order and inventory workflows over AWS messaging, separating checkout from fulfillment and cutting order-confirmation latency by 35%.",
      "Surfaced near-real-time order state to the React checkout and order-tracking UI, and agreed API contracts, payloads, and error formats with the Angular dashboard team, reducing integration defects by 20%.",
      "Strengthened the payment microservice in Java and MongoDB with request validation, retries, and failure handling, lowering payment drop-offs by 25% during peak sale traffic.",
      "Deployed and ran payment and order services on AWS (EC2, load balancers, VPCs, security groups), resolving network and timeout failures to hold 99.95% availability.",
      "Automated build, test, and deployment with Jenkins and Git CI/CD pipelines, cutting manual deployment effort by 40%.",
      "Handled on-call production support, tracing checkout latency, failed payments, and inconsistent order states through application logs and MongoDB queries, and restored service within SLA on more than 95% of incidents.",
    ],
  },
];
