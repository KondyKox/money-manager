import { useState } from "react";
import ProfilePicker from "./components/ProfilePicker";
import Dashboard from "./components/Dashboard";
import ToastContainer from "./components/ui/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import { DEFAULT_BG_COLOR } from "./constants/bgPalette";
import { changeColor, getColor } from "./utils/changeColors";
import type { Color } from "./types/Color";

function App() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );
  const [color, setColor] = useState<Color>(getColor() ?? DEFAULT_BG_COLOR);

  const bgClass = color.bg;
  const textClass = color.text;

  const handleChangeColor = (newColor: Color) => {
    changeColor(newColor);
    setColor(newColor);
  };

  return (
    <ToastProvider>
      <main
        className={`flex justify-start items-center flex-col relative min-h-screen pb-5 md:pb-20 ${bgClass} ${textClass}`}
      >
        {!selectedProfileId ? (
          <ProfilePicker
            setSelectedProfileId={setSelectedProfileId}
            onChangeColor={handleChangeColor}
          />
        ) : (
          <Dashboard
            profileId={selectedProfileId}
            onChangeColor={handleChangeColor}
            onBack={() => setSelectedProfileId(null)}
          />
        )}
      </main>
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
