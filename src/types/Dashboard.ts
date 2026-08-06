import type { Dispatch, SetStateAction } from "react";
import type { Profile } from "./Profile";

export interface DashboardElement {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}
