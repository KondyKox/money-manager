import { createContext, useCallback, useState, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

interface ProfileContextType {
  selectedProfileId: string | null;
  selectProfile: (profileId: string) => void;
  clearProfile: () => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined,
);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const [selection, setSelection] = useState<{
    userId: string;
    profileId: string;
  } | null>(null);

  const selectedProfileId =
    selection && selection.userId === userId ? selection.profileId : null;

  const selectProfile = useCallback(
    (profileId: string) => {
      if (!user) return;

      setSelection({ userId: user.id, profileId });
    },
    [userId],
  );

  const clearProfile = useCallback(() => setSelection(null), []);

  return (
    <ProfileContext.Provider
      value={{ selectedProfileId, selectProfile, clearProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
