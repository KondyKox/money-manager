import type { CompletedShift, ShiftElementProps } from "../../types/Shift";
import { useState } from "react";
import ShiftDetailModal from "../modal/shiftDetail.modal";

const ShiftElement = ({ shift, onDelete, onEdit }: ShiftElementProps) => {
  const clockInDate = new Date(shift.clockIn);
  const clockOutDate = new Date(shift.clockOut);
  const hours =
    (clockOutDate.getTime() - clockInDate.getTime()) / (1000 * 60 * 60);
  const pay = hours * shift.rate;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete(shift.id);
    setIsModalOpen(false);
  };

  const handleEdit = (updatedShift: CompletedShift) => {
    onEdit(updatedShift);
    console.log(updatedShift);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={shift.id}
        className="flex flex-col md:grid md:grid-cols-5 md:gap-2 md:items-center border-b md:border-none py-2 text-sm hover:bg-gray-400 transition-colors duration-150 px-2 rounded-lg cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Row 1 on mobile: date + pay */}
        <div className="flex justify-between md:contents">
          <span className="font-semibold md:order-1">
            {clockInDate.toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "short",
            })}
          </span>
          <span className="font-mono font-semibold text-green-800 md:order-5">
            +{pay.toFixed(2)}zł
          </span>
        </div>

        {/* Row 2 on mobile: time range + hours */}
        <div className="flex justify-between text-white/70 md:contents">
          <span className="font-mono md:order-2">
            {clockInDate.toLocaleTimeString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="font-mono md:hidden">–</span>
          <span className="font-mono md:order-3">
            {clockOutDate.toLocaleTimeString("pl-PL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="font-mono md:order-4">{hours.toFixed(2)}h</span>
        </div>
      </div>

      {isModalOpen && (
        <ShiftDetailModal
          shift={shift}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ShiftElement;
