// ThemeToggle.jsx

import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
    >
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
