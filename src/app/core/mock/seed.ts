import { Account } from '../models/account';
import { Category } from '../models/category';
import { Transaction } from '../models/transaction';
import { Budget } from '../models/budget';

export const ACCOUNTS = [
  { id: 'a1', name: 'Checking', type: 'checking', balance: 2400, currency: 'USD' },
  { id: 'a2', name: 'Savings', type: 'savings', balance: 8000, currency: 'USD' },
  { id: 'a3', name: 'Credit Card', type: 'credit', balance: -540, currency: 'USD' },
] satisfies Account[];

export const CATEGORIES = [
  { id: 'c1', name: 'Salary', kind: 'income', color: '#16a34a', icon: '💼' },
  { id: 'c2', name: 'Freelance', kind: 'income', color: '#0ea5e9', icon: '🧑‍💻' },
  { id: 'c3', name: 'Groceries', kind: 'expense', color: '#2563eb', icon: '🛒' },
  { id: 'c4', name: 'Rent', kind: 'expense', color: '#dc2626', icon: '🏠' },
  { id: 'c5', name: 'Dining', kind: 'expense', color: '#f59e0b', icon: '🍽️' },
] satisfies Category[];

export const TRANSACTIONS = [
  { id: 't1', accountId: 'a1', categoryId: 'c1', amount: 3000, type: 'income', date: '2026-09-01', note: 'Monthly salary' },
  { id: 't2', accountId: 'a1', categoryId: 'c4', amount: 1200, type: 'expense', date: '2026-09-02', note: 'September rent' },
  { id: 't3', accountId: 'a1', categoryId: 'c3', amount: 84.5, type: 'expense', date: '2026-09-05' },
  { id: 't4', accountId: 'a3', categoryId: 'c5', amount: 42.0, type: 'expense', date: '2026-09-07', note: 'Dinner out' },
  { id: 't5', accountId: 'a1', categoryId: 'c3', amount: 63.25, type: 'expense', date: '2026-09-12' },
  { id: 't6', accountId: 'a2', categoryId: 'c2', amount: 750, type: 'income', date: '2026-09-15', note: 'Side project' },
  { id: 't7', accountId: 'a3', categoryId: 'c5', amount: 28.9, type: 'expense', date: '2026-09-18' },
  { id: 't8', accountId: 'a1', categoryId: 'c3', amount: 51.1, type: 'expense', date: '2026-09-20' },
] satisfies Transaction[];

export const BUDGETS = [
  { id: 'b1', categoryId: 'c3', limit: 400, period: '2026-09', spent: 198.85 },
  { id: 'b2', categoryId: 'c4', limit: 1200, period: '2026-09', spent: 1200 },
  { id: 'b3', categoryId: 'c5', limit: 200, period: '2026-09', spent: 70.9 },
] satisfies Budget[];
