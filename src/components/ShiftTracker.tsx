import { useState } from "react";
import { saveProfile } from "../utils/saveProfile";
import ShiftTimePanel from "./ShiftTimePanel";
import { ChevronDown } from "lucide-react";
import type { ShiftTrackerProps } from "../types/Shift";

const ShiftTracker = ({
  editedProfile,
  setEditedProfile,
}: ShiftTrackerProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="bg-green-400 rounded-lg px-4 py-6 shadow-sm shadow-green-400">
      <h3
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-center gap-2 text-center text-white font-bold mb-4 text-xl cursor-pointer hover:bg-green-500 transition-colors duration-150"
      >
        Monitor czasu pracy
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
        />
      </h3>
      {!isCollapsed ? (
        // {/* Stawka godzinowa */}
        <>
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
                    prev
                      ? { ...prev, hourlyRate: Number(e.target.value) }
                      : prev,
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
        </>
      ) : null}
    </div>
  );
};

export default ShiftTracker;
