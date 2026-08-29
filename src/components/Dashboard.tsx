import { useEffect, useRef, useState } from "react";
import type { Profile } from "../types/Profile";
import ShiftTracker from "./panels/ShiftTracker";
import ExpensePanel from "./panels/ExpensePanel";
import IncomePanel from "./panels/IncomePanel";
import { CircleX, Edit, MoveLeft, Palette, Save } from "lucide-react";
import { saveProfile } from "../utils/saveProfile";
import ColorPicker from "./modal/colorPicker-modal";
import { getProfile } from "../utils/getProfiles";
import type { DashboardProps } from "../types/Dashboard";

const Dashboard = ({ profileId, onChangeColor, onBack }: DashboardProps) => {
  const profile = getProfile(profileId);
  const [editedProfile, setEditedProfile] = useState<Profile | null>(profile);
  const [edited, setEdited] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleSaveProfile = () => {
    if (!newName || !editedProfile) return;

    const updatedProfile: Profile = {
      ...editedProfile,
      name: newName,
    };

    setEditedProfile(updatedProfile);
    setEdited(false);
    saveProfile(updatedProfile);
  };

  if (!editedProfile) return null;

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
