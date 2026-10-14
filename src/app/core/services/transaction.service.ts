import { computed, Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TRANSACTIONS } from '../mock/seed';
import { newId } from '../util/id';

// Signal-based store for transactions, seeded from mock data.
@Injectable({ providedIn: 'root' })
export class TransactionService {
  #transactions = signal<Transaction[]>([...TRANSACTIONS]);

  readonly transactions = this.#transactions.asReadonly();
  readonly count = computed(() => this.#transactions().length);

  getById(id: string): Transaction | undefined {
    return this.#transactions().find((tx) => tx.id === id);
  }

  add(tx: Omit<Transaction, 'id'>): Transaction {
    const created: Transaction = { ...tx, id: newId() };
    this.#transactions.update((list) => [...list, created]);
    return created;
  }

  update(id: string, changes: Partial<Omit<Transaction, 'id'>>): void {
    this.#transactions.update((list) =>
      list.map((tx) => (tx.id === id ? { ...tx, ...changes } : tx)),
    );
  }

  remove(id: string): void {
    this.#transactions.update((list) => list.filter((tx) => tx.id !== id));
  }
}
