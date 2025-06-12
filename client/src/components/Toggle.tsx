import React, { useEffect, useState } from "react";

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
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded shadow hover:scale-105 transition"
    >
      {isDark ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
};

export default Toggle;
