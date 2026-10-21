import { BG_PALETTE } from "../constants/bgPalette";
import { BG_COLOR_KEY } from "../constants/storageKeys";
import type { Color } from "../types/Color";

export const getColor = (): Color | null => {
  try {
    const name = localStorage.getItem(BG_COLOR_KEY);
    if (!name) return null;

    return BG_PALETTE.find((c) => c.name === name) ?? null;
  } catch (error) {
    console.error("Error reading color from localStorage:", error);
    return null;
  }
};

export const changeColor = (color: Color) => {
  try {
    localStorage.setItem(BG_COLOR_KEY, color.name);
  } catch (error) {
    console.error("Error saving color to localStorage:", error);
  }
};
