import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-transactions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <h1>Transactions</h1>
      <p>List, filter, and manage transactions. Built in Phase 2.</p>
    </header>
    <div>

    @for(tx of txService.transactions();track tx.id){
    
    <li>{{tx.date}}- {{tx.amount}}</li>
    } @empty{
    
    <li>No transactions </li>
    
    }

    </div>
  `,
  styles: `
    .page-head h1 { margin: 0 0 0.25rem; font-size: 1.75rem; }
    .page-head p { margin: 0; color: #64748b; }
  `,
})
export class Transactions {
 
   readonly txService= inject(TransactionService);
  


}
