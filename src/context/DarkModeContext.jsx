import { createContext, useContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = function ({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDark");

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = function () {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error(
      "DarkMode context was used outside of the DarkModeProvider."
    );

  return context;
};

export { DarkModeProvider, useDarkMode };
