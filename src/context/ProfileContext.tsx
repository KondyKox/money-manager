import { createContext, useCallback, useState, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { SELECTED_PROFILE_KEY } from "../constants/storageKeys";

interface ProfileContextType {
  selectedProfileId: string | null;
  selectProfile: (profileId: string) => void;
  clearProfile: () => void;
}

type Selection = {
  userId: string;
  profileId: string;
};

const readStoredSelection = (): Selection | null => {
  try {
    const raw = localStorage.getItem(SELECTED_PROFILE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.userId !== "string" ||
      typeof parsed.profileId !== "string"
    )
      return null;

    return {
      userId: parsed.userId,
      profileId: parsed.profileId,
    };
  } catch (error) {
    console.error("Error reading selection from localStorage:", error);
    return null;
  }
};

const writeStoredSelection = (selection: Selection) => {
  try {
    localStorage.setItem(SELECTED_PROFILE_KEY, JSON.stringify(selection));
  } catch (error) {
    console.error("Error saving selection to localStorage:", error);
  }
};

const clearStoredSelection = () => {
  try {
    localStorage.removeItem(SELECTED_PROFILE_KEY);
  } catch (error) {
    console.error("Error clearing selection from localStorage:", error);
  }
};

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [selection, setSelection] = useState<Selection | null>(
    readStoredSelection,
  );

  const selectedProfileId =
    selection && selection.userId === userId ? selection.profileId : null;

  const selectProfile = useCallback(
    (profileId: string) => {
      if (!userId) return;

      const next: Selection = { userId, profileId };
      setSelection(next);
      writeStoredSelection(next);
    },
    [userId],
  );

  const clearProfile = useCallback(() => {
    setSelection(null);
    clearStoredSelection();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ selectedProfileId, selectProfile, clearProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
