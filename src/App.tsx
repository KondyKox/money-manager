import { useState } from "react";
import ProfilePicker from "./components/ProfilePicker";
import Dashboard from "./components/Dashboard";

function App() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );

  return (
    <main className="flex justify-center items-center flex-col p-2 m-2">
      {!selectedProfileId ? (
        <ProfilePicker setSelectedProfileId={setSelectedProfileId} />
      ) : (
        <Dashboard profileId={selectedProfileId} />
      )}
    </main>
  );
}

export default App;
