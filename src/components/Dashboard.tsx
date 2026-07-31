import { useState } from "react";
import type { Profile } from "../types/Profile";
import { getProfile } from "../utils/getProfiles";
import EditPanel from "./EditPanel";

const Dashboard = ({ profileId }: { profileId: string }) => {
  const profile = getProfile(profileId);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(profile);

  if (!editedProfile) return null;

  return (
    <div className="flex flex-col justify-center items-center w-2/3">
      <h1 className="text-4xl font-bold p-4 text-gray-800">
        {editedProfile.name}
      </h1>
      <div className="border-t-2 flex justify-between items-stretch gap-2 py-2 w-full">
        {/* Edit panel */}
        <EditPanel
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
        />

        {/* Data panel */}
        <div className="rounded-lg px-3 py-4 flex-1 border-green-400 border-2">
          <h3 className="text-center font-bold text-orange-950 mb-4 text-xl">
            sigmastyczne dane
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
