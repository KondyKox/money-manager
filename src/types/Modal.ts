import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Profile } from "./Profile";

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}
