import type { Profile } from "../types/Profile";

export const buildCategoryChartData = (
  profiles: Profile[],
  kind: "expenses" | "incomes",
  selectedMonth: string,
) => {
  const categoryMap = new Map<string, Record<string, number>>();

  for (const profile of profiles) {
    const records = profile[kind].filter((r) =>
      r.date.startsWith(selectedMonth),
    );

    for (const record of records) {
      const existing = categoryMap.get(record.category) ?? {};
      existing[profile.name] = (existing[profile.name] ?? 0) + record.amount;
      categoryMap.set(record.category, existing);
    }
  }

  return Array.from(categoryMap.entries()).map(([category, byProfile]) => ({
    category,
    ...byProfile,
  }));
};
