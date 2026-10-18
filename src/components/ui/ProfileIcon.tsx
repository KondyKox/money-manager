import { Plus } from "lucide-react";
import type { Profile } from "../../types/Profile";

const ProfileIcon = ({
  profile,
  onClick,
}: {
  profile?: Profile;
  onClick: () => void;
}) => {
  return (
    <button className="profile-icon group" onClick={onClick}>
      {profile ? (
        profile.name
      ) : (
        <Plus
          size={20}
          className="group-hover:scale-150 group-hover:text-green-400 transition-all duration-150 ease-in-out"
        />
      )}
    </button>
  );
};

export default ProfileIcon;
