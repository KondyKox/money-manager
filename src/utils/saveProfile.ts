import { PROFILES_KEY } from "../constants/storageKeys";
import type { Profile } from "../types/Profile";
import { getProfiles } from "./getProfiles";

export const saveProfile = (updatedProfile: Profile) => {
  const currentProfiles = getProfiles() ?? [];

  const exists = currentProfiles.find((p) => p.id === updatedProfile.id);

  const updatedProfiles: Profile[] = exists
    ? currentProfiles.map((p) =>
        p.id === updatedProfile.id ? updatedProfile : p,
      )
    : [...currentProfiles, updatedProfile];

  localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles));
};
