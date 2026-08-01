import type { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
