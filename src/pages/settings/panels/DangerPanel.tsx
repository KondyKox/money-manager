import { useState } from "react";
import LoadingDots from "../../../components/ui/LoadingDots";
import { useToast } from "../../../hooks/useToast";
import { exportData } from "../../../services/profiles/exportData";
import { downloadFile } from "../../../utils/downloadFile";
import { deleteAccount } from "../../../services/auth/deleteAccount";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import { useProfile } from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { verifyPassword } from "../../../services/auth/verifyPassword";
import { useAuth } from "../../../hooks/useAuth";

const DangerPanel = () => {
  const [exporting, setExporting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const { clearProfile } = useProfile();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleExport = async () => {
    if (exporting) return;

    setExporting(true);
    try {
      const json = await exportData();
      const date = new Date().toISOString().slice(0, 10);

      // TODO: CAPACITOR
      downloadFile(json, `wydatkonator-export-${date}.json`);
      showToast("Dane zostały wyeksportowane", "success");
    } catch (error) {
      console.error("Error exporting data:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Nie udało się wyeksportować danych.",
        "error",
      );
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async (password: string) => {
    if (deleting || !user?.email) return;

    setDeleting(true);
    try {
      await verifyPassword(user.email, password);
      await deleteAccount();
      clearProfile();

      navigate("/", { replace: true });
      showToast("Pomyślnie usunięto konto", "success");
    } catch (error) {
      console.error("Error deleting account:", error);
      showToast(
        error instanceof Error ? error.message : "Nie udało się usunąć konta",
        "error",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <fieldset className="settings-panel text-red-500 shadow-red-500!">
        <legend>Strefa zagrożenia</legend>
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-2">
          <button
            disabled={exporting}
            className="btn-secondary flex-1"
            onClick={handleExport}
          >
            {exporting ? <LoadingDots /> : "Eksportuj dane"}
          </button>
          <button
            disabled={deleting}
            className="btn-delete flex-1"
            onClick={() => setIsDeleteOpen(true)}
          >
            Usuń konto
          </button>
        </div>
      </fieldset>

      {isDeleteOpen && (
        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
          header="Usuwanie konta"
          confirmationText="Za chwile nieodwracalnie usuniesz swoje konto. Aby potwierdzić, wpisz swoje hasło."
        />
      )}
    </>
  );
};

export default DangerPanel;
