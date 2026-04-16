import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { TaskList } from './task-list/task-list';
import { LayoutComponent } from './layout/layout';
import { authChildGuard } from './auth-guard';
import { TaskDetailComponent } from './task-details/task-details';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authChildGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TaskList },
      { path: 'task/:id', component: TaskDetailComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];