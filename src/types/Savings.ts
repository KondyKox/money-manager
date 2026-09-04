export interface Saving {
  id: string;
  amount: number;
  date: string;
}

export interface SavingElementProps {
  saving: Saving;
  onDelete: (id: string) => void;
  onEdit: (expense: Saving) => void;
}
