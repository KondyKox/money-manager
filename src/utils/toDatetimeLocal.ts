export const toDatetimeLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minutes)}`;
};

const pad = (n: number) => n.toString().padStart(2, "0");
