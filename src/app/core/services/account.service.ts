import { computed, Injectable, signal } from '@angular/core';
import { Account } from '../models/account';
import { ACCOUNTS } from '../mock/seed';
import { newId } from '../util/id';

// Signal-based store for accounts, seeded from mock data.
@Injectable({ providedIn: 'root' })
export class AccountService {
  #accounts = signal<Account[]>([...ACCOUNTS]);

  readonly accounts = this.#accounts.asReadonly();
  readonly count = computed(() => this.#accounts().length);
  // Net worth across all accounts.
  readonly totalBalance = computed(() =>
    this.#accounts().reduce((sum, acc) => sum + acc.balance, 0),
  );

  // O(1) id -> account lookup, rebuilt only when #accounts changes.
  readonly #byId = computed(
    () => new Map(this.#accounts().map((a) => [a.id, a])),
  );

  accountName(id: string): string {
    return this.#byId().get(id)?.name ?? id;
  }

  getById(id: string): Account | undefined {
    return this.#byId().get(id);
  }

  add(account: Omit<Account, 'id'>): Account {
    const created: Account = { ...account, id: newId() };
    this.#accounts.update((list) => [...list, created]);
    return created;
  }

  update(id: string, changes: Partial<Omit<Account, 'id'>>): void {
    this.#accounts.update((list) =>
      list.map((acc) => (acc.id === id ? { ...acc, ...changes } : acc)),
    );
  }

  remove(id: string): void {
    this.#accounts.update((list) => list.filter((acc) => acc.id !== id));
  }
}
