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
      className="grid grid-cols-5 gap-2 text-sm py-1 items-center"
    >
      <span>
        {clockInDate.toLocaleDateString("pl-PL", {
          day: "numeric",
          month: "short",
        })}
      </span>
      <span className="font-mono">
        {clockInDate.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <span className="font-mono">
        {clockOutDate.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <span className="font-mono">{hours.toFixed(2)}h</span>
      <span className="font-mono font-semibold text-green-800">
        +{pay.toFixed(2)}zł
      </span>
    </div>
  );
};

export default ShiftElement;
