import type { Database } from "./supabase";

export interface CompletedShift {
  id: string;
  clockIn: string;
  clockOut: string;
  rate: number;
}

export interface ActiveShift {
  id: string;
  clockIn: string;
  rate: number;
  clockOut?: string;
}

export interface ShiftElementProps {
  shift: CompletedShift;
  onDelete: (id: string) => void;
  onEdit: (shift: CompletedShift) => void;
}

export type ShiftRow = Database["public"]["Tables"]["shifts"]["Row"];
