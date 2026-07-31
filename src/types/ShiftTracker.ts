import type { Dispatch, SetStateAction } from "react";
import type { Profile } from "./Profile";

export interface ShiftTrackerProps {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}
