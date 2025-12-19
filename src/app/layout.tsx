import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feed Rank — Master the Algorithm",
  description: "Learn how ranking algorithms work through interactive gameplay. Discover why Wilson Score beats simple percentages.",
  keywords: ["wilson score", "ranking algorithm", "game", "statistics", "learning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
