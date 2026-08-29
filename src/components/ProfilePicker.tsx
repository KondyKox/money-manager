import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ProfileIcon from "./ui/ProfileIcon";
import type { Profile } from "../types/Profile";
import { newProfiles } from "../constants/newProfiles";
import { getProfiles } from "../utils/getProfiles";
import { saveProfile } from "../utils/saveProfile";
import { Palette } from "lucide-react";
import ColorPicker from "./modal/colorPicker-modal";
import type { Color } from "../types/Color";

const ProfilePicker = ({
  setSelectedProfileId,
  onChangeColor,
}: {
  setSelectedProfileId: Dispatch<SetStateAction<string | null>>;
  onChangeColor: (newColor: Color) => void;
}) => {
  const [profiles, setProfiles] = useState<Profile[]>(
    () => getProfiles() ?? newProfiles,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!getProfiles()) newProfiles.forEach((profile) => saveProfile(profile));
  }, []);

  return (
    <>
      <div className="text-center flex justify-center items-stretch flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-0 md:p-6">
        <h1 className="text-5xl font-bold">Siema mordo!</h1>
        <div className="mt-5">
          <h3 className="italic text-xl pb-2">Wybierz swój profil</h3>
          <div className="border-t-2 py-2 flex justify-center items-stretch gap-2">
            {profiles.map((profile) => (
              <ProfileIcon
                key={profile.id}
                profile={profile}
                onClick={() => setSelectedProfileId(profile.id)}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center items-center">
            <button
              className="btn-secondary border-2 flex justify-center items-center gap-2 group"
              onClick={() => setIsModalOpen(true)}
            >
              <Palette
                size={24}
                className="iconBtn group-hover:text-pink-400"
              />
              Zmiana koloru
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ColorPicker
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onChangeColor={onChangeColor}
        />
      )}
    </>
  );
};

export default ProfilePicker;
