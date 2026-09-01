export const BG_PALETTE = [
  {
    name: "Biały",
    bg: "bg-white",
    text: "text-gray-800",
    header: "text-gray-900",
  }, // default
  {
    name: "Fiolet",
    bg: "bg-purple-950",
    text: "text-white/80",
    header: "text-purple-300",
  },
  {
    name: "Zieleń",
    bg: "bg-emerald-900",
    text: "text-white/80",
    header: "text-emerald-300",
  },
  {
    name: "Ocean",
    bg: "bg-slate-700",
    text: "text-white/80",
    header: "text-sky-300",
  },
  {
    name: "Pomarańcz",
    bg: "bg-amber-900",
    text: "text-white/85",
    header: "text-amber-300",
  },
  {
    name: "Malina",
    bg: "bg-rose-950",
    text: "text-white/80",
    header: "text-rose-300",
  },
  {
    name: "Węgiel",
    bg: "bg-slate-800",
    text: "text-white/80",
    header: "text-slate-300",
  },
  {
    name: "Mięta",
    bg: "bg-teal-900",
    text: "text-white/85",
    header: "text-teal-300",
  },
  {
    name: "Śliwka",
    bg: "bg-violet-950",
    text: "text-white/85",
    header: "text-violet-300",
  },
  {
    name: "Indygo",
    bg: "bg-indigo-900",
    text: "text-white/80",
    header: "text-indigo-300",
  },
  {
    name: "Turkus",
    bg: "bg-cyan-900",
    text: "text-white/85",
    header: "text-cyan-300",
  },
  {
    name: "Fuksja",
    bg: "bg-fuchsia-950",
    text: "text-white/80",
    header: "text-fuchsia-300",
  },
  {
    name: "Ziemia",
    bg: "bg-stone-800",
    text: "text-white/80",
    header: "text-stone-300",
  },
  {
    name: "Oliwka",
    bg: "bg-lime-950",
    text: "text-white/80",
    header: "text-lime-300",
  },
] as const;

export type PaletteColor = (typeof BG_PALETTE)[number];

export const DEFAULT_BG_COLOR: PaletteColor = BG_PALETTE[0];
