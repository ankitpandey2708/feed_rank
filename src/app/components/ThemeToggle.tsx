"use client";
import React from "react";

export default function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}) {
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={toggleTheme}
      style={{
        padding: "var(--space-2)",
        backgroundColor: "var(--background)",
        border: "2px solid transparent",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        fontSize: "var(--text-lg)",
        color: "var(--foreground)",
        transition: "all 0.2s ease",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        outline: "none",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "var(--foreground)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "transparent";
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
