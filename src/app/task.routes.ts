import { Routes } from '@angular/router';

export const taskRoutes: Routes = [
  {
    path: 'overview',
    title: 'Overview',
    loadComponent: () => import('./pages/tasks/overview/overview.page').then(m => m.OverviewPage)
  },
  { path: '', pathMatch: 'full', redirectTo: 'overview' }
];
