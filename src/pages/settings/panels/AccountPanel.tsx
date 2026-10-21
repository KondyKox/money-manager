import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useToast } from "../../../hooks/useToast";
import { verifyPassword } from "../../../services/auth/verifyPassword";
import {
  updateUserEmail,
  updateUserPassword,
} from "../../../services/auth/updateUser";
import PasswordInput from "../../../components/ui/PasswordInput";
import { MIN_PASSWORD_LENGHT } from "../../../constants/auth";
import { sendPasswordReset } from "../../../services/auth/sendPasswordReset";
import LoadingDots from "../../../components/ui/LoadingDots";

const AccountPanel = () => {
  const [emailEdited, setEmailEdited] = useState<boolean>(false);
  const [passwordEdited, setPasswordEdited] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [repPassword, setRepPassword] = useState<string>("");
  const [sendingReset, setSendingReset] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<
    "email" | "password" | null
  >(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (user && user.email) setNewEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (emailEdited) {
      emailInputRef.current?.focus();
      emailInputRef.current?.select();
    }
  }, [emailEdited]);

  const handleChangeEmailClick = () => {
    if (!emailEdited) {
      setEmailEdited(true);
      return;
    }
    handleCheckValidity();
  };

  const handleChangePasswordClick = () => {
    if (!passwordEdited) {
      setPasswordEdited(true);
      return;
    }

    if (newPassword.length < MIN_PASSWORD_LENGHT) {
      showToast("Hasło za krótkie", "error");
      return;
    }

    if (newPassword !== repPassword) {
      showToast("Hasła się nie zgadzają", "error");
      return;
    }

    setConfirmAction("password");
  };

  const handleCheckValidity = () => {
    if (!user) return;

    if (!emailInputRef.current?.checkValidity()) {
      showToast("Nieprawidłowy adres email.", "error");
      return;
    }

    if (newEmail.trim() === user.email) {
      setEmailEdited(false);
      return;
    }

    setConfirmAction("email");
  };

  const handleForgotPassword = async () => {
    if (!user?.email || sendingReset) return;

    setSendingReset(true);
    try {
      await sendPasswordReset(user.email);
      showToast(`Wysłaliśmy link do zmiany hasła na ${user.email}.`, "success");
    } catch (error) {
      console.error("Error sending reset email:", error);
      showToast(
        error instanceof Error ? error.message : "Nie udało się wysłać linku.",
        "error",
      );
    } finally {
      setSendingReset(false);
    }
  };

  const handleEmailConfirm = async (confirmPassword: string) => {
    if (!user || !user.email) return;

    try {
      await verifyPassword(user.email, confirmPassword);
      await updateUserEmail(newEmail.trim());

      showToast(
        "Sprawdź skrzynkę, żeby potwierdzić zmianę adresu email.",
        "success",
      );
      setConfirmAction(null);
      setEmailEdited(false);
      setNewEmail(user.email);
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Coś poszło nie tak.",
        "error",
      );
      console.error("Error changing email:", error);
    }
  };

  const handlePasswordConfirm = async (confirmPassword: string) => {
    if (!user || !user.email) return;

    try {
      await verifyPassword(user.email, confirmPassword);
      await updateUserPassword(newPassword);

      showToast("Udało się zmienić hasło", "success");

      setConfirmAction(null);
      setPasswordEdited(false);
      setNewPassword("");
      setRepPassword("");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Coś poszło nie tak.",
        "error",
      );
      console.error("Error changing password:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <fieldset className="settings-panel">
        <legend>Konto</legend>
        <div className="flex flex-col gap-4">
          <div className="input-group flex flex-col items-stretch">
            <label htmlFor="userEmail">Adres email</label>
            <input
              ref={emailInputRef}
              id="userEmail"
              name="userEmail"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={!emailEdited}
              placeholder="Wpisz tutaj adres email"
            />
            <button
              className="btn-primary mt-4"
              onClick={handleChangeEmailClick}
            >
              {emailEdited ? "Zapisz email" : "Zmień adres email"}
            </button>
          </div>

          <div className="input-group flex flex-col items-stretch">
            <label htmlFor="userPassword">Hasło</label>
            {passwordEdited && (
              <div className="flex flex-col justify-center items-center">
                <PasswordInput
                  id="userPassword"
                  label="Nowe hasło"
                  value={newPassword}
                  onChange={setNewPassword}
                  autoComplete="new-password"
                  placeholder="Wpisz nowe hasło"
                />
                <PasswordInput
                  id="userPassword"
                  label="Powtórz hasło"
                  value={repPassword}
                  onChange={setRepPassword}
                  autoComplete="new-password"
                  placeholder="Powtórz nowe hasło"
                />
              </div>
            )}
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-2">
              <button
                className="btn-secondary flex-1"
                onClick={handleChangePasswordClick}
              >
                {passwordEdited ? "Zapisz hasło" : "Zmień hasło"}
              </button>
              <button
                className="btn-primary flex-1"
                onClick={handleForgotPassword}
                disabled={sendingReset}
              >
                {sendingReset ? <LoadingDots /> : "Zapomniałem hasła"}
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      {confirmAction && (
        <ConfirmModal
          isOpen={confirmAction !== null}
          onClose={() => setConfirmAction(null)}
          header="Zmiana adresu Email"
          confirmationText={
            confirmAction === "email"
              ? "Potwierdź wpisując swoje hasło."
              : "Potwierdź wpisując swoje stare hasło."
          }
          onConfirm={
            confirmAction === "email"
              ? handleEmailConfirm
              : handlePasswordConfirm
          }
        />
      )}
    </>
  );
};

export default AccountPanel;
