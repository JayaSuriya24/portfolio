import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { isPlaceholder, profile } from "@/data/profile";
import ScrollEffects from "@/components/ScrollEffects";
import Backdrop from "@/components/Backdrop";

/**
 * Stand-in for Gwen Text, which is a commercial face and not available through
 * next/font/google. Source Serif 4 is the closest free equivalent: transitional
 * structure, moderate stroke contrast, sharp bracketed serifs, and a true 600
 * SemiBold. To use the licensed Gwen files instead, drop the .woff2 files into
 * src/app/fonts/ and swap this for next/font/local — see the README.
 */
const serif = Source_Serif_4({
  variable: "--font-gwen",
  subsets: ["latin"],
  display: "swap",
});

const description = `${profile.fullName} is a software developer in ${profile.location}, working on backend and full-stack systems, APIs, cloud-native services, and applied ML. Currently an M.S. Computer Science student at the University of North Texas.`;

const title = `${profile.name} | ${profile.title}`;

// Metadata needs an absolute URL; until the canonical URL is filled in, fall
// back to localhost so the build stays warning-free.
const siteUrl = isPlaceholder(profile.siteUrl) ? "http://localhost:3000" : profile.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/",
    siteName: profile.fullName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    jobTitle: profile.title,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Denton",
      addressRegion: "TX",
      addressCountry: "US",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of North Texas",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "St. Joseph's College, Tiruchirappalli",
      },
    ],
    // Only include contact details that have actually been filled in.
    ...(isPlaceholder(profile.email) ? {} : { email: profile.email }),
    ...(isPlaceholder(profile.siteUrl) ? {} : { url: profile.siteUrl }),
    sameAs: [profile.github, profile.linkedin].filter((url) => !isPlaceholder(url)),
  };

  return (
    <html lang="en" className={`${serif.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-md border border-line bg-background px-4 py-3 text-sm text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>

        <Backdrop />

        {children}

        <ScrollEffects />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
