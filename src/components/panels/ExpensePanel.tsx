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
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | null>(null);

  const filteredExpenses = editedProfile.expenses;

  return (
    <>
      <CollapsablePanel
        header="Wydatki"
        colorClass="shadow-black text-orange-950"
      >
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
          >
            dodaj wydatek
          </button>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 mt-4 pt-4 border-t-2">
          {filteredExpenses ? (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="w-full">
                <ExpenseElement expense={expense} />
              </div>
            ))
          ) : (
            <span className="text-center">Brak wydatków</span>
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
