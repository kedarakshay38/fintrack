import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

/**
 * The application shell: persistent header + navigation, with a routed
 * outlet for feature pages. Kept standalone and OnPush (redundant under
 * zoneless, but explicit and interview-friendly).
 */
@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  protected readonly navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transactions', icon: '💳' },
    { path: '/accounts', label: 'Accounts', icon: '🏦' },
    { path: '/budgets', label: 'Budgets', icon: '🎯' },
  ] as const;
}
