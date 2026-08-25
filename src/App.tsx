import { useState } from "react";
import ProfilePicker from "./components/ProfilePicker";
import Dashboard from "./components/Dashboard";
import ToastContainer from "./components/ui/ToastContainer";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );

  return (
    <ToastProvider>
      <main className="flex justify-center items-center flex-col relative">
        {!selectedProfileId ? (
          <ProfilePicker setSelectedProfileId={setSelectedProfileId} />
        ) : (
          <Dashboard profileId={selectedProfileId} />
        )}
      </main>
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
