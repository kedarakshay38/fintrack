import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../core/services/transaction.service';
import { CategoryServices } from '../../core/services/category.service';
import { AccountService } from '../../core/services/account.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
 import { Transaction } from '../../core/models/transaction'
@Component({
  selector: 'app-transactions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe,ReactiveFormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  readonly txService = inject(TransactionService);
  readonly categoryService = inject(CategoryServices);
  readonly accountService = inject(AccountService);

  showForm= signal(false);
editingId=signal<string|null>(null);

  private fb=inject(FormBuilder);

  form = this.fb.group({
    date:       [new Date().toISOString().slice(0, 10), Validators.required],
    amount:     [null as number | null, [Validators.required, Validators.min(0.01)]],
    type:       ['expense' as 'income' | 'expense', Validators.required],
    categoryId: ['', Validators.required],
    accountId:  ['', Validators.required],
    note:       [''],
  });

  submit(): void {
    
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
     const payload = {
    date: v.date!,
    amount: v.amount!,
    type: v.type!,
    categoryId: v.categoryId!,
    accountId: v.accountId!,
    note: v.note ?? undefined,
  };
    const id = this.editingId();

     if (id) {
    this.txService.update(id, payload);
  } else {
    this.txService.add(payload);
  }

  this.cancel()
  }

  edit(tx:Transaction){
    this.editingId.set(tx.id);

    this.form.patchValue(
      {
        date:tx.date,
          amount: tx.amount,
    type: tx.type,
    categoryId: tx.categoryId,
    accountId: tx.accountId,
    note: tx.note ?? '',
      }
    );
    this.showForm.set(true);
  }

  remove(id: string): void {
  this.txService.remove(id);
}
cancel(): void {
  this.form.reset({ date: new Date().toISOString().slice(0, 10), type: 'expense' });
  this.editingId.set(null);
  this.showForm.set(false);
}


}
