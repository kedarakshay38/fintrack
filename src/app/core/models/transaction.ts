
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  type: TransactionType;
  date: string;   // ISO date, e.g. "2026-09-20"
  note?: string;
}