import { Edit, Trash } from "lucide-react";
import type { DetailModalProps } from "../../types/Modal";
import Modal from "./Modal";

const DetailModal = ({
  isOpen,
  onClose,
  element,
  onDelete,
}: DetailModalProps) => {
  const handleDelete = () => {
    onDelete(element.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-xl font-bold mb-4">{element.category}</h2>
        <div className="flex justify-between items-center w-full">
          <p>
            {new Date(element.date).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p
            className={`font-mono font-semibold text-2xl ${element.kind === "income" ? "text-green-500" : "text-red-500"} shrink-0 ml-3`}
          >
            {element.kind === "income" ? "+" : "-"}
            {element.amount.toFixed(2)}zł
          </p>
        </div>
        <div className="w-full min-h-52 h-full overflow-y-auto rounded-xl bg-white/80 text-black p-4 gap-2 flex flex-col">
          <span className="text-xs uppercase text-gray-600">Notatka</span>
          {element.note ? (
            <p className="text-sm md:text-base">{element.note}</p>
          ) : (
            <p className="italic text-sm md:text-base">Brak notatki</p>
          )}
        </div>
        <div className="flex justify-between items-stretch gap-4 w-full flex-col md:flex-row">
          <button
            className="btn-secondary flex-1 flex justify-center items-center gap-2"
            onClick={handleDelete}
          >
            <Edit size={24} /> Edycja
          </button>
          <button
            className="btn-delete flex-1 flex justify-center items-center gap-2"
            onClick={handleDelete}
          >
            <Trash size={24} /> Usuń
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
