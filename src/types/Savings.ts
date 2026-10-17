export interface Saving {
  id: string;
  amount: number;
  date: string;
  createdAt: string;
}

export interface SavingElementProps {
  saving: Saving;
  onDelete: (id: string) => void | Promise<void>;
  onEdit: (expense: Saving) => void | Promise<void>;
}
