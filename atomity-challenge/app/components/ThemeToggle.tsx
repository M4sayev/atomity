"use client";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle light/dark mode"
    >
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}

export default ThemeToggle;
