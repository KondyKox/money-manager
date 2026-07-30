import type { Profile } from "../types/Profile";

const ProfileIcon = ({ profile }: { profile: Profile }) => {
  return <div className="profile-icon">{profile.name}</div>;
};

export default ProfileIcon;
