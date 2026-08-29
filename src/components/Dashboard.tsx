import { useEffect, useRef, useState } from "react";
import type { Profile } from "../types/Profile";
import ShiftTracker from "./panels/ShiftTracker";
import ExpensePanel from "./panels/ExpensePanel";
import IncomePanel from "./panels/IncomePanel";
import { CircleX, Edit, MoveLeft, Palette, Save } from "lucide-react";
import { saveProfileInfo } from "../utils/saveProfile";
import { getProfile } from "../utils/getProfiles";
import ColorPicker from "./modal/colorPicker-modal";
import type { DashboardProps } from "../types/Dashboard";

const Dashboard = ({ profileId, onChangeColor, onBack }: DashboardProps) => {
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [edited, setEdited] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    return <div className="text-center p-6">Ładowanie...</div>;
  }

  if (!editedProfile) {
    return <div className="text-center p-6">Nie znaleziono profilu.</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center md:w-2/3 lg:w-1/2 px-4">
        <div className="flex justify-center items-center w-full gap-2">
          {!edited && (
            <MoveLeft
              size={24}
              className="iconBtn hover:text-red-500"
              onClick={onBack}
            />
          )}
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
              <Palette
                size={24}
                className="iconBtn hover:text-pink-400"
                onClick={() => setIsModalOpen(true)}
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

      {isModalOpen && (
        <ColorPicker
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChangeColor={onChangeColor}
        />
      )}
    </>
  );
};

export default Dashboard;
