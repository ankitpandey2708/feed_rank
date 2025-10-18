import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import { GitHubBadge } from "./components/GitHubBadge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "var(--background)", color: "var(--foreground)", transition: "background 0.3s, color 0.3s" }}
      >
        <ThemeProvider>
          {children}
          <GitHubBadge />
        </ThemeProvider>
      </body>
    </html>
  );
}
