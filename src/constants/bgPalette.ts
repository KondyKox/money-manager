export const BG_PALETTE = [
  { name: "Biały", bg: "bg-white", text: "text-gray-800" }, // default
  { name: "Fiolet", bg: "bg-purple-950", text: "text-white/80" },
  { name: "Zieleń", bg: "bg-emerald-900", text: "text-white/80" },
  { name: "Ocean", bg: "bg-slate-700", text: "text-white/80" },
  { name: "Pomarańcz", bg: "bg-amber-900", text: "text-white/85" },
  { name: "Malina", bg: "bg-rose-950", text: "text-white/80" },
  { name: "Węgiel", bg: "bg-slate-800", text: "text-white/80" },
  { name: "Mięta", bg: "bg-teal-900", text: "text-white/85" },
  { name: "Śliwka", bg: "bg-violet-950", text: "text-white/85" },
  { name: "Indygo", bg: "bg-indigo-900", text: "text-white/80" },
  { name: "Turkus", bg: "bg-cyan-900", text: "text-white/85" },
  { name: "Fuksja", bg: "bg-fuchsia-950", text: "text-white/80" },
  { name: "Ziemia", bg: "bg-stone-800", text: "text-white/80" },
  { name: "Oliwka", bg: "bg-lime-950", text: "text-white/80" },
] as const;

export type PaletteColor = (typeof BG_PALETTE)[number];

export const DEFAULT_BG_COLOR: PaletteColor = BG_PALETTE[0];
