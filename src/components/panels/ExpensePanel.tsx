import { useState } from "react";
import AddExpenseModal from "../modal/addExpense-modal";
import CollapsablePanel from "../ui/CollapsablePanel";
import type { DashboardElement } from "../../types/Dashboard";

const ExpensePanel = ({
  editedProfile,
  setEditedProfile,
}: DashboardElement) => {
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
        editedProfile={editedProfile}
        setEditedProfile={setEditedProfile}
      />
    </>
  );
};

export default ExpensePanel;
