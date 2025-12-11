import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
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
    <html lang="en">
      <body
        className={`${interFont.variable} ${jetbrainsMono.variable} ${interFont.className} antialiased min-h-screen bg-neutral-50`}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <main id="main-content" className="max-w-4xl mx-auto px-4 py-8 pb-20">
          {children}
        </main>

      </body>
    </html>
  );
}
