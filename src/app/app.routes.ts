import {RouterModule, Routes} from '@angular/router';
import {JobListComponent} from "./views/job-list/job-list.component";
import {LoginComponent} from "./views/authentication/login/login.component";
import {RegisterComponent} from "./views/authentication/register/register.component";
import {JobApplicationsComponent} from "./views/job-applications/job-applications.component";

export const routes: Routes = [
  {
    path: 'jobs',
    component: JobListComponent,
    data: {title: 'Pacto Vagas-Internas'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {title: 'Register'}
  },
  {
    path: '',
    redirectTo: '/jobs',
    pathMatch: 'full'
  },
  {
    path: 'jobs/:vacancyId',
    component: JobApplicationsComponent,
    data: {title: 'Candidaturas'}
  }

];
