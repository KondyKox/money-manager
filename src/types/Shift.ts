export interface CompletedShift {
  id: string;
  clockIn: string;
  clockOut: string;
  rate: number;
}

export interface ActiveShift {
  clockIn: string;
  rate: number;
}
