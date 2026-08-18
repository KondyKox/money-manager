import { useState } from "react";
import type { EditModalProps } from "../../types/Modal";
import type { Expense } from "../../types/Expense";
import { EXPENSE_CATEGORIES } from "../../constants/expenseCategories";
import type { Profile } from "../../types/Profile";
import { saveProfile } from "../../utils/saveProfile";
import Modal from "./Modal";
import { useToast } from "../../hooks/useToast";

const AddExpenseModal = ({
  isOpen,
  onClose,
  editedProfile,
  setEditedProfile,
}: EditModalProps) => {
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().slice(0, 10),
  });

  const { showToast } = useToast();

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.date) {
      showToast("Kategoria, Koszt i Data nie mogą być puste!", "error");
      console.warn("Category, Amount & Date cannot be empty!");
      return;
    }

    const expenseToAdd: Expense = {
      id: crypto.randomUUID(),
      kind: "expense",
      date: newExpense.date,
      amount: newExpense.amount,
      category: newExpense.category,
      note: newExpense.note,
    };

    const updatedProfile: Profile = {
      ...editedProfile,
      expenses: [...editedProfile.expenses, expenseToAdd],
    };

    setEditedProfile(updatedProfile);
    saveProfile(updatedProfile);
    setNewExpense({ date: new Date().toISOString().slice(0, 10) });

    showToast("Dodano wydatek!", "success");
    onClose();
  };

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
          <label>Kategoria</label>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
            {EXPENSE_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`btn-primary ${newExpense.category === category ? "bg-blue-400 pointer-events-none" : ""}`}
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

        <button
          className="btn-secondary w-full"
          onClick={() => handleAddExpense()}
        >
          Dodaj
        </button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
