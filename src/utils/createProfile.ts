import { supabase } from "../lib/supabaseClient";
import type { Profile } from "../types/Profile";
import { getProfile } from "./getProfiles";

export const createProfile = async (
  name: string,
  hourlyRate: number,
): Promise<Profile> => {
  const newProfile = {
    name,
    hourly_rate: hourlyRate,
  };

  const { data, error } = await supabase
    .from("profiles")
    .insert(newProfile)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Błąd przy tworzeniu profilu");

  const profile = await getProfile(data.id);

  if (!profile) throw new Error("Nie udało się pobrać utworzonego profilu");

  return profile;
};
