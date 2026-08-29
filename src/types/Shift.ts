import type { Database } from "./supabase";

export interface CompletedShift {
  id: string;
  clockIn: string;
  clockOut: string;
  rate: number;
}

export interface ActiveShift {
  clockIn: string;
  rate: number;
  clockOut?: string;
}

export type ShiftRow = Database["public"]["Tables"]["shifts"]["Row"];
