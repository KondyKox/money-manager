import { PROFILES_KEY } from "../constants/storageKeys";
import type { Profile } from "../types/Profile";

export const getProfiles = (): Profile[] | null => {
  const raw = localStorage.getItem(PROFILES_KEY); // string | null

  if (!raw) {
    console.log("No profiles saved.");
    return null;
  }

  const profiles: Profile[] = JSON.parse(raw); // string parsowany do Profile
  return profiles.filter((p) => p && p.id);
};

export const getProfile = (profileId: string): Profile | null => {
  const profiles = getProfiles();
  if (!profiles) return null;

  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) return null;

  return profile;
};
