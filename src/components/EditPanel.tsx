import type { Dispatch, SetStateAction } from "react";
import type { Profile } from "../types/Profile";

interface EditPanelProps {
  editedProfile: Profile;
  setEditedProfile: Dispatch<SetStateAction<Profile | null>>;
}

const EditPanel = ({ editedProfile, setEditedProfile }: EditPanelProps) => {
  return (
    <div className="bg-green-400 rounded-lg px-3 py-4 border-2 border-green-400">
      <h3 className="text-center text-white font-bold mb-4 text-xl">
        Panel edycji
      </h3>
      <div className="input-group">
        <label htmlFor="hourlyRate">Stawka Godzinowa</label>
        <div className="relative">
          <input
            type="number"
            id="hourlyRate"
            name="hourlyRate"
            step="0.5"
            placeholder="np. 31,50"
            value={editedProfile.hourlyRate}
            onChange={(e) =>
              setEditedProfile((prev) =>
                prev ? { ...prev, hourlyRate: Number(e.target.value) } : prev,
              )
            }
          />
          <span>zł/h</span>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
