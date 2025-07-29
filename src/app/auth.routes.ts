import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'oauth2/callback/github',
    title: 'Connecting you in...',
    loadComponent: () => import('./pages/auth/oauth/github-callback/github-callback.page').then(m => m.GithubCallbackPage)
  },
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
