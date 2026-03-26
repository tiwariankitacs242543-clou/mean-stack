import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    return router.parseUrl('/login');
};

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    { path: 'register', component: RegisterComponent },

    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },

    // removed forgot-password and reset-password routes

    { path: '**', redirectTo: 'dashboard' }
];