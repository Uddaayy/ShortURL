import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
const Toggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Load initial state from localStorage or default to true (dark mode)
    return localStorage.getItem("theme") === "light" ? false : true;
  });

  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
  <button
    onClick={toggleTheme}
    className={`group relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
      ${isDark 
        ? "bg-gradient-to-r from-zinc-800 to-zinc-700 text-white shadow-lg hover:shadow-zinc-600/50" 
        : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 shadow-md hover:shadow-blue-300"
      } hover:scale-105`}
  >
    <span className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
      {isDark ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4 text-blue-600" />}
      {isDark ? "Light" : "Dark"}
    </span>

    {/* Optional glowing background effect */}
    <span 
      className={`absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition duration-300 
        ${isDark ? "bg-yellow-400/10" : "bg-blue-400/10"}`}
    />
  </button>
);
};

export default Toggle;
