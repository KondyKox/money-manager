import { useState } from "react";
import type { Expense } from "../../types/Expense";
import Modal from "../modal/Modal";

const ExpenseElement = ({ expense }: { expense: Expense }) => {
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

      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl font-bold mb-4">{expense.category}</h2>
          <div className="flex justify-between items-center w-full">
            <p>
              {new Date(expense.date).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="font-mono font-semibold text-2xl text-red-500 shrink-0 ml-3">
              -{expense.amount.toFixed(2)}zł
            </p>
          </div>
          <div className="w-full h-full overflow-y-auto rounded-xl bg-white/80 text-black p-4 gap-2 flex flex-col">
            <span className="text-xs uppercase text-gray-600">Notatka</span>
            {expense.note ? (
              <p>{expense.note}</p>
            ) : (
              <p className="italic">Brak notatki</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ExpenseElement;
