import { useState } from "react";
import AddExpenseModal from "../modal/addExpense-modal";
import CollapsablePanel from "../ui/CollapsablePanel";
import type { DashboardElement } from "../../types/Dashboard";
import ExpenseElement from "../ui/ExpenseElement";
import type { ExpenseCategory } from "../../constants/expenseCategories";

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

  const filteredExpenses = editedProfile.expenses.filter((expense) => {
    const matchesMonth = expense.date.startsWith(selectedMonth);
    const matchesCategory =
      selectedCategory === null || expense.category === selectedCategory;
    return matchesMonth && matchesCategory;
  });

  const totalSpent = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <>
      <CollapsablePanel
        header="Wydatki"
        colorClass="shadow-black text-orange-950"
      >
        <div className="flex justify-center items-center gap-2 border-b-2 mb-4 pb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
          >
            dodaj wydatek
          </button>
        </div>

        <div className="flex justify-between items-center bg-gray-300 p-2 rounded-lg">
          <select name="" id="">
            {selectedMonth}
          </select>
          <select name="" id="">
            {selectedCategory}
          </select>
          <span className="text-2xl text-red-600 font-bold">
            -{totalSpent.toFixed(2)}zł
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          {filteredExpenses.length === 0 ? (
            <span className="text-center">Brak wydatków</span>
          ) : (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="w-full">
                <ExpenseElement expense={expense} />
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
