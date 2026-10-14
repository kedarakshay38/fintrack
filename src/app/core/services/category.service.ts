import { computed, Injectable, signal } from '@angular/core';
import { Category } from '../models/category';
import { CATEGORIES } from '../mock/seed';
import { newId } from '../util/id';

// Signal-based store for categories, seeded from mock data.
@Injectable({ providedIn: 'root' })
export class CategoryService {
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

  getById(id: string): Category | undefined {
    return this.#categories().find((c) => c.id === id);
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
