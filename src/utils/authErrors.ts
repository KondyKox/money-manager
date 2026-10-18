const AUTH_ERRORS: Record<string, string> = {
  invalid_credentials: "Nieprawidłowy email lub hasło.",
  user_already_exists: "Konto z tym adresem email już istnieje.",
  email_exists: "Konto z tym adresem email już istnieje.",
  weak_password: "Hasło jest zbyt słabe.",
  same_password: "Nowe hasło musi różnić się od obecnego.",
  email_address_invalid: "Nieprawidłowy adres email.",
  email_address_not_authorized: "Na ten adres nie można wysłać wiadomości.",
  email_not_confirmed: "Potwierdź adres email, zanim się zalogujesz.",
  over_email_send_rate_limit:
    "Wysłano zbyt wiele wiadomości. Spróbuj za jakiś czas.",
  over_request_rate_limit: "Zbyt wiele prób. Spróbuj ponownie za chwilę.",
  signup_disabled: "Rejestracja jest obecnie wyłączona.",
  user_not_found: "Nie znaleziono użytkownika.",
  session_expired: "Sesja wygasła. Zaloguj się ponownie.",
  session_not_found: "Sesja wygasła. Zaloguj się ponownie.",
};

export const translateAuthError = (error: {
  code?: string;
  name?: string;
}): string => {
  if (error.name === "AuthRetryableFetchError")
    return "Brak połączenia z serwerem. Sprawdź internet.";

  return (
    (error.code && AUTH_ERRORS[error.code]) ||
    "Coś poszło nie tak. Spróbuj ponownie."
  );
};
