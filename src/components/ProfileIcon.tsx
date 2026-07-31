import type { Profile } from "../types/Profile";

const ProfileIcon = ({
  profile,
  onClick,
}: {
  profile: Profile;
  onClick: () => void;
}) => {
  return (
    <button className="profile-icon" onClick={onClick}>
      {profile.name}
    </button>
  );
};

export default ProfileIcon;
