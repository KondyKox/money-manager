import { MIN_PASSWORD_LENGHT } from "../../constants/auth";

export const validateNewPassword = (
  newPassword: string,
  repeated: string,
): string | null => {
  if (newPassword.length < MIN_PASSWORD_LENGHT)
    throw new Error("Za krókie hasło.");

  if (newPassword != repeated) throw new Error("Hasła się nie zgadzają.");

  return null;
};
