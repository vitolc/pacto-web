import {RouterModule, Routes} from '@angular/router';
import {JobListComponent} from "./views/rest/job-list/job-list.component";
import {LoginComponent} from "./views/rest/authentication/login/login.component";
import {RegisterComponent} from "./views/rest/authentication/register/register.component";
import {JobApplicationsComponent} from "./views/rest/job-applications/job-applications.component";
import {MyApplicationsComponent} from "./views/rest/my-applications/my-applications.component";

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
    path: 'jobs/:vacancyId',
    component: JobApplicationsComponent,
    data: {title: 'Candidaturas'}
  },
  {
    path: 'my-applications',
    component: MyApplicationsComponent,
    data: {title: 'Minhas Candidaturas'}
  },
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full'
  },

];
