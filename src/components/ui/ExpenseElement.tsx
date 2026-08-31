import { useState } from "react";
import type { ExpenseElementProps } from "../../types/Expense";
import DetailModal from "../modal/detail-modal";

const ExpenseElement = ({ expense, onDelete, onEdit }: ExpenseElementProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsDetailOpen(true)}
        className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
      >
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">
            {expense.category}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(expense.date).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        <span className="font-mono font-semibold text-red-500 shrink-0 ml-3">
          -{expense.amount.toFixed(2)}zł
        </span>
      </button>

      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        element={expense}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default ExpenseElement;
