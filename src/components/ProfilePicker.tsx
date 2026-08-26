import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ProfileIcon from "./ui/ProfileIcon";
import type { Profile } from "../types/Profile";
import { newProfiles } from "../constants/newProfiles";
import { getProfiles } from "../utils/getProfiles";
import { saveProfile } from "../utils/saveProfile";

const ProfilePicker = ({
  setSelectedProfileId,
}: {
  setSelectedProfileId: Dispatch<SetStateAction<string | null>>;
}) => {
  const [profiles, setProfiles] = useState<Profile[]>(
    () => getProfiles() ?? newProfiles,
  );

  useEffect(() => {
    if (!getProfiles()) newProfiles.forEach((profile) => saveProfile(profile));
  }, []);

  return (
    <div className="text-center flex justify-center items-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-0 md:p-6">
      <h1 className="text-5xl font-bold text-orange-900">Siema mordo!</h1>
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
      </div>
    </div>
  );
};

export default ProfilePicker;
