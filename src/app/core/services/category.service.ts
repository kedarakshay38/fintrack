import { computed, Injectable, signal } from '@angular/core';
import { Category } from '../models/category';
import { CATEGORIES } from '../mock/seed';
import { newId } from '../util/id';

// Signal-based store for categories, seeded from mock data.
@Injectable({ providedIn: 'root' })
export class CategoryServices {
  #categories = signal<Category[]>([...CATEGORIES]);

  readonly categories = this.#categories.asReadonly();
  readonly count = computed(() => this.#categories().length);
  // Split by kind for income/expense pickers.
  readonly income = computed(() =>
    this.#categories().filter((c) => c.kind === 'income'),
  );
  readonly expense = computed(() =>
    this.#categories().filter((c) => c.kind === 'expense'),
  );

  // O(1) id -> category lookup, rebuilt only when #categories changes.
  readonly #byId = computed(
    () => new Map(this.#categories().map((c) => [c.id, c])),
  );

  categoryName(id: string): string {
    return this.#byId().get(id)?.name ?? id;
  }

  getById(id: string): Category | undefined {
    return this.#byId().get(id);
  }

  add(category: Omit<Category, 'id'>): Category {
    const created: Category = { ...category, id: newId() };
    this.#categories.update((list) => [...list, created]);
    return created;
  }

  update(id: string, changes: Partial<Omit<Category, 'id'>>): void {
    this.#categories.update((list) =>
      list.map((c) => (c.id === id ? { ...c, ...changes } : c)),
    );
  }

  remove(id: string): void {
    this.#categories.update((list) => list.filter((c) => c.id !== id));
  }
}
