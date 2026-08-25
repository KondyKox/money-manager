import type { Profile } from "../types/Profile";
import { DEFAULT_BG_COLOR } from "./bgPalette";

export const newProfiles: Profile[] = [
  {
    id: "1",
    name: "Kondy",
    hourlyRate: 31.5,
    activeShift: null,
    completedShifts: [],
    expenses: [],
    incomes: [],
    color: DEFAULT_BG_COLOR,
  },

  {
    id: "2",
    name: "Kasia",
    hourlyRate: 33.5,
    activeShift: null,
    completedShifts: [],
    expenses: [],
    incomes: [],
    color: DEFAULT_BG_COLOR,
  },
];
