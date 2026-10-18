import { useState } from "react";
import LoadingDots from "../../../components/ui/LoadingDots";
import { useToast } from "../../../hooks/useToast";
import { exportData } from "../../../services/profiles/exportData";
import { downloadFile } from "../../../utils/downloadFile";

const DangerPanel = () => {
  const [exporting, setExporting] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { showToast } = useToast();

  const handleExport = async () => {
    if (exporting) return;

    setExporting(true);
    try {
      const json = await exportData();
      const date = new Date().toISOString().slice(0, 10);

      // TODO: CAPACITOR
      showToast("Dane zostały wyeksportowane", "success");
      downloadFile(json, `wydatkonator-export-${date}.json`);
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

  return (
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
        <button disabled={deleting} className="btn-delete flex-1">
          {deleting ? <LoadingDots /> : "Usuń konto"}
        </button>
      </div>
    </fieldset>
  );
};

export default DangerPanel;
