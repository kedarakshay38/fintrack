import { computed, Injectable, signal } from "@angular/core";
import { Transaction } from "../models/transaction";
import { TRANSACTIONS } from "../mock/seed";

@Injectable(
    {providedIn:'root'}
)
export class TransactionService{

    //private readonly signal seeded with transactions
    #transactions = signal<Transaction[]>(TRANSACTIONS);

    //public readonly signal
    readonly transactions= this.#transactions.asReadonly();

    readonly count =computed(()=>this.#transactions().length);

   readonly filterType =signal<'all'|'income'|'expense'>("all");
  readonly filteredTransactions=computed(()=> this.#transactions().filter((t)=>{
     const f = this.filterType();
  return f === 'all'
    ? this.#transactions():
    t.type===this.filterType()

  }));

  

    add(tx:Transaction){
this.#transactions.update(list=>[...list,tx]);
    }



}