import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    title: 'Sign into Your Account',
    loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'signup',
    title: 'Join us today',
    loadComponent: () => import('./pages/auth/sign-up/sign-up.page').then(m => m.SignUpPage)
  },
  {
    path: 'reset-password',
    title: 'Reset Password',
    loadComponent: () => import("./pages/auth/password-reset/password-reset.page").then(m => m.PasswordResetPage)
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];
