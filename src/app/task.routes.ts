import { Routes } from '@angular/router';

export const taskRoutes: Routes = [
  {
    path: 'overview',
    title: 'Overview',
    loadComponent: () => import('./pages/tasks/overview/overview.page').then(m => m.OverviewPage)
  },
  {
    path: 'all',
    title: 'Tasks',
    loadComponent: () => import('./pages/tasks/tasks/tasks.page').then(m => m.TasksPage)
  },
  { path: '', pathMatch: 'full', redirectTo: 'overview' }
];
