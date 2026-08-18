import { saveProfile } from "../../utils/saveProfile";
import ShiftTimePanel from "./ShiftTimePanel";
import CollapsablePanel from "../ui/CollapsablePanel";
import type { DashboardElement } from "../../types/Dashboard";
import { useState } from "react";
import ShiftElement from "../ui/ShiftElement";

const ShiftTracker = ({
  editedProfile,
  setEditedProfile,
}: DashboardElement) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7),
  );

  const filteredShifts = editedProfile.completedShifts.filter((shift) =>
    shift.clockIn.startsWith(selectedMonth),
  );

  const availableMonths = Array.from(
    new Set(
      editedProfile.completedShifts.map((shift) => shift.clockIn.slice(0, 7)),
    ),
  )
    .sort()
    .reverse();

  const totalEarned = filteredShifts.reduce((sum, shift) => {
    const hours =
      (new Date(shift.clockOut).getTime() - new Date(shift.clockIn).getTime()) /
      (1000 * 60 * 60);
    return sum + hours * shift.rate;
  }, 0);

  return (
    <CollapsablePanel
      header="Monitor czasu pracy"
      colorClass="bg-green-400 shadow-green-400 text-white/90"
    >
      <div className="input-group">
        <label htmlFor="hourlyRate">Stawka Godzinowa</label>
        <div>
          <input
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            step="0.5"
            placeholder="np. 31,50"
            value={editedProfile.hourlyRate}
            onChange={(e) =>
              setEditedProfile((prev) =>
                prev ? { ...prev, hourlyRate: Number(e.target.value) } : prev,
              )
            }
            onBlur={() => saveProfile(editedProfile)}
          />
          <span>zł/h</span>
        </div>
      </div>

      {/* Zmiana w pracy */}
      <ShiftTimePanel
        editedProfile={editedProfile}
        setEditedProfile={setEditedProfile}
      />

      {/* podsumowanie */}
      <div className="flex flex-col justify-center items-stretch gap-2">
        <div className="bg-green-200 text-black/80 rounded-lg flex flex-col gap-4 md:flex-row justify-between items-center p-2">
          <select
            name="monthlySummary"
            id="monthlySummary"
            className="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(month + "-01").toLocaleDateString("pl-PL", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>
          <span className="text-green-500 font-bold font-mono text-2xl">
            +{totalEarned}zł
          </span>
        </div>

        <div className="border-2 rounded-lg px-4 py-2 overflow-x-auto">
          {/* Header row */}
          <div className="grid grid-cols-5 gap-2 font-bold text-sm border-b-2 pb-2 mb-2">
            <span>Dzień</span>
            <span>Start</span>
            <span>Koniec</span>
            <span>Godziny</span>
            <span>Zarobione</span>
          </div>

          {/* Data rows */}
          {filteredShifts.length === 0 ? (
            <span className="text-center block">Brak zmian</span>
          ) : (
            filteredShifts.map((shift) => <ShiftElement shift={shift} />)
          )}
        </div>
      </div>
    </CollapsablePanel>
  );
};

export default ShiftTracker;
