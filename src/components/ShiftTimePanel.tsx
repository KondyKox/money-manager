import { useRef } from "react";
import type { ActiveShift, CompletedShift } from "../types/Shift";
import { toDatetimeLocal } from "../utils/toDatetimeLocal";
import { saveProfile } from "../utils/saveProfile";
import type { ShiftTrackerProps } from "../types/ShiftTracker";
import type { Profile } from "../types/Profile";

const ShiftTimePanel = ({
  editedProfile,
  setEditedProfile,
}: ShiftTrackerProps) => {
  const clockInRef = useRef<HTMLInputElement>(null);
  const clockOutRef = useRef<HTMLInputElement>(null);

  const handleBtnClick = () => {
    !editedProfile.activeShift
      ? handleStartShift()
      : !editedProfile.activeShift.clockOut
        ? handleStopShift()
        : handleSaveShift();
  };

  // start shift and enter to input
  const handleStartShift = () => {
    const newActiveShift: ActiveShift = {
      clockIn: toDatetimeLocal(new Date()),
      rate: editedProfile.hourlyRate,
    };

    setEditedProfile((prev) =>
      prev ? { ...prev, activeShift: newActiveShift } : prev,
    );

    clockInRef.current?.focus();
  };

  // stop shift and enter to input
  const handleStopShift = () => {
    setEditedProfile((prev) =>
      prev && prev.activeShift
        ? {
            ...prev,
            activeShift: {
              ...prev.activeShift,
              clockOut: toDatetimeLocal(new Date()),
            },
          }
        : prev,
    );
    clockOutRef.current?.focus();
  };

  // Handle saving edited profile
  const handleSaveShift = () => {
    if (!editedProfile.activeShift) return;

    const newCompletedShift: CompletedShift = {
      id: crypto.randomUUID(),
      clockIn: editedProfile.activeShift.clockIn,
      clockOut: editedProfile.activeShift.clockOut!,
      rate: editedProfile.activeShift.rate,
    };

    const updatedProfile: Profile = {
      ...editedProfile,
      completedShifts: [...editedProfile.completedShifts, newCompletedShift],
      activeShift: null,
    };

    setEditedProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  return (
    <div className="input-group">
      <label htmlFor="activeShift">Zmiana w pracy</label>
      <div className="flex flex-col gap-4" id="activeShift">
        <div className="flex flex-col gap-2">
          {/* START */}
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
          {/* STOP */}
          {editedProfile.activeShift && (
            <input
              ref={clockOutRef}
              type="datetime-local"
              id="clockOut"
              name="clockOut"
              value={editedProfile.activeShift.clockOut ?? ""}
              onChange={(e) =>
                setEditedProfile((prev) =>
                  prev && prev.activeShift
                    ? {
                        ...prev,
                        activeShift: {
                          ...prev.activeShift,
                          clockOut: e.target.value,
                        },
                      }
                    : prev,
                )
              }
            />
          )}
        </div>
        <button className="btn" onClick={() => handleBtnClick()}>
          {!editedProfile.activeShift
            ? "Start"
            : !editedProfile.activeShift.clockOut
              ? "Stop"
              : "Zapisz"}
        </button>
      </div>
    </div>
  );
};

export default ShiftTimePanel;
