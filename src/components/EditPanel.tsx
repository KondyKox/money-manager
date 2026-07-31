import { useRef, type Dispatch, type SetStateAction } from "react";
import type { Profile } from "../types/Profile";
import { saveProfile } from "../utils/saveProfile";
import type { ActiveShift } from "../types/Shift";

interface EditPanelProps {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}

const EditPanel = ({ editedProfile, setEditedProfile }: EditPanelProps) => {
  const clockInRef = useRef<HTMLInputElement>(null);

  const handleStartShift = () => {
    const newActiveShift: ActiveShift = {
      clockIn: new Date().toISOString(),
      rate: editedProfile.hourlyRate,
    };

    setEditedProfile((prev) =>
      prev ? { ...prev, activeShift: newActiveShift } : prev,
    );

    clockInRef.current?.focus();
  };

  return (
    <div className="bg-green-400 rounded-lg px-4 py-6 shadow-sm shadow-green-400">
      <h3 className="text-center text-white font-bold mb-4 text-xl">
        Panel edycji
      </h3>

      {/* Stawka godzinowa */}
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
      <div className="input-group">
        <label htmlFor="activeShift">Zmiana w pracy</label>
        <div className="flex flex-col gap-4" id="activeShift">
          <div className="flex flex-col gap-2">
            <input
              ref={clockInRef}
              type="datetime-local"
              id="clockIn"
              name="clockIn"
              value={editedProfile.activeShift?.clockIn ?? ""}
              onChange={(e) =>
                setEditedProfile((prev) =>
                  prev && prev.activeShift
                    ? {
                        ...prev,
                        activeShift: {
                          ...prev.activeShift,
                          clockIn: e.target.value,
                        },
                      }
                    : prev,
                )
              }
            />
            {editedProfile.activeShift && (
              <input type="datetime-local" id="clockOut" name="clockOut" />
            )}
          </div>
          <button className="btn" onClick={() => handleStartShift()}>
            {!editedProfile.activeShift ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
