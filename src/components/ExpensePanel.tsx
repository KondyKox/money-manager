import { useState } from "react";
import AddExpenseModal from "./addExpense-modal";

const ExpensePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="rounded-lg px-3 py-4 flex-1 text-orange-950 shadow-lg shadow-black">
      <h3 className="text-center font-bold mb-4 text-xl">
        sigmastyczne wydatki
      </h3>
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div>
        <button onClick={() => setIsModalOpen(true)} className="btn-secondary">
          dodaj wydatek
        </button>
      </div>
    </div>
  );
};

export default ExpensePanel;
