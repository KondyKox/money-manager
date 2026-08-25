import { useEffect, useState } from "react";
import ProfilePicker from "./components/ProfilePicker";
import Dashboard from "./components/Dashboard";
import ToastContainer from "./components/ui/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import { getProfile } from "./utils/getProfiles";
import { DEFAULT_BG_COLOR } from "./constants/bgPalette";
import type { Profile } from "./types/Profile";

function App() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const bgClass = selectedProfile?.color.bg ?? DEFAULT_BG_COLOR.bg;
  const textClass = selectedProfile?.color.text ?? DEFAULT_BG_COLOR.text;

  useEffect(() => {
    setSelectedProfile(
      selectedProfileId ? getProfile(selectedProfileId) : null,
    );
  }, [selectedProfileId]);

  return (
    <ToastProvider>
      <main
        className={`flex justify-start items-center flex-col relative min-h-screen pb-5 md:pb-20 ${bgClass} ${textClass}`}
      >
        {!selectedProfileId ? (
          <ProfilePicker setSelectedProfileId={setSelectedProfileId} />
        ) : (
          <Dashboard
            editedProfile={selectedProfile!}
            setEditedProfile={setSelectedProfile}
          />
        )}
      </main>
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
