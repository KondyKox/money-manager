import { PROFILES_KEY } from "../constants/storageKeys";
import type { Profile } from "../types/Profile";

export const getProfiles = (): Profile[] | null => {
  const raw = localStorage.getItem(PROFILES_KEY); // string | null

  if (!raw) {
    console.log("No profiles saved.");
    return null;
  }

  const profiles: Profile[] = JSON.parse(raw); // string parsowany do Profile
  return profiles;
};
