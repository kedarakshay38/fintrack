import { computed, inject, Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';
import { BUDGETS } from '../mock/seed';
import { TransactionService } from './transaction.service';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  // One service can inject another. Budgets depend on transactions
  // (one-way) — keep the direction consistent to avoid circular deps.
  private readonly txService = inject(TransactionService);

  // Private writable state + public read-only view (single-writer pattern).
  #budgets = signal<Budget[]>(BUDGETS);
  readonly budgets = this.#budgets.asReadonly();

  /**
   * Each budget with its `spent` DERIVED from transactions rather than stored.
   * This computed reads TWO signals — transactions() and #budgets() — so it
   * auto-recomputes whenever either changes. No manual subscriptions.
   */
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

      // Override the seeded `spent` with the derived value (source of truth).
      return { ...b, spent };
    });
  });
}
