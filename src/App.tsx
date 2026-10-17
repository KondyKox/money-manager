import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import ProfilePicker from "./pages/profiles/ProfilePicker";
import ToastContainer from "./components/ui/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import { DEFAULT_BG_COLOR } from "./constants/bgPalette";
import { changeColor, getColor } from "./utils/changeColors";
import type { Color } from "./types/Color";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ColorPicker from "./components/modal/ColorPickerModal";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import { ProfileProvider } from "./context/ProfileContext";
import DashboardRoute from "./routes/DashboardRoute";
import Settings from "./pages/settings/Settings";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
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
      <AuthProvider>
        <ProfileProvider>
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
                  element={
                    <Home headerColor={headerClass} textColor={textClass} />
                  }
                />
                <Route
                  path="/login"
                  element={<AuthPage key="login" mode="login" />}
                />
                <Route
                  path="/register"
                  element={<AuthPage key="register" mode="register" />}
                />

                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profiles" element={<ProfilePicker />} />
                  <Route path="/dashboard" element={<DashboardRoute />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
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
            <Analytics />
          </ToastProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
