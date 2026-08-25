export const BG_PALETTE = [
  { name: "Biały", bg: "bg-white", text: "text-gray-800" }, // default
  { name: "Fiolet", bg: "bg-purple-600", text: "text-white/80" },
  { name: "Zieleń", bg: "bg-green-600", text: "text-white/80" },
  { name: "Ocean", bg: "bg-blue-700", text: "text-white/80" },
  { name: "Pomarańcz", bg: "bg-orange-500", text: "text-white/90" },
  { name: "Malina", bg: "bg-rose-600", text: "text-white/85" },
  { name: "Węgiel", bg: "bg-slate-800", text: "text-white/80" },
  { name: "Mięta", bg: "bg-teal-500", text: "text-white/90" },
  { name: "Śliwka", bg: "bg-violet-800", text: "text-white/85" },
] as const;

export type PaletteColor = (typeof BG_PALETTE)[number];

export const DEFAULT_BG_COLOR: PaletteColor = BG_PALETTE[0];
