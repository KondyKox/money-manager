import { useState } from "react";
import AddExpenseModal from "./addExpense-modal";
import CollapsablePanel from "./CollapsablePanel";

const ExpensePanel = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      </CollapsablePanel>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ExpensePanel;
