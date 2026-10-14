import { computed, Injectable, signal } from '@angular/core';
import { Budget } from '../models/budget';
import { BUDGETS } from '../mock/seed';
import { newId } from '../util/id';

// Signal-based store for budgets, seeded from mock data.
@Injectable({ providedIn: 'root' })
export class BudgetService {
  #budgets = signal<Budget[]>([...BUDGETS]);

  readonly budgets = this.#budgets.asReadonly();
  readonly count = computed(() => this.#budgets().length);

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
