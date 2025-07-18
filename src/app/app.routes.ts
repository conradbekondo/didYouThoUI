import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { authGuard } from './guards/auth-guard';
import { AboutPage } from './pages/about/about.page';
import { TermsAndConditionsPage } from './pages/terms-and-conditions/terms-and-conditions.page';

const signInGuard = authGuard('/auth');

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth.routes').then(m => m.authRoutes),
    loadComponent: () => import('./layouts/auth/auth.layout').then(m => m.AuthLayout)
  },
  {
    path: 'about',
    component: AboutPage,
    title: 'About us'
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsPage,
    title: 'About us'
  },
  {
    path: 'tasks',
    canActivate: [signInGuard],
    loadComponent: () => import('./layouts/task/task.layout').then(m => m.TaskLayout),
    loadChildren: () => import('./task.routes').then(m => m.taskRoutes)
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: '**', title: 'Page not found', component: NotFoundPage }
];
