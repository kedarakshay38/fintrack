import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly accountService= inject(AccountService);
  
}
