import { useState, type FormEvent } from "react";
import type { ConfirmModalProps } from "../../types/Modal";
import Modal from "./Modal";
import PasswordInput from "../ui/PasswordInput";
import SubmitingText from "../ui/SubmitingText";

const ConfirmModal = ({
  isOpen,
  onClose,
  header,
  confirmationText,
  onConfirm,
}: ConfirmModalProps) => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirming, setConfirming] = useState<boolean>(false);

  const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setConfirming(true);
    try {
      await onConfirm(confirmPassword);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleConfirm}
        className="flex flex-col justify-center items-stretch"
      >
        <h2 className="modal-header">{header}</h2>
        <p className="text-center p-4">{confirmationText}</p>
        <PasswordInput
          id="confirmPassword"
          label="Hasło"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="current-password"
          placeholder="Wpisz (stare) hasło by potwierdzić"
        />
        <button disabled={confirming} type="submit" className="btn-secondary">
          {confirming ? <SubmitingText /> : "Potwierdź"}
        </button>
      </form>
    </Modal>
  );
};

export default ConfirmModal;
