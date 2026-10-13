import type { Project } from "@/types";

/**
 * Order here is the order shown on the site; the numbering (01, 02, 03)
 * is derived from the index, so reordering this array is enough.
 *
 * Detail-page sections render only when their field has content, so leaving
 * `problem`, `approach`, `architecture`, `features` or `challenges` out is safe.
 */
export const projects: Project[] = [
  {
    slug: "incident-intelligence-platform",
    title: "Incident Intelligence Platform",
    summary:
      "A cloud-native AIOps system that automates incident root-cause analysis across microservices, built as six independent services.",
    overview:
      "The Incident Intelligence Platform (IIP) ingests telemetry from registered applications, correlates related signals into single incidents, and uses a graph attention network alongside a large language model to explain what went wrong and where it started.",
    stack: [
      "Java 21",
      "Spring Boot 3.3",
      "Angular 18",
      "MySQL",
      "MongoDB",
      "Kafka",
      "Vertex AI Gemini",
      "PyTorch",
    ],
    status: "[ADD CURRENT STATUS]",
    github: "[ADD GITHUB URL]",
    demo: "[ADD LIVE DEMO URL]",
    // Replace with a real screenshot at public/images/. Until then the UI
    // shows a labeled monochrome placeholder rather than a fake screenshot.
    image: undefined,
    detail: {
      problem:
        "When a microservice architecture fails, the symptom and the cause are rarely in the same service. An engineer on call sees dozens of alerts firing at once and has to reconstruct, by hand and under time pressure, which one started the cascade.",
      approach:
        "IIP treats a running system as a graph rather than a list of alerts. Telemetry is ingested per registered application, correlated into incidents, then passed to an analysis service that reasons over the dependency graph to rank likely root causes and generate a written explanation.",
      architecture:
        "Six services communicate over Kafka: Application Registry (onboarding and service metadata), Ingestion (telemetry intake), Correlation (grouping related signals into incidents), AI Analysis (root-cause inference), Notification (delivery), and Realtime (live updates to the Angular dashboard). MySQL holds relational and registry data; MongoDB holds incident documents and telemetry payloads.",
      features: [
        "Anomaly detection over microservice dependency graphs using a GATv2 graph attention network implemented in PyTorch, trained on the TrainTicket dataset",
        "Natural-language incident explanations generated with Vertex AI Gemini",
        "Event-driven pipeline on Kafka, so ingestion, correlation, and analysis scale and fail independently",
        "Self-service application onboarding through the Application Registry service",
        "Live incident dashboard in Angular 18, driven by the Realtime service",
      ],
      challenges: [
        "Correlating signals that arrive out of order and at different rates across services without either merging unrelated incidents or fragmenting a single one",
        "Framing microservice anomaly detection as a graph learning problem — choosing node and edge features that generalize beyond the topology the model was trained on",
        "Keeping six services independently deployable while sharing a coherent incident model across them",
      ],
    },
  },
  {
    slug: "hacker-dojo-mobile-app",
    title: "Hacker Dojo Mobile App",
    summary:
      "A cross-platform iOS and Android app for Hacker Dojo, with membership and payments handled server-side and row-level security on every table.",
    overview:
      "A React Native application for the Hacker Dojo community space in Mountain View, California, covering membership, authentication, and member-facing content, with Stripe billing reconciled server-side through webhooks.",
    stack: [
      "TypeScript",
      "Expo",
      "React Native",
      "Expo Router",
      "Tamagui",
      "React Query",
      "Zustand",
      "Express 5",
      "Zod",
      "Supabase",
      "Stripe",
    ],
    github: "[ADD GITHUB URL]",
    // Paste the App Store / Google Play link here to activate the button.
    download: "[ADD APP DOWNLOAD URL]",
    image: undefined,
    detail: {
      problem:
        "Membership state is money: a client that decides for itself whether a user has paid is a client that can be convinced otherwise. The app needed membership to be unforgeable from the device while still feeling immediate to the member.",
      approach:
        "Membership is derived entirely server-side from Stripe webhooks — the app never writes its own entitlement. Every Supabase table carries row-level security, so authorization is enforced at the database rather than in application code that could be bypassed.",
      architecture:
        "An Expo and Expo Router client with Tamagui for the design system, React Query for server state, and Zustand for local state. An Express 5 backend validates all input with Zod and processes Stripe webhooks. Supabase provides Postgres, Auth, and Storage, with row-level security policies on every table.",
      features: [
        "Stripe-backed membership, reconciled through server-side webhooks rather than client-reported state",
        "Row-level security policies on every database table",
        "Shared iOS and Android codebase with file-based routing via Expo Router",
        "Runtime input validation with Zod across the API surface",
      ],
      challenges: [
        "Keeping Stripe webhook handling idempotent so retried or duplicated events never double-apply a membership change",
        "Writing row-level security policies that are strict enough to be meaningful without blocking legitimate reads",
      ],
    },
  },
  {
    slug: "gpt-from-scratch",
    title: "GPT from Scratch",
    summary:
      "A character-level GPT built in PyTorch on Apple Silicon, taken from a baseline through BPE tokenization to a 10.77M-parameter trained model.",
    overview:
      "An implementation of a decoder-only transformer written from first principles to understand the architecture by building it, trained locally on Apple Silicon using the MPS backend.",
    stack: ["Python", "PyTorch"],
    github: "[ADD GITHUB URL]",
    image: undefined,
    detail: {
      problem:
        "Transformers are easy to use and hard to understand from the outside. Reading the paper and calling a library are two different kinds of knowledge, and only one of them survives contact with a debugging session.",
      approach:
        "The project advances in stages rather than arriving at a finished model: a minimal baseline first, then byte-pair encoding to replace naive character tokenization, then a scaled 10.77M-parameter model with the regularization needed to train it without overfitting.",
      features: [
        "Decoder-only transformer implemented from scratch in PyTorch",
        "Byte-pair encoding tokenizer replacing the initial character-level vocabulary",
        "10.77M parameters, trained on the Tiny Shakespeare corpus",
        "Weight tying between the token embedding and output projection",
        "Dropout regularization and best-validation-loss checkpointing",
        "Trained locally on Apple Silicon through the PyTorch MPS backend",
      ],
      challenges: [
        "Training within the memory and throughput limits of a local MPS device rather than a datacenter GPU",
        "Separating genuine improvement from noise when validation loss moves in small increments",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
