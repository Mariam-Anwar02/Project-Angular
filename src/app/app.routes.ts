import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'admin-dashboard', component: AdminDashboardComponent },
{ path: 'student-dashboard', component: StudentDashboardComponent }
];
