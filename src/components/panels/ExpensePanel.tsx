import { useState } from "react";
import AddExpenseModal from "../modal/addExpense-modal";
import CollapsablePanel from "../ui/CollapsablePanel";
import type { DashboardElement } from "../../types/Dashboard";
import ExpenseElement from "../ui/ExpenseElement";
import {
  EXPENSE_CATEGORIES,
  type ExpenseCategory,
} from "../../constants/expenseCategories";
import { deleteExpense } from "../../utils/updateProfile";
import { useToast } from "../../hooks/useToast";

const ExpensePanel = ({
  editedProfile,
  setEditedProfile,
}: DashboardElement) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(null);
  const { showToast } = useToast();

  // expenses that we use here
  const filteredExpenses = editedProfile.expenses.filter((expense) => {
    const matchesMonth = expense.date.startsWith(selectedMonth);
    const matchesCategory =
      selectedCategory === null || expense.category === selectedCategory;
    return matchesMonth && matchesCategory;
  });

  // total money spent by month
  const totalSpent = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  // available months
  const availableMonths = Array.from(
    new Set(editedProfile.expenses.map((e) => e.date.slice(0, 7))),
  )
    .sort()
    .reverse();

  // deleting expense
  const handleDeleteExpense = async (id: string) => {
    setEditedProfile((prev) =>
      prev
        ? { ...prev, expenses: prev.expenses.filter((e) => e.id !== id) }
        : prev,
    );
    await deleteExpense(id);
    showToast("Usunięto wydatek.", "success");
  };

  return (
    <>
      <CollapsablePanel
        header="Wydatki"
        colorClass="shadow-black text-orange-950 bg-white"
      >
        <div className="flex justify-center items-center gap-2 border-b-2 mb-4 pb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
          >
            dodaj wydatek
          </button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row justify-between items-center bg-gray-300 p-2 rounded-lg">
          <div className="flex justify-center items-center gap-4">
            <select
              name="availableMonths"
              id="availableMonths"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="select"
            >
              {availableMonths.length === 0 ? (
                <option value="">
                  {new Date().toLocaleDateString("pl-PL", {
                    month: "long",
                    year: "numeric",
                  })}
                </option>
              ) : (
                availableMonths.map((month) => (
                  <option key={month} value={month} className="px-2">
                    {new Date(month + "-01").toLocaleDateString("pl-PL", {
                      month: "long",
                      year: "numeric",
                    })}
                  </option>
                ))
              )}
            </select>
            <select
              name="categories"
              id="categories"
              value={(selectedCategory as ExpenseCategory) ?? "all"}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value === "all"
                    ? null
                    : (e.target.value as ExpenseCategory),
                )
              }
              className="select"
            >
              <option value="all" className="px-2">
                Wszystkie
              </option>
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category} value={category} className="px-2">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <span className="text-red-600 totalMoney">
            -{totalSpent.toFixed(2)}zł
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 mt-4">
          {filteredExpenses.length === 0 ? (
            <span className="text-center">Brak wydatków</span>
          ) : (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="w-full">
                <ExpenseElement
                  expense={expense}
                  onDelete={() => handleDeleteExpense(expense.id)}
                />
              </div>
            ))
          )}
        </div>
      </CollapsablePanel>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editedProfile={editedProfile}
        setEditedProfile={setEditedProfile}
      />
    </>
  );
};

export default ExpensePanel;
