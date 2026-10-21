import { BG_PALETTE, DEFAULT_BG_COLOR } from "../../../constants/bgPalette";
import { useTheme } from "../../../hooks/useTheme";

const AppearancePanel = () => {
  const { color, setColor, resetColor } = useTheme();
  const isDefault = color.name === DEFAULT_BG_COLOR.name;

  return (
    <fieldset className="settings-panel">
      <legend>Wygląd</legend>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {BG_PALETTE.map((c) => (
            <button
              type="button"
              key={c.name}
              aria-pressed={color.name === c.name}
              onClick={() => setColor(c)}
              className={`${c.bg} ${c.text} p-3 text-center border uppercase cursor-pointer relative after:content-[''] after:absolute
                          after:inset-0 after:bg-pink-500/80 after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100
                          ${color.name === c.name ? "ring-2 ring-pink-500 pointer-events-none opacity-70" : ""}`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={resetColor}
          disabled={isDefault}
        >
          Przywróć domyślny
        </button>
      </div>
    </fieldset>
  );
};

export default AppearancePanel;
