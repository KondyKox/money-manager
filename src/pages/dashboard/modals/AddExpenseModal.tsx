import { useState } from "react";
import type { EditModalProps } from "../../../types/Modal";
import type { Expense } from "../../../types/Expense";
import { EXPENSE_CATEGORIES } from "../../../constants/expenseCategories";
import Modal from "../../../components/modal/Modal";
import { useToast } from "../../../hooks/useToast";
import { addExpense } from "../../../services/profiles/saveProfile";
import LoadingDots from "../../../components/ui/LoadingDots";

const AddExpenseModal = ({
  isOpen,
  onClose,
  editedProfile,
  setEditedProfile,
}: EditModalProps) => {
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
    date?: string;
  }>({});

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { showToast } = useToast();

  const handleAddExpense = async () => {
    if (submitting) return;

    const newErrors: typeof errors = {};
    if (!newExpense.date) newErrors.date = "Data jest wymagana";
    if (!newExpense.amount) newErrors.amount = "Zysk jest wymagany";
    if (!newExpense.category) newErrors.category = "Wybierz kategorię";

    if (Object.keys(newErrors).length > 0) {
      showToast("Koszt, Kategoria i Data nie mogą być puste!", "error");
      console.warn("Amount, Category & Date cannot be empty!");
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const expenseToAdd: Expense = {
      id: crypto.randomUUID(),
      kind: "expense",
      date: newExpense.date!,
      amount: newExpense.amount!,
      category: newExpense.category!,
      note: newExpense.note,
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await addExpense(editedProfile.id, expenseToAdd);
      setEditedProfile((prev) =>
        prev ? { ...prev, expenses: [...prev.expenses, expenseToAdd] } : prev,
      );
      setNewExpense({ date: new Date().toISOString().slice(0, 10) });

      showToast("Dodano wydatek!", "success");
      onClose();
    } catch (error) {
      console.error("Error adding expense:", error);
      showToast(
        error instanceof Error ? error.message : "Nie udało się dodać wydatku.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
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
          <div>
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
          {errors.date && <p className="error-message">{errors.date}</p>}
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
              step={10}
              value={newExpense.amount ?? ""}
              onChange={(e) =>
                setNewExpense((prev) =>
                  prev
                    ? {
                        ...prev,
                        amount:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      }
                    : prev,
                )
              }
            />
            <span>zł</span>
          </div>
          {errors.amount && <p className="error-message">{errors.amount}</p>}
        </div>

        {/* Category selection */}
        <div className="input-group">
          <label>Kategoria</label>
          <div className="categories__container">
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
          {errors.category && (
            <p className="error-message">{errors.category}</p>
          )}
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
          disabled={submitting}
        >
          {submitting ? <LoadingDots /> : "Dodaj"}
        </button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
