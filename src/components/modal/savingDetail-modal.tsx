import { Frown, Smile } from "lucide-react";
import type { SavingDetailModalProps } from "../../types/Modal";
import Modal from "./Modal";

const SavingDetailModal = ({
  isOpen,
  onClose,
  saving,
  onDelete,
  onEdit,
}: SavingDetailModalProps) => {
  const amount = saving.amount;

  const handleDelete = () => {
    onDelete(saving.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 justify-center items-center w-full py-8 px-4 mt-6 rounded-xl bg-purple-500 overflow-hidden min-h-75">
        <span
          className={`font-mono font-semibold text-3xl md:text-4xl ${amount > 0 ? "text-green-600" : "text-red-500"}`}
        >
          {amount > 0 ? "+" : "-"} {amount > 0 ? amount : -amount}zł
        </span>

        <span className="text-md wrap-break-word">
          {new Date(saving.date).toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span>
          {amount > 0 ? (
            <Smile size={36} className="text-green-300" />
          ) : (
            <Frown size={36} className="text-red-300" />
          )}
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-4">
        <button className="btn-secondary w-full">Edycja</button>
        <button className="btn-primary w-full" onClick={handleDelete}>
          Usuń
        </button>
      </div>
    </Modal>
  );
};

export default SavingDetailModal;
