import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Profile } from "./Profile";
import type { Income } from "./Income";
import type { Expense } from "./Expense";
import type { Color } from "./Color";
import type { CompletedShift } from "./Shift";
import type { Saving } from "./Savings";

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

export interface DetailModalProps<T extends Expense | Income> {
  isOpen: boolean;
  onClose: () => void;
  element: T;
  onDelete: (id: string) => void;
  onEdit: (element: T) => void;
}

export interface SavingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  saving: Saving;
  onDelete: (id: string) => void;
  onEdit: (saving: Saving) => void;
}

export interface ShiftDetailProps {
  shift: CompletedShift;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (shift: CompletedShift) => void;
}

export interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeColor: (newColor: Color) => void;
}
