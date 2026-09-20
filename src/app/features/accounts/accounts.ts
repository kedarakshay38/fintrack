import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <h1>Accounts</h1>
      <p>Bank, cash, and card accounts. Built in Phase 2.</p>
    </header>
  `,
  styles: `
    .page-head h1 { margin: 0 0 0.25rem; font-size: 1.75rem; }
    .page-head p { margin: 0; color: #64748b; }
  `,
})
export class Accounts {}
