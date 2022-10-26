import { createContext, useState } from "react";

const Context = createContext();

function ThemeProvider({ children }) {
  const [isLightMode, setIsLightMode] = useState(false);

  const flipTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const values = {
    flipTheme,
    isLightMode,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export { ThemeProvider, Context };
