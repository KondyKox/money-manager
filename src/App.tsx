import { useState } from "react";
import ProfilePicker from "./pages/ProfilePicker";
import Dashboard from "./pages/Dashboard";
import ToastContainer from "./components/ui/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import { DEFAULT_BG_COLOR } from "./constants/bgPalette";
import { changeColor, getColor } from "./utils/changeColors";
import type { Color } from "./types/Color";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import ColorPicker from "./components/modal/colorPicker-modal";
import Home from "./pages/Home";

function App() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );
  const [color, setColor] = useState<Color>(getColor() ?? DEFAULT_BG_COLOR);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const bgClass = color.bg;
  const textClass = color.text;
  const headerClass = color.header;

  const handleChangeColor = (newColor: Color) => {
    changeColor(newColor);
    setColor(newColor);
  };

  return (
    <BrowserRouter>
      <ToastProvider>
        <Navbar
          onOpenColors={() => setShowColorPicker(true)}
          bgColor={bgClass}
          textColor={textClass}
        />
        <main
          className={`flex justify-start items-center flex-col relative min-h-screen h-full pt-20 pb-5 md:pb-20 ${bgClass} ${textClass}`}
        >
          <Routes>
            <Route
              path="/"
              element={<Home headerColor={headerClass} textColor={textClass} />}
            />
            <Route
              path="/profile"
              element={
                <ProfilePicker setSelectedProfileId={setSelectedProfileId} />
              }
            />
            <Route
              path="/dashboard"
              element={
                selectedProfileId ? (
                  <Dashboard profileId={selectedProfileId} />
                ) : (
                  <Navigate to="/profiles" replace />
                )
              }
            />
          </Routes>
        </main>

        {showColorPicker && (
          <ColorPicker
            isOpen={showColorPicker}
            onClose={() => setShowColorPicker(false)}
            onChangeColor={handleChangeColor}
          />
        )}

        <ToastContainer />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
