import { useState } from "react";
import { INCOME_CATEGORIES } from "../../constants/incomeCategories";
import { useToast } from "../../hooks/useToast";
import type { EditModalProps } from "../../types/Modal";
import Modal from "./Modal";
import type { Income } from "../../types/Income";
import type { Profile } from "../../types/Profile";
import { addIncome } from "../../utils/saveProfile";

const AddIncomeModal = ({
  isOpen,
  onClose,
  editedProfile,
  setEditedProfile,
}: EditModalProps) => {
  const [newIncome, setNewIncome] = useState<Partial<Income>>({
    date: new Date().toISOString().slice(0, 10),
  });
  const { showToast } = useToast();

  const handleAddIncome = async () => {
    if (!newIncome.amount || !newIncome.category || !newIncome.date) {
      showToast("Zysk, Kategoria i Data nie mogą być puste!", "error");
      console.warn("Amount, Category & Date cannot be empty!");
      return;
    }

    const incomeToAdd: Income = {
      id: crypto.randomUUID(),
      kind: "income",
      date: newIncome.date,
      amount: newIncome.amount,
      category: newIncome.category,
      note: newIncome.note,
    };

    const updatedProfile: Profile = {
      ...editedProfile,
      incomes: [...editedProfile.incomes, incomeToAdd],
    };

    setEditedProfile(updatedProfile);
    await addIncome(updatedProfile.id, incomeToAdd);
    setNewIncome({ date: new Date().toISOString().slice(0, 10) });

    showToast("Dodano przychód!", "success");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-xl border-b-2 pb-4">
        Dodaj przychód
      </h2>

      <div className="flex flex-col justify-center items-center gap-2 mt-6">
        {/* Date input */}
        <div className="input-group">
          <label htmlFor="income-date">Data przychodu</label>
          <input
            required
            type="date"
            id="income-date"
            name="income-date"
            value={newIncome.date}
            onChange={(e) =>
              setNewIncome((prev) =>
                prev ? { ...prev, date: e.target.value } : prev,
              )
            }
          />
        </div>

        {/* Money input */}
        <div className="input-group">
          <label htmlFor="income-amout">Zysk</label>
          <div>
            <input
              required
              type="number"
              id="income-amout"
              name="income-amout"
              placeholder="Ile zarobione..."
              step={10}
              value={newIncome.amount ?? 0}
              onChange={(e) =>
                setNewIncome((prev) =>
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
            {INCOME_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`btn-primary ${newIncome.category === category ? "bg-blue-400 pointer-events-none" : ""}`}
                onClick={() =>
                  setNewIncome((prev) =>
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
          <label htmlFor="income-note">Opis (opcjonalnie)</label>
          <textarea
            name="income-note"
            id="income-note"
            value={newIncome.note}
            onChange={(e) =>
              setNewIncome((prev) =>
                prev ? { ...prev, note: e.target.value } : prev,
              )
            }
          />
        </div>

        <button
          className="btn-secondary w-full"
          onClick={() => handleAddIncome()}
        >
          Dodaj
        </button>
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
