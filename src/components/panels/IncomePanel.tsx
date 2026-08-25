import { useState } from "react";
import type { DashboardElement } from "../../types/Dashboard";
import CollapsablePanel from "../ui/CollapsablePanel";
import AddIncomeModal from "../modal/addIncome-modal";
import {
  INCOME_CATEGORIES,
  type IncomeCategory,
} from "../../constants/incomeCategories";
import IncomeElement from "../ui/IncomeElement";

const IncomePanel = ({ editedProfile, setEditedProfile }: DashboardElement) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );
  const [selectedCategory, setSelectedCategory] =
    useState<IncomeCategory | null>(null);

  const availableMonths = Array.from(
    new Set(editedProfile.incomes.map((i) => i.date.slice(0, 7))),
  )
    .sort()
    .reverse();

  const filteredIncomes = editedProfile.incomes;

  const totalIncome = filteredIncomes.reduce(
    (sum, income) => sum + income.amount,
    0,
  );

  return (
    <>
      <CollapsablePanel
        header="Przychody"
        colorClass="border-orange-400 text-white bg-orange-400"
      >
        <div className="flex justify-center items-center gap-2 border-b-2 mb-4 pb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
          >
            dodaj przychód
          </button>
        </div>

        <div className="flex justify-between items-center flex-col md:flex-row gap-4 bg-orange-300 p-2 rounded-lg">
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
              value={(selectedCategory as IncomeCategory) ?? "all"}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value === "all"
                    ? null
                    : (e.target.value as IncomeCategory),
                )
              }
              className="select"
            >
              <option value="all" className="px-2 bg-black/80">
                Wszystkie
              </option>
              {INCOME_CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="px-2 bg-black/80"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <span className="text-green-600 totalMoney">
            +{totalIncome.toFixed(2)}zł
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 mt-4">
          {filteredIncomes.length === 0 ? (
            <span className="text-center">Brak przychodów</span>
          ) : (
            filteredIncomes.map((income) => (
              <div key={income.id} className="w-full">
                <IncomeElement income={income} />
              </div>
            ))
          )}
        </div>
      </CollapsablePanel>

      <AddIncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editedProfile={editedProfile}
        setEditedProfile={setEditedProfile}
      />
    </>
  );
};

export default IncomePanel;
