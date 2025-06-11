import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {ExamListComponent} from './components/exam/exam-list/exam-list.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { TakeExamComponent } from './components/exam/take-exam/take-exam.component';
import { ViewResultComponent } from './components/exam/view-results/view-results.component';
import { ExamFormComponent } from './components/shared/exam-form/exam-form.component';
import {ManageQuestionsComponent} from './components/manage-questions/manage-questions.component';
import {AdminViewResultsComponent} from './components/admin-view-results/admin-view-results.component';
export const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'admin-dashboard', component: AdminDashboardComponent },
{ path: 'exams', component: ExamListComponent },
{ path: 'take-exam/:id', component: TakeExamComponent },
{path: 'view-results',component: ViewResultComponent},
{path: 'admin-dashboard/edit-exam/:id',component: ExamFormComponent},
{path: 'admin-dashboard/create-exam',component: ExamFormComponent},
{ path: 'admin-dashboard/manage-questions/:examId', component: ManageQuestionsComponent },
{path: 'admin-dashboard/results',component: AdminViewResultsComponent}
]
