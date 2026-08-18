import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Profile } from "./Profile";
import type { Income } from "./Income";
import type { Expense } from "./Expense";

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}

export interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  element: Income | Expense;
}
