import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feedrank.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Feed Rank — Master the Algorithm",
    template: "%s | Feed Rank"
  },
  description: "Learn how ranking algorithms work through interactive gameplay. Discover why Wilson Score beats simple percentages.",
  keywords: ["wilson score", "ranking algorithm", "game", "statistics", "learning", "interactive learning", "algorithm education", "data science game"],
  authors: [{ name: "Feed Rank Team" }],
  creator: "Feed Rank Team",
  publisher: "Feed Rank",

  // Open Graph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Feed Rank",
    title: "Feed Rank — Master the Algorithm",
    description: "Learn how ranking algorithms work through interactive gameplay. Discover why Wilson Score beats simple percentages.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Feed Rank - Master the Algorithm",
      }
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Feed Rank — Master the Algorithm",
    description: "Learn how ranking algorithms work through interactive gameplay. Discover why Wilson Score beats simple percentages.",
    images: ["/og-image.png"],
    creator: "@feedrank",
  },

  // Verification and additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Alternative formats
  alternates: {
    canonical: siteUrl,
  },

  // Additional metadata
  applicationName: "Feed Rank",
  category: "Education",
  classification: "Educational Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Feed Rank",
    "description": "Learn how ranking algorithms work through interactive gameplay. Discover why Wilson Score beats simple percentages.",
    "url": siteUrl,
    "applicationCategory": "EducationalApplication",
    "genre": "Educational Game",
    "educationalUse": "instruction",
    "educationalLevel": "Intermediate",
    "about": {
      "@type": "Thing",
      "name": "Wilson Score Interval",
      "description": "A statistical method for ranking items based on positive and negative ratings"
    },
    "teaches": [
      "Wilson Score Interval",
      "Ranking Algorithms",
      "Statistical Analysis",
      "Data Science"
    ],
    "interactivityType": "active",
    "learningResourceType": "interactive application",
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  };

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts - loaded at runtime */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen bg-ink text-ivory selection:bg-electric selection:text-ink"
      >
        {/* Structured Data (JSON-LD) */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Ambient glow effect */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <main
          id="main-content"
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-20"
        >
          {children}
        </main>

        {/* Footer accent line */}
        <div
          className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
