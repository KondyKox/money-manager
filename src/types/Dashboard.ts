import type { Dispatch, SetStateAction } from "react";
import type { Profile } from "./Profile";
import type { Color } from "./Color";

export interface DashboardProps {
  profileId: string;
  onChangeColor: (newColor: Color) => void;
  onBack: () => void;
}

export interface DashboardElement {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}
