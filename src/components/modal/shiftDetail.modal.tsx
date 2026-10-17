import { CircleX, Edit, Save, Trash2 } from "lucide-react";
import type { ShiftDetailProps } from "../../types/Modal";
import type { CompletedShift } from "../../types/Shift";
import Modal from "./Modal";
import { useState } from "react";

const ShiftDetailModal = ({
  shift,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ShiftDetailProps) => {
  const [edited, setEdited] = useState<boolean>(false);
  const [clockIn, setClockIn] = useState<string>(shift.clockIn);
  const [clockOut, setClockOut] = useState<string>(shift.clockOut);
  const [rate, setRate] = useState<number>(shift.rate);

  const handleEditClick = () => {
    setClockIn(shift.clockIn);
    setClockOut(shift.clockOut);
    setRate(shift.rate);
    setEdited(true);
  };

  const handleSave = () => {
    const updatedShift: CompletedShift = {
      ...shift,
      clockIn,
      clockOut,
      rate,
    };

    onEdit(updatedShift);
    setEdited(false);
    onClose();
  };

  const handleDelete = () => {
    onDelete(shift.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="font-bold text-2xl border-b-2 py-2">
          {edited ? "Edycja zmiany" : "Edycja / Usuwanie"}
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <div className="input-group">
            <label htmlFor="shift-clockIn">Start</label>
            <input
              type="datetime-local"
              id="shift-clockIn"
              value={clockIn}
              onChange={(e) => setClockIn(e.target.value)}
              className={!edited ? "opacity-70 cursor-not-allowed" : ""}
              disabled={!edited}
            />
          </div>

          <div className="input-group">
            <label htmlFor="shift-clockOut">Koniec</label>
            <input
              type="datetime-local"
              id="shift-clockOut"
              value={clockOut}
              onChange={(e) => setClockOut(e.target.value)}
              className={!edited ? "opacity-70 cursor-not-allowed" : ""}
              disabled={!edited}
            />
          </div>

          <div className="input-group">
            <label htmlFor="shift-rate">Stawka</label>
            <div>
              <input
                type="number"
                id="shift-rate"
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className={!edited ? "opacity-70 cursor-not-allowed" : ""}
                disabled={!edited}
              />
              <span>zł/h</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 flex-col w-full">
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
      </div>
    </Modal>
  );
};

export default ShiftDetailModal;
