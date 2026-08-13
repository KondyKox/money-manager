import { useState } from "react";
import type { Profile } from "../types/Profile";
import { getProfile } from "../utils/getProfiles";
import ShiftTracker from "./panels/ShiftTracker";
import ExpensePanel from "./panels/ExpensePanel";
import IncomePanel from "./panels/IncomePanel";

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
        <IncomePanel
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
        />

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
