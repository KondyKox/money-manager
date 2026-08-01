import { useState } from "react";
import type { AddExpenseModalProps } from "../types/Modal";
import Modal from "./Modal";
import type { Expense } from "../types/Expense";
import { EXPENSE_CATEGORIES } from "../constants/expenseCategories";

const AddExpenseModal = ({ isOpen, onClose }: AddExpenseModalProps) => {
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().slice(0, 10),
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-xl border-b-2 pb-4">
        Dodaj wydatek
      </h2>

      <div className="flex flex-col justify-center items-center gap-2 mt-6">
        {/* Date input */}
        <div className="input-group">
          <label htmlFor="expense-date">Data wydatku</label>
          <input
            required
            type="date"
            id="expense-date"
            name="expense-date"
            value={newExpense?.date}
            onChange={(e) =>
              setNewExpense((prev) =>
                prev ? { ...prev, date: e.target.value } : prev,
              )
            }
          />
        </div>

        {/* Money input */}
        <div className="input-group">
          <label htmlFor="expense-amout">Koszt</label>
          <div>
            <input
              required
              type="number"
              id="expense-amout"
              name="expense-amout"
              placeholder="Ile kosztowało..."
              step={0.5}
              value={newExpense.amount ?? 0}
              onChange={(e) =>
                setNewExpense((prev) =>
                  prev ? { ...prev, amount: Number(e.target.value) } : prev,
                )
              }
            />
            <span>zł</span>
          </div>
        </div>

        {/* Category selection */}
        <div className="input-group">
          <label htmlFor="">Kategoria</label>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
            {EXPENSE_CATEGORIES.map((category) => (
              <button
                className={`btn-primary ${newExpense.category === category ? "bg-blue-400" : ""}`}
                onClick={() =>
                  setNewExpense((prev) =>
                    prev ? { ...prev, category: category } : prev,
                  )
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Note field */}
        <div className="input-group">
          <label htmlFor="expense-note">Opis (opcjonalnie)</label>
          <textarea
            name="expense-note"
            id="expense-note"
            value={newExpense.note}
            onChange={(e) =>
              setNewExpense((prev) =>
                prev ? { ...prev, note: e.target.value } : prev,
              )
            }
          />
        </div>

        <button className="btn-secondary w-full">Dodaj</button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
