import { useEffect, useRef, useState } from "react";
import type { Profile } from "../../types/Profile";
import ShiftTracker from "./panels/ShiftTracker";
import ExpensePanel from "./panels/ExpensePanel";
import IncomePanel from "./panels/IncomePanel";
import { CircleX, Edit, Save, Trash2 } from "lucide-react";
import { saveProfileInfo } from "../../services/profiles/saveProfile";
import { getProfile } from "../../services/profiles/getProfiles";
import Skeleton from "../../components/ui/Skeleton";
import SavingsPanel from "./panels/SavingsPanel";
import { useToast } from "../../hooks/useToast";
import { deleteProfile } from "../../services/profiles/deleteProfile";
import { useNavigate } from "react-router-dom";
import { cleanName } from "../../utils/cleanName";
import DeleteProfileModal from "./modals/DeleteProfileModal";
import { useProfile } from "../../hooks/useProfile";

const Dashboard = ({ profileId }: { profileId: string }) => {
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [edited, setEdited] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { clearProfile } = useProfile();

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await getProfile(profileId);
        if (!cancelled) setEditedProfile(profile ?? null);
      } catch (error) {
        console.error("Error loading profile:", error);
        if (!cancelled) setEditedProfile(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadProfile();
    return () => {
      cancelled = true;
    };
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
    if (!editedProfile || saving) return;

    const name = cleanName(newName);
    if (!name) {
      showToast("Nazwa profilu nie może być pusta.", "error");
      return;
    }
    if (name === editedProfile.name) {
      setEdited(false);
      return;
    }

    setSaving(true);
    try {
      await saveProfileInfo(editedProfile.id, name, editedProfile.hourlyRate);
      setEditedProfile((prev) => (prev ? { ...prev, name } : prev));
      setEdited(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Nie udało się zapisać profilu.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!editedProfile || deleting) return;

    setDeleting(true);
    try {
      await deleteProfile(editedProfile.id);
      showToast(`Usunięto profil ${editedProfile.name}.`, "success");
      clearProfile();
      navigate("/profiles", { replace: true });
    } catch (error) {
      console.error("Error deleting profile:", error);
      showToast(
        error instanceof Error ? error.message : "Błąd przy usuwaniu profilu.",
        "error",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center md:w-2/3 lg:w-1/2 px-4 w-full">
        <Skeleton className="h-10 w-2/3 my-4" />
        <div className="border-t-2 flex flex-col gap-4 py-4 w-full">
          <Skeleton className="h-24 w-full" />
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
              <Trash2
                size={24}
                className="iconBtn hover:text-red-500"
                onClick={() => setIsDeleteOpen(true)}
              />
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
          <SavingsPanel
            editedProfile={editedProfile}
            setEditedProfile={setEditedProfile}
          />
        </div>
      </div>

      {isDeleteOpen && (
        <DeleteProfileModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteProfile}
          profileName={editedProfile.name}
          deleting={deleting}
        />
      )}
    </>
  );
};

export default Dashboard;
