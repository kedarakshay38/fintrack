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

    add(tx:Transaction){
this.#transactions.update(list=>[...list,tx]);
    }



}