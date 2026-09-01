import { useEffect, useRef, useState } from "react";
import type { Profile } from "../types/Profile";
import ShiftTracker from "../components/panels/ShiftTracker";
import ExpensePanel from "../components/panels/ExpensePanel";
import IncomePanel from "../components/panels/IncomePanel";
import { CircleX, Edit, Save } from "lucide-react";
import { saveProfileInfo } from "../utils/saveProfile";
import { getProfile } from "../utils/getProfiles";
import Skeleton from "../components/ui/Skeleton";

const Dashboard = ({ profileId }: { profileId: string }) => {
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [edited, setEdited] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile(profileId);
      setEditedProfile(profile);
      setIsLoading(false);
    };
    loadProfile();
  }, [profileId]);

  useEffect(() => {
    if (edited) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [edited]);

  const handleEditClick = () => {
    if (!editedProfile) return;

    setNewName(editedProfile.name);
    setEdited(true);
  };

  const handleSaveProfile = async () => {
    if (!newName || !editedProfile) return;

    const updatedProfile: Profile = {
      ...editedProfile,
      name: newName,
    };

    setEditedProfile(updatedProfile);
    setEdited(false);
    await saveProfileInfo(
      updatedProfile.id,
      updatedProfile.name,
      updatedProfile.hourlyRate,
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center md:w-2/3 lg:w-1/2 px-4 w-full">
        <Skeleton className="h-10 w-2/3 my-4" />
        <div className="border-t-2 flex flex-col gap-4 py-4 w-full">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!editedProfile) {
    return <div className="text-center p-6">Nie znaleziono profilu.</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center md:w-2/3 lg:w-1/2 px-4">
        <div className="flex justify-center items-center w-full gap-2">
          <h1 className="text-4xl font-bold py-4 w-full text-center">
            {edited ? (
              <input
                ref={editInputRef}
                type="text"
                className="uppercase px-2 bg-blue-200 w-full"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveProfile();
                  if (e.key === "Escape") setEdited(false);
                }}
              />
            ) : (
              editedProfile.name
            )}
          </h1>
          {!edited ? (
            <>
              <Edit
                size={24}
                className="iconBtn hover:text-yellow-400"
                onClick={() => handleEditClick()}
              />
            </>
          ) : (
            <>
              <CircleX
                size={24}
                className="iconBtn hover:text-red-400"
                onClick={() => setEdited(false)}
              />
              <Save
                size={24}
                className="iconBtn hover:text-blue-400"
                onClick={handleSaveProfile}
              />
            </>
          )}
        </div>
        <div className="border-t-2 flex flex-col justify-between items-stretch gap-4 py-2 w-full">
          <ShiftTracker
            editedProfile={editedProfile}
            setEditedProfile={setEditedProfile}
          />
          <IncomePanel
            editedProfile={editedProfile}
            setEditedProfile={setEditedProfile}
          />
          <ExpensePanel
            editedProfile={editedProfile}
            setEditedProfile={setEditedProfile}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
