import { BG_COLOR_KEY } from "../constants/storageKeys";
import type { Color } from "../types/Color";

export const getColor = (): Color | null => {
  const bgColor = localStorage.getItem(BG_COLOR_KEY);

  if (!bgColor) return null;

  const parsed: Color = JSON.parse(bgColor);

  return parsed;
};

export const changeColor = (color: Color) => {
  localStorage.setItem(BG_COLOR_KEY, JSON.stringify(color));
};
