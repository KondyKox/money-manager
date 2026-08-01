import type { Dispatch, SetStateAction } from "react";
import type { Profile } from "./Profile";

export interface CompletedShift {
  id: string;
  clockIn: string;
  clockOut: string;
  rate: number;
}

export interface ActiveShift {
  clockIn: string;
  rate: number;
  clockOut?: string;
}

export interface ShiftTrackerProps {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}
