import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryServices } from '../../core/services/category.service';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-transactions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  template: `
    <header class="page-head">
      <h1>Transactions</h1>
      <p>List, filter, and manage transactions. Built in Phase 2.</p>
    </header>

    @if (txService.transactions().length) {
      <table class="tx-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Account</th>
            <th>Note</th>
            <th class="num">Amount</th>
          </tr>
        </thead>
        <tbody>
          @for (tx of txService.transactions(); track tx.id) {
            <tr>
              <td>{{ tx.date | date: 'mediumDate' }}</td>
              <td>{{ categoryService.categoryName(tx.categoryId) }}</td>
              <td>{{ accountService.accountName(tx.accountId) }}</td>
              <td>{{ tx.note ?? '—' }}</td>
              <td
                class="num"
                [class.income]="tx.type === 'income'"
                [class.expense]="tx.type === 'expense'"
              >
                {{ tx.type === 'expense' ? '-' : '+' }}{{ tx.amount | currency }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <p class="empty">No transactions yet.</p>
    }
  `,
  styles: `
    .page-head h1 { margin: 0 0 0.25rem; font-size: 1.75rem; }
    .page-head p { margin: 0 0 1.5rem; color: #64748b; }
    .tx-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
    .tx-table th, .tx-table td { padding: 0.6rem 0.75rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
    .tx-table th { color: #64748b; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.03em; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .income { color: #16a34a; }
    .expense { color: #dc2626; }
    .empty { color: #64748b; }
  `,
})
export class Transactions {
  readonly txService = inject(TransactionService);
  readonly categoryService = inject(CategoryServices);
  readonly accountService = inject(AccountService);
}
