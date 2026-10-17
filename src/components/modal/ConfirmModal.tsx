import { useState, type FormEvent } from "react";
import type { ConfirmModalProps } from "../../types/Modal";
import Modal from "./Modal";

const ConfirmModal = ({
  isOpen,
  onClose,
  header,
  onConfirm,
}: ConfirmModalProps) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm(confirmPassword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleConfirm}
        className="flex flex-col justify-center items-stretch"
      >
        <h2 className="modal-header">{header}</h2>
        <p className="text-center p-4">
          Potwierdź wpisując swoje <b>hasło</b>.
        </p>
        <div className="input-group">
          <label htmlFor="confirmPassword">Hasło</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Wpisz hasło by potwierdzić"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-secondary">
          Potwierdź
        </button>
      </form>
    </Modal>
  );
};

export default ConfirmModal;
