import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryServices } from '../../core/services/category.service';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-transactions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  readonly txService = inject(TransactionService);
  readonly categoryService = inject(CategoryServices);
  readonly accountService = inject(AccountService);
}
