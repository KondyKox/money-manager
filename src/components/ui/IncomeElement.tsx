import { useState } from "react";
import type { Income } from "../../types/Income";
import DetailModal from "../modal/detail-modal";

const IncomeElement = ({ income }: { income: Income }) => {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsDetailOpen(true)}
        className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 transition-colors"
      >
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">
            {income.category}
          </span>
          <span className="text-xs text-gray-800">
            {new Date(income.date).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
        <span className="font-mono font-semibold text-green-600 shrink-0 ml-3">
          +{income.amount.toFixed(2)}zł
        </span>
      </button>

      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        element={income}
      />
    </>
  );
};

export default IncomeElement;
