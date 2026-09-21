export interface Budget {
  id: string;
  categoryId: string;   // which category this budget caps
  limit: number;        // max spend for the period
  period: string;       // e.g. "2026-09" (year-month)
  spent: number;        // running total spent this period
}