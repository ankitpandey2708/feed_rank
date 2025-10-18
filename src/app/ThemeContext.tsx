"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    // Set CSS variables for theme
    if (theme === "dark") {
      document.documentElement.style.setProperty("--background", "#0a0a0a");
      document.documentElement.style.setProperty("--foreground", "#ededed");
    } else {
      document.documentElement.style.setProperty("--background", "#ffffff");
      document.documentElement.style.setProperty("--foreground", "#171717");
    }
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
