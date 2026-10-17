import { CircleX, Edit, Frown, Save, Smile, Trash2 } from "lucide-react";
import type { SavingDetailModalProps } from "../../types/Modal";
import Modal from "./Modal";
import { useState } from "react";
import type { Saving } from "../../types/Savings";

const SavingDetailModal = ({
  isOpen,
  onClose,
  saving,
  onDelete,
  onEdit,
}: SavingDetailModalProps) => {
  const [edited, setEdited] = useState<boolean>(false);
  const [date, setDate] = useState<string>(saving.date);
  const [amount, setAmount] = useState<number>(saving.amount);

  const handleDelete = () => {
    onDelete(saving.id);
    onClose();
  };

  const handleEditClick = () => {
    setDate(saving.date);
    setAmount(saving.amount);
    setEdited(true);
  };

  const handleSave = () => {
    const updatedSaving: Saving = {
      ...saving,
      date,
      amount,
    };

    onEdit(updatedSaving);
    setEdited(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 justify-center items-center w-full py-8 px-4 mt-6 rounded-xl bg-purple-500 overflow-hidden min-h-75">
        <div className="flex flex-col justify-center items-center w-full gap-2 input-group">
          {edited ? (
            <input
              type="number"
              step={10}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="font-mono font-semibold text-2xl"
            />
          ) : (
            <p
              className={`font-mono font-semibold text-3xl md:text-4xl ${amount > 0 ? "text-green-600" : "text-red-500"}`}
            >
              {amount > 0 ? "+" : "-"}{" "}
              {amount > 0 ? amount.toFixed(2) : -amount.toFixed(2)}zł
            </p>
          )}

          {edited ? (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <p>
              {new Date(saving.date).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        <span>
          {amount > 0 ? (
            <Smile
              size={36}
              className="text-green-300 hover:scale-150 transition-transform duration-150"
            />
          ) : (
            <Frown
              size={36}
              className="text-red-300 hover:scale-150 transition-transform duration-150"
            />
          )}
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-4">
        {edited ? (
          <button
            className="btn-secondary flex-1 flex justify-center items-center gap-2 w-full"
            onClick={handleSave}
          >
            <Save size={24} /> Zapisz
          </button>
        ) : (
          <button
            className="btn-secondary flex-1 flex justify-center items-center gap-2 w-full"
            onClick={handleEditClick}
          >
            <Edit size={24} /> Edycja
          </button>
        )}

        {edited ? (
          <button
            className="btn-delete flex-1 flex justify-center items-center gap-2 w-full"
            onClick={() => setEdited(false)}
          >
            <CircleX size={24} /> Anuluj
          </button>
        ) : (
          <button
            className="btn-delete flex-1 flex justify-center items-center gap-2 w-full"
            onClick={handleDelete}
          >
            <Trash2 size={24} /> Usuń
          </button>
        )}
      </div>
    </Modal>
  );
};

export default SavingDetailModal;
