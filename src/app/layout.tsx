import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "../../file.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rank your Feed",
  description: "Wilson Score Implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-beautify="auto strong">
      <body
        className={`${interFont.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          transition: "background 0.3s, color 0.3s",
          padding: "var(--space-4)",
          lineHeight: "1.5",
          minHeight: "100vh"
        }}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content" className="max-w-4xl mx-auto" style={{ paddingBottom: "var(--space-8)" }}>
          {children}
        </main>
      
      </body>
    </html>
  );
}
