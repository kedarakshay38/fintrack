import { computed, Injectable, signal } from "@angular/core";
import { Account } from "../models/account";
import { ACCOUNTS } from "../mock/seed";


@Injectable({
    providedIn:'root'
})
export class AccountService{

    #accounts= signal<Account[]>(ACCOUNTS);//private writable

    readonly accounts =this.#accounts.asReadonly();//public readable

    readonly totalBalance= computed(()=>this.#accounts().reduce((sum,acc)=>sum+acc.balance,0));

    // O(1) id -> account lookup, rebuilt only when #accounts changes.
    readonly #byId= computed(()=> new Map(this.#accounts().map((a)=>[a.id,a])));

    accountName(id:string):string{
        return this.#byId().get(id)?.name ?? id;
    }
}