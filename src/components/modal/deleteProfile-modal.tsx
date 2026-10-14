import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import { cleanName } from "../../utils/cleanName";

interface DeleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  profileName: string;
  deleting: boolean;
}

const DeleteProfileModal = ({
  isOpen,
  onClose,
  onConfirm,
  profileName,
  deleting,
}: DeleteProfileModalProps) => {
  const [typed, setTyped] = useState<string>("");
  const matches = cleanName(typed) === profileName;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!matches || deleting) return;
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-stretch gap-4"
      >
        <h3 className="font-bold text-xl lg:text-2xl text-center pb-2 border-b-2">
          Usuń profil
        </h3>
        <p className="text-base md:text-lg text-center">
          Ta operacja usunie profil <b>{profileName}</b> razem ze wszystkimi
          zmianami, wydatkami, przychodami i oszczędnościami. <br />
          <strong>Nie można tego cofnąć</strong>.
        </p>
        <div className="input-group">
          <label htmlFor="confirmName">
            Wpisz nazwę profilu, aby potwierdzić
          </label>
          <input
            id="confirmName"
            name="confirmName"
            type="text"
            autoFocus
            autoComplete="off"
            placeholder={profileName}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          disabled={!matches || deleting}
        >
          {deleting ? "Usuwanie..." : "Usuń profil"}
        </button>
      </form>
    </Modal>
  );
};

export default DeleteProfileModal;
