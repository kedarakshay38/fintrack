import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget.service';
import { CategoryServices } from '../../core/services/category.service';
@Component({
  selector: 'app-budgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <h1>Budgets</h1>
      <p>Set monthly limits per category. Built in Phase 2.</p>
      <ul>
      @for(b of budgetService.budgetsWithSpent();track b.id){
      <li>{{ categoryService.categoryName(b.categoryId) }} — limit {{ b.limit }}, spent {{ b.spent }}, left {{ b.limit - b.spent }}</li>
      }@empty{
      <li> No Budgets </li>
      }
      </ul>
    </header>
  `,
  styles: `
    .page-head h1 { margin: 0 0 0.25rem; font-size: 1.75rem; }
    .page-head p { margin: 0; color: #64748b; }
  `,
})
export class Budgets {
   protected readonly budgetService= inject(BudgetService);
   protected readonly categoryService = inject(CategoryServices);



}
