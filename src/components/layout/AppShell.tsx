import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./Navbar";
import ToastContainer from "../ui/ToastContainer";
import ProtectedRoute from "../../routes/ProtectedRoute";
import DashboardRoute from "../../routes/DashboardRoute";
import Home from "../../pages/Home";
import AuthPage from "../../pages/AuthPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ProfilePicker from "../../pages/profiles/ProfilePicker";
import Settings from "../../pages/settings/Settings";
import { useTheme } from "../../hooks/useTheme";

const AppShell = () => {
  const { color } = useTheme();

  return (
    <>
      <Navbar />
      <main
        className={`flex justify-start items-center flex-col relative min-h-screen h-full pt-20 pb-5 md:pb-20 ${color.bg} ${color.text}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<AuthPage key="login" mode="login" />}
          />
          <Route
            path="/register"
            element={<AuthPage key="register" mode="register" />}
          />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profiles" element={<ProfilePicker />} />
            <Route path="/dashboard" element={<DashboardRoute />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>

      <ToastContainer />
      <Analytics />
    </>
  );
};

export default AppShell;
