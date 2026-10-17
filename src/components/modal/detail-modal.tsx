import { CircleX, Edit, Save, Trash2 } from "lucide-react";
import type { DetailModalProps } from "../../types/Modal";
import Modal from "./Modal";
import type { Income } from "../../types/Income";
import type { Expense } from "../../types/Expense";
import { useState } from "react";
import { EXPENSE_CATEGORIES } from "../../constants/expenseCategories";
import { INCOME_CATEGORIES } from "../../constants/incomeCategories";

const DetailModal = <T extends Income | Expense>({
  isOpen,
  onClose,
  element,
  onDelete,
  onEdit,
}: DetailModalProps<T>) => {
  const [edited, setEdited] = useState<boolean>(false);
  const [date, setDate] = useState<string>(element.date);
  const [amount, setAmount] = useState<number>(element.amount);
  const [category, setCategory] = useState<string>(element.category);
  const [note, setNote] = useState<string>(element.note ?? "");

  const categories =
    element.kind === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleEditClick = () => {
    setDate(element.date);
    setAmount(element.amount);
    setCategory(element.category);
    setNote(element.note ?? "");
    setEdited(true);
  };

  const handleSave = () => {
    const updatedElement = {
      ...element,
      date,
      amount,
      category,
      note: note || undefined,
    } as T;

    onEdit(updatedElement);
    setEdited(false);
    onClose();
  };

  const handleDelete = () => {
    onDelete(element.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-xl font-bold mb-4">{element.category}</h2>

        <div className="flex justify-between items-center w-full gap-2 input-group">
          {edited ? (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <p>
              {new Date(element.date).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          {edited ? (
            <input
              type="number"
              step={10}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="font-mono font-semibold text-2xl text-right"
            />
          ) : (
            <p
              className={`font-mono font-semibold text-2xl shrink-0 ml-3 ${
                element.kind === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {element.kind === "income" ? "+" : "-"}
              {element.amount.toFixed(2)}zł
            </p>
          )}
        </div>

        {edited && (
          <div className="input-group w-full">
            <label>Kategoria</label>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`btn-primary ${category === cat ? "bg-blue-400 pointer-events-none" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-full min-h-52 h-full overflow-y-auto rounded-xl bg-white/80 text-black p-4 gap-2 flex flex-col">
          <span className="text-xs uppercase text-gray-600">Notatka</span>
          {edited ? (
            <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          ) : element.note ? (
            <p className="text-sm md:text-base">{element.note}</p>
          ) : (
            <p className="italic text-sm md:text-base">Brak notatki</p>
          )}
        </div>

        <div className="flex justify-between items-stretch gap-4 w-full flex-col md:flex-row">
          <button
            className="btn-secondary flex-1 flex justify-center items-center gap-2"
            onClick={edited ? handleSave : handleEditClick}
          >
            {edited ? (
              <>
                <Save size={24} /> Zapisz
              </>
            ) : (
              <>
                <Edit size={24} /> Edycja
              </>
            )}
          </button>
          <button
            className="btn-delete flex-1 flex justify-center items-center gap-2"
            onClick={edited ? () => setEdited(false) : handleDelete}
          >
            {edited ? (
              <>
                <CircleX size={24} /> Anuluj
              </>
            ) : (
              <>
                <Trash2 size={24} /> Usuń
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
