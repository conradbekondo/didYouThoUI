import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth.routes').then(m => m.authRoutes),
    loadComponent: () => import('./layouts/auth/auth.layout').then(m => m.AuthLayout)
  },
  { path: '**', title: 'Page not found', component: NotFoundPage }
];
