import { CircleX, Edit, Frown, Save, Smile, Trash2 } from "lucide-react";
import type { SavingDetailModalProps } from "../../../types/Modal";
import Modal from "../../../components/modal/Modal";
import { useState } from "react";
import type { Saving } from "../../../types/Savings";
import { useToast } from "../../../hooks/useToast";
import LoadingDots from "../../../components/ui/LoadingDots";

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
  // which request is in flight (null = idle)
  const [pending, setPending] = useState<"save" | "delete" | null>(null);

  const { showToast } = useToast();

  const handleDelete = async () => {
    if (pending) return;

    setPending("delete");
    try {
      await onDelete(saving.id);
      onClose();
    } catch (error) {
      console.error("Error deleting saving:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Nie udało się usunąć oszczędności.",
        "error",
      );
    } finally {
      setPending(null);
    }
  };

  const handleEditClick = () => {
    setDate(saving.date);
    setAmount(saving.amount);
    setEdited(true);
  };

  const handleSave = async () => {
    if (pending) return;

    const updatedSaving: Saving = {
      ...saving,
      date,
      amount,
    };

    setPending("save");
    try {
      await onEdit(updatedSaving);
      setEdited(false);
      onClose();
    } catch (error) {
      console.error("Error saving saving:", error);
      showToast(
        error instanceof Error ? error.message : "Nie udało się zapisać zmian.",
        "error",
      );
    } finally {
      setPending(null);
    }
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
            disabled={pending !== null}
          >
            {pending === "save" ? (
              <LoadingDots />
            ) : (
              <>
                <Save size={24} /> Zapisz
              </>
            )}
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
            disabled={pending !== null}
          >
            <CircleX size={24} /> Anuluj
          </button>
        ) : (
          <button
            className="btn-delete flex-1 flex justify-center items-center gap-2 w-full"
            onClick={handleDelete}
            disabled={pending !== null}
          >
            {pending === "delete" ? (
              <LoadingDots />
            ) : (
              <>
                <Trash2 size={24} /> Usuń
              </>
            )}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default SavingDetailModal;
