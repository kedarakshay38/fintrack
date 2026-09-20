import { Routes } from '@angular/router';

/**
 * Top-level routes. MainLayout is the lazy-loaded app shell (sidebar); every
 * feature is a lazy-loaded child rendered into its <router-outlet/>, so each
 * ships in its own bundle. Guards come in Phase 3.
 */
export const routes: Routes = [
  {path:"", loadComponent:()=> import('./layout/main-layout/main-layout').then((m)=>m.MainLayout),children:[
    { path: '' ,redirectTo:'dashboard', pathMatch:"full"},
    {path:'dashboard',title:'Dashboard .finTrack',
      loadComponent:()=>import('./features/dashboard/dashboard').then((m)=> m.Dashboard)
     },
     {
      path:"transactions",
      title:'Transactions . FinTrack',
      loadComponent:()=> import('./features/transactions/transactions').then((m)=>m.Transactions)
     },
     {
      path:"accounts",
      title:"Accounts .FinTrack",
      loadComponent:()=>import('./features/accounts/accounts').then((m)=>m.Accounts),
     },
     {
      path:'budgets',
      title:'Budgets .FinTrack',
      loadComponent: ()=> import('./features/budgets/budgets').then((m)=>m.Budgets)
     },
      
  ]
  },
   { path: '**', redirectTo: '' }
];
