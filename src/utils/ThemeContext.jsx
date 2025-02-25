import { createContext, useContext, useEffect, useState } from "react";
export const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }) => {

  const getSystemTheme = () => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkMode ? "dark" : "light";
  };

  
  const [theme, setTheme] = useState(() => {
   
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : getSystemTheme();
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
    console.log("theme current: ",theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
