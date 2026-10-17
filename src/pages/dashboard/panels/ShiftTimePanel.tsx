import { useRef } from "react";
import type { ActiveShift, CompletedShift } from "../../../types/Shift";
import { toDatetimeLocal } from "../../../utils/toDatetimeLocal";
import { Pause, Play } from "lucide-react";
import type { DashboardElement } from "../../../types/Dashboard";
import { useToast } from "../../../hooks/useToast";
import { addActiveShift } from "../../../services/profiles/saveProfile";
import { updateShift } from "../../../services/profiles/updateProfile";

const ShiftTimePanel = ({
  editedProfile,
  setEditedProfile,
}: DashboardElement) => {
  const clockInRef = useRef<HTMLInputElement>(null);
  const clockOutRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();

  const handleBtnClick = () => {
    !editedProfile.activeShift
      ? handleStartShift()
      : !editedProfile.activeShift.clockOut
        ? handleStopShift()
        : handleSaveShift();
  };

  // start shift and enter to input
  const handleStartShift = async () => {
    const newActiveShift: ActiveShift = {
      id: crypto.randomUUID(),
      clockIn: toDatetimeLocal(new Date()),
      rate: editedProfile.hourlyRate,
    };

    try {
      await addActiveShift(editedProfile.id, newActiveShift);
      setEditedProfile((prev) =>
        prev ? { ...prev, activeShift: newActiveShift } : prev,
      );

      clockInRef.current?.focus();
      showToast("Rozpoczęto zmianę.", "success");
    } catch (error) {
      console.error("Error starting shift:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Nie udało się rozpocząć zmiany.",
        "error",
      );
    }
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
    showToast("Zakończono zmianę.", "success");
  };

  // Handle saving edited profile
  const handleSaveShift = async () => {
    if (!editedProfile.activeShift) return;

    const newCompletedShift: CompletedShift = {
      id: editedProfile.activeShift.id,
      clockIn: editedProfile.activeShift.clockIn,
      clockOut: editedProfile.activeShift.clockOut!,
      rate: editedProfile.activeShift.rate,
    };

    try {
      await updateShift(newCompletedShift);
      setEditedProfile((prev) =>
        prev
          ? {
              ...prev,
              completedShifts: [...prev.completedShifts, newCompletedShift],
              activeShift: null,
            }
          : prev,
      );
      showToast("Zapisano zmianę.", "success");
    } catch (error) {
      console.error("Error saving shift:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Nie udało się zapisać zmiany.",
        "error",
      );
    }
  };

  return (
    <div className="input-group border-b-2 pb-4">
      <label htmlFor="activeShift">Czas pracy</label>
      <div className="flex flex-col gap-4" id="activeShift">
        <div className="flex flex-col gap-2">
          {/* START */}
          <div className="group">
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
            <span>
              <Play
                size={20}
                className="transition-colors duration-200 group-hover:text-green-500"
              />
            </span>
          </div>
          {/* STOP */}
          {editedProfile.activeShift && (
            <div className="group">
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
              <span>
                <Pause
                  size={20}
                  className="transition-colors duration-200 group-hover:text-green-500"
                />
              </span>
            </div>
          )}
        </div>
        <button className="btn-primary" onClick={() => handleBtnClick()}>
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
