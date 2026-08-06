import { saveProfile } from "../../utils/saveProfile";
import ShiftTimePanel from "./ShiftTimePanel";
import CollapsablePanel from "../ui/CollapsablePanel";
import type { DashboardElement } from "../../types/Dashboard";

const ShiftTracker = ({
  editedProfile,
  setEditedProfile,
}: DashboardElement) => {
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
    </CollapsablePanel>
  );
};

export default ShiftTracker;
