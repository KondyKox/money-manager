// src/utils/buildSavingsChartData.ts
import type { Profile } from "../types/Profile";

export const buildSavingsChartData = (profiles: Profile[]) => {
  // per-profile: sort chronologically, turn each entry into a running total
  const profileRunning = profiles.map((profile) => {
    const sorted = [...profile.savings].sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    let running = 0;
    const points = sorted.map((s) => {
      running += s.amount;
      return { date: s.date, total: running };
    });

    return { name: profile.name, points };
  });

  // union of every date any profile has an entry on, sorted
  const allDates = Array.from(
    new Set(profileRunning.flatMap((p) => p.points.map((pt) => pt.date))),
  ).sort();

  if (allDates.length === 0) return [];

  return allDates.map((date) => {
    const row: Record<string, string | number> = { date };

    for (const profile of profileRunning) {
      // forward-fill: last known balance at or before this date
      const lastPoint = [...profile.points]
        .reverse()
        .find((pt) => pt.date <= date);
      row[profile.name] = lastPoint ? lastPoint.total : 0;
    }

    return row;
  });
};
