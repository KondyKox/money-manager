import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useToast } from "../../../hooks/useToast";
import { verifyPassword } from "../../../services/auth/verifyPassword";
import { updateUserEmail } from "../../../services/auth/updateUser";

const AccountPanel = () => {
  const [edited, setEdited] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (user && user.email) setNewEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (edited) {
      emailInputRef.current?.focus();
      emailInputRef.current?.select();
    }
  }, [edited]);

  const handleChangeEmailClick = () => {
    if (!edited) {
      setEdited(true);
      return;
    }
    handleCheckValidity();
  };

  const handleCheckValidity = () => {
    if (!user) return;

    if (!emailInputRef.current?.checkValidity()) {
      showToast("Nieprawidłowy adres email.", "error");
      return;
    }

    if (newEmail.trim() === user.email) {
      setEdited(false);
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirm = async (confirmPassword: string) => {
    if (!user || !user.email) return;

    try {
      await verifyPassword(user.email, confirmPassword);
      await updateUserEmail(newEmail.trim());

      showToast(
        "Sprawdź skrzynkę, żeby potwierdzić zmianę adresu email.",
        "success",
      );
      setIsConfirmModalOpen(false);
      setEdited(false);
      setNewEmail(user.email);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Coś poszło nie tak.",
        "error",
      );
      console.error("Error changing email:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <fieldset className="settings-panel">
        <legend>Konto</legend>
        <div>
          <div className="input-group">
            <label htmlFor="userEmail">Adres email</label>
            <input
              ref={emailInputRef}
              id="userEmail"
              name="userEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={!edited}
            />
            <button
              className="btn-primary mt-2 w-2/3 md:w-1/2"
              onClick={handleChangeEmailClick}
            >
              {edited ? "Zapisz email" : "Zmień adres email"}
            </button>
          </div>
          <div className="input-group">
            <label htmlFor="userPassword">Hasło</label>
            <input id="userPassword" name="userPassword" type="password" />
            <button className="btn-primary mt-2 w-2/3 md:w-1/2">
              Zmień hasło
            </button>
          </div>
        </div>
      </fieldset>

      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          header="Zmiana adresu Email"
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default AccountPanel;
