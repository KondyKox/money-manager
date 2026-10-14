import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import { useToast } from "../../hooks/useToast";
import { createProfile } from "../../utils/createProfile";
import type { Profile } from "../../types/Profile";

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newProfile: Profile) => void;
}

const DEFAULT_HOURLY_RATE = 31.5;

const CreateProfileModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProfileModalProps) => {
  const [profileName, setProfileName] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleCreateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanName = profileName.trim().replace(/\s+/g, " ");

    if (!cleanName) {
      showToast("Nazwa profilu nie może być pusta.", "error");
      return;
    }

    const parsed = Number(hourlyRate);
    if (!Number.isFinite(parsed) || parsed < 0) {
      showToast("Nieprawidłowa stawka.", "error");
      return;
    }

    const finalRate = parsed === 0 ? DEFAULT_HOURLY_RATE : parsed;

    setSubmitting(true);
    try {
      const newProfile = await createProfile(cleanName, finalRate);
      showToast(`Utworzono profil ${cleanName}`, "success");
      onCreate(newProfile);
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Nie udało się utworzyć profilu.",
        "error",
      );
      console.error("Error creating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleCreateProfile}
        noValidate
        className="flex flex-col justify-center items-stretch gap-4"
      >
        <h3 className="font-bold text-xl lg:text-2xl text-center pb-2 border-b-2">
          Utwórz nowy profil
        </h3>
        <div className="my-8 flex flex-col justify-center items-center gap-2">
          <div className="input-group">
            <label htmlFor="profileName">Nazwa</label>
            <input
              id="profileName"
              name="profileName"
              type="text"
              maxLength={30}
              required
              placeholder="Do kogo należy ten profil..."
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="hourlyRate">
              Stawka godzinowa{" "}
              <small className="normal-case tracking-normal font-normal text-white/70">
                (opcjonalnie)
              </small>
            </label>
            <input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              placeholder={`${DEFAULT_HOURLY_RATE}zł`}
              value={hourlyRate}
              min={0}
              step={0.01}
              onChange={(e) => {
                setHourlyRate(e.target.value);
              }}
            />
          </div>
        </div>

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting
            ? Array.from("...").map((char, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  className="inline-block animate-letter-bounce motion-reduce:animate-none font-bold font-mono"
                >
                  {char}
                </span>
              ))
            : "Dodaj profil"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateProfileModal;
