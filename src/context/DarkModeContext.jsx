import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContextpro = createContext();

function DarkModeContext({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (!isDark) {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      } else {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      }
    },
    [isDark]
  );

  function toggleDark() {
    setIsDark((isDark) => !isDark);
  }

  return (
    <DarkModeContextpro.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContextpro.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkModeContextpro);
  if (context === undefined)
    throw new Error("You can't use useDarkMode function outside the context!");
  return context;
}

export default DarkModeContext;
