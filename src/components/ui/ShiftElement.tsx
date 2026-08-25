import type { CompletedShift } from "../../types/Shift";

const ShiftElement = ({ shift }: { shift: CompletedShift }) => {
  const clockInDate = new Date(shift.clockIn);
  const clockOutDate = new Date(shift.clockOut);
  const hours =
    (clockOutDate.getTime() - clockInDate.getTime()) / (1000 * 60 * 60);
  const pay = hours * shift.rate;

  return (
    <div
      key={shift.id}
      className="flex flex-col md:grid md:grid-cols-5 md:gap-2 md:items-center border-b md:border-none py-2 text-sm"
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
  );
};

export default ShiftElement;
