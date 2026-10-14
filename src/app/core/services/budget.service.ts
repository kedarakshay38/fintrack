import { computed, inject, Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';
import { BUDGETS } from '../mock/seed';
import { newId } from '../util/id';
import { TransactionService } from './transaction.service';

// Signal-based store for budgets; `spent` is derived from transactions.
@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly txService = inject(TransactionService);

  #budgets = signal<Budget[]>([...BUDGETS]);
  readonly budgets = this.#budgets.asReadonly();
  readonly count = computed(() => this.#budgets().length);

  // Each budget with `spent` recomputed from matching expense transactions
  // in its period, so it stays in sync whenever either signal changes.
  readonly budgetsWithSpent = computed(() => {
    const txns = this.txService.transactions();

    return this.#budgets().map((b) => {
      const spent = txns
        .filter(
          (t) =>
            t.categoryId === b.categoryId &&
            t.type === 'expense' &&
            t.date.startsWith(b.period), // period '2026-09' matches date '2026-09-05'
        )
        .reduce((sum, t) => sum + t.amount, 0);

      return { ...b, spent };
    });
  });

  getById(id: string): Budget | undefined {
    return this.#budgets().find((b) => b.id === id);
  }

  add(budget: Omit<Budget, 'id'>): Budget {
    const created: Budget = { ...budget, id: newId() };
    this.#budgets.update((list) => [...list, created]);
    return created;
  }

  update(id: string, changes: Partial<Omit<Budget, 'id'>>): void {
    this.#budgets.update((list) =>
      list.map((b) => (b.id === id ? { ...b, ...changes } : b)),
    );
  }

  remove(id: string): void {
    this.#budgets.update((list) => list.filter((b) => b.id !== id));
  }
}
