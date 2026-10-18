import { getProfiles } from "./getProfiles";

export const exportData = async () => {
  const profiles = await getProfiles();
  if (!profiles) throw new Error("Brak profili do pobrania");

  const data = {
    exportedAt: new Date().toISOString(),
    profiles: profiles.map((p) => ({
      id: p.id,
      name: p.name,
      hourlyRate: p.hourlyRate,
      activeShift: p.activeShift,
      completedShifts: p.completedShifts,
      expenses: p.expenses,
      incomes: p.incomes,
      savings: p.savings,
    })),
  };

  return JSON.stringify(data, null, 2);
};
