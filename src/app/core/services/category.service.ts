import { computed, Injectable, signal } from "@angular/core";
import { Category } from "../models/category";
import { CATEGORIES } from "../mock/seed";

@Injectable({
    providedIn:'root'
})
export class CategoryServices{

    #categories =signal< Category[]>(CATEGORIES);
    readonly categories= this.#categories.asReadonly();

 readonly #byId= computed(
  ()=>{
    return new Map(this.#categories().map((c)=>[c.id,c]))
  }
)

categoryName(id:string):string{

    return this.#byId().get(id)?.name?? id;
}
}