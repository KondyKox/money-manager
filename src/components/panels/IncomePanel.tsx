import { useState } from "react";
import type { DashboardElement } from "../../types/Dashboard";
import CollapsablePanel from "../ui/CollapsablePanel";
import AddIncomeModal from "../modal/addIncome-modal";

const IncomePanel = ({ editedProfile, setEditedProfile }: DashboardElement) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <CollapsablePanel
        header="Przychody"
        colorClass="border-orange-400 text-white bg-orange-400"
      >
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-secondary"
          >
            dodaj przychód
          </button>
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
