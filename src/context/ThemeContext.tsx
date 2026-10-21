import { createContext, useCallback, useState, type ReactNode } from "react";
import type { Color } from "../types/Color";
import { changeColor, getColor } from "../utils/changeColors";
import { DEFAULT_BG_COLOR } from "../constants/bgPalette";

interface ThemeContextType {
  color: Color;
  setColor: (color: Color) => void;
  resetColor: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColorState] = useState<Color>(
    () => getColor() ?? DEFAULT_BG_COLOR,
  );

  const setColor = useCallback((newColor: Color) => {
    changeColor(newColor);
    setColorState(newColor);
  }, []);

  const resetColor = useCallback(() => setColor(DEFAULT_BG_COLOR), [setColor]);

  return (
    <ThemeContext.Provider value={{ color, setColor, resetColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
