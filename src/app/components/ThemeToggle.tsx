"use client";
import React from "react";

export default function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}) {
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 1000,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 24,
        color: "var(--foreground)",
        transition: "color 0.2s",
      }}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
