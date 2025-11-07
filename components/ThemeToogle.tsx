"use client";

import { useTheme } from "@/components/ThemeProvider";
import { MdDarkMode, MdLightMode } from "react-icons/md";


export default function ThemeToggle() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      disabled={!isLoaded}
      className="p-2 transition-colors duration-200 disabled:cursor-not-allowed"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? (
        <MdDarkMode 
          size={22} 
          className="text-highlight hover:text-highlightHover transition-colors duration-200" 
        />
      ) : (
        <MdLightMode 
          size={22} 
          className="text-highlight hover:text-highlightHover transition-colors duration-200" 
        />
      )}
    </button>
  );
}
