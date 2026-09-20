import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-budgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <h1>Budgets</h1>
      <p>Set monthly limits per category. Built in Phase 2.</p>
    </header>
  `,
  styles: `
    .page-head h1 { margin: 0 0 0.25rem; font-size: 1.75rem; }
    .page-head p { margin: 0; color: #64748b; }
  `,
})
export class Budgets {}
