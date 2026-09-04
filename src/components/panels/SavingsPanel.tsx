import { PiggyBank } from "lucide-react";
import CollapsablePanel from "../ui/CollapsablePanel";
import type { DashboardElement } from "../../types/Dashboard";
import SavingElement from "../ui/SavingElement";
import { useState } from "react";
import AddSavingModal from "../modal/addSaving-modal";
import { deleteSaving } from "../../utils/updateProfile";
import { useToast } from "../../hooks/useToast";

const SavingsPanel = ({
  editedProfile,
  setEditedProfile,
}: DashboardElement) => {
  const [modalMode, setMode] = useState<"deposit" | "withdraw" | null>(null);

  const { showToast } = useToast();

  const handleDeleteSaving = async (savingId: string) => {
    setEditedProfile(
      (prev) =>
        prev && {
          ...prev,
          savings: prev.savings.filter((s) => s.id !== savingId),
        },
    );

    await deleteSaving(savingId);
    showToast("Usunięto oszczędności.", "success");
  };

  const handleEditSaving = () => {
    console.log("edit");
  };

  const totalSavings = editedProfile.savings.reduce(
    (sum, saving) => sum + saving.amount,
    0,
  );

  const sortedSavings = editedProfile.savings.sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <>
      <CollapsablePanel
        header="Oszczędności"
        icon={<PiggyBank />}
        colorClass="text-gray-700 bg-cyan-300"
      >
        <div className="flex flex-col-reverse justify-center items-center border-b-2 pb-2 shadow-xl">
          {/* <h3 className="italic text-sm">Twoje oszczędności</h3> */}
          <span className="text-4xl font-mono font-extrabold text-green-700">
            {totalSavings}zł
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-4">
          <button
            className="btn-secondary w-full flex-1"
            onClick={() => setMode("deposit")}
          >
            Wpłać
          </button>
          <button
            className="btn-primary w-full flex-1 text-gray-700!"
            onClick={() => setMode("withdraw")}
          >
            Wypłać
          </button>
        </div>

        <div className="py-4 flex flex-col justify-center items-center gap-2">
          {!sortedSavings || sortedSavings.length === 0 ? (
            <span className="text-center">Brak oszczędności</span>
          ) : (
            sortedSavings.map((saving) => (
              <div key={saving.id} className="w-full">
                <SavingElement
                  saving={saving}
                  onDelete={() => handleDeleteSaving(saving.id)}
                  onEdit={handleEditSaving}
                />
              </div>
            ))
          )}
        </div>
      </CollapsablePanel>

      {modalMode && (
        <AddSavingModal
          isOpen={!!modalMode}
          onClose={() => setMode(null)}
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
          mode={modalMode}
          totalSavings={totalSavings}
        />
      )}
    </>
  );
};

export default SavingsPanel;
