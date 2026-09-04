import { useState } from "react";
import type { EditModalProps } from "../../types/Modal";
import Modal from "./Modal";
import type { Saving } from "../../types/Savings";
import { useToast } from "../../hooks/useToast";
import type { Profile } from "../../types/Profile";

interface AddSavingModalProps extends EditModalProps {
  mode: "deposit" | "withdraw";
}

const AddSavingModal = ({
  isOpen,
  onClose,
  editedProfile,
  setEditedProfile,
  mode,
}: AddSavingModalProps) => {
  const [newSaving, setNewSaving] = useState<Partial<Saving>>({
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState<{
    amount?: string;
    date?: string;
  }>({});

  const { showToast } = useToast();

  const handleAddSaving = async () => {
    const newErrors: typeof errors = {};
    if (!newSaving.date) newErrors.date = "Data jest wymagana";
    if (!newSaving.amount) newErrors.amount = "Kwota jest wymagana";

    if (Object.keys(newErrors).length > 0) {
      showToast("Kwota i Data nie mogą być puste!", "error");
      console.warn("Amount & Date cannot be empty!");
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const savingToAdd: Saving = {
      id: crypto.randomUUID(),
      amount: newSaving.amount!,
      date: newSaving.date!,
    };

    const updatedProfile: Profile = {
      ...editedProfile,
      savings: [...editedProfile.savings, savingToAdd],
    };

    setEditedProfile(updatedProfile);

    setNewSaving({ date: new Date().toISOString().split("T")[0] });

    showToast(
      `${mode === "deposit" ? "Dokonano wpłaty." : "Wypłacono pieniądze."}`,
      "success",
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center border-b-2 py-2">
        <h2 className="text-2xl font-bold">
          {mode === "deposit" ? "Wpłać środki" : "Wypłać środki"}
        </h2>
      </div>
      <div className="mt-4">
        <div className="input-group">
          <label htmlFor="saving-date">Data</label>
          <div>
            <input
              required
              type="date"
              id="saving-date"
              name="saving-date"
              value={newSaving.date}
              onChange={(e) =>
                setNewSaving((prev) =>
                  prev ? { ...prev, date: e.target.value } : prev,
                )
              }
            />
          </div>
          {errors.date && <p className="error-message">{errors.date}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="saving-amount">Kwota</label>
          <div className="relative">
            <span
              className={`absolute left-3 top-1/2 -translate-y-1/2 font-bold pointer-events-none ${
                mode === "deposit" ? "text-green-500!" : "text-red-500!"
              }`}
            >
              {mode === "deposit" ? "+" : "-"}
            </span>
            <input
              required
              type="number"
              id="saving-amount"
              name="saving-amount"
              className="pl-7!"
              value={newSaving.amount ?? ""}
              onChange={(e) =>
                setNewSaving((prev) => ({
                  ...prev,
                  amount:
                    e.target.value === "" ? undefined : Number(e.target.value),
                }))
              }
            />
          </div>
          {errors.amount && <p className="error-message">{errors.amount}</p>}
        </div>

        <button className="btn-primary w-full" onClick={handleAddSaving}>
          Dodaj
        </button>
      </div>
    </Modal>
  );
};

export default AddSavingModal;
