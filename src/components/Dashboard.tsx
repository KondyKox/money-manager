import { useState } from "react";
import type { Profile } from "../types/Profile";
import { getProfile } from "../utils/getProfiles";
import ShiftTracker from "./ShiftTracker";
import ExpensePanel from "./ExpensePanel";

const Dashboard = ({ profileId }: { profileId: string }) => {
  const profile = getProfile(profileId);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(profile);

  if (!editedProfile) return null;

  return (
    <div className="flex flex-col justify-center items-center w-2/3">
      <h1 className="text-4xl font-bold p-4 text-gray-800">
        {editedProfile.name}
      </h1>
      <div className="border-t-2 flex flex-col justify-between items-stretch gap-4 py-2 w-full">
        {/* Shift Tracker */}
        <ShiftTracker
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
        />

        {/* Income panel */}
        <div className="rounded-lg px-3 py-4 flex-1 border-orange-400 border-2 text-white bg-orange-400">
          <h3 className="text-center font-bold mb-4 text-xl">
            sigmastyczne przychody
          </h3>
        </div>

        {/* Expenses panel */}
        <ExpensePanel
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
        />
      </div>
    </div>
  );
};

export default Dashboard;
