import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MyJobsComponent } from './employer/my-jobs/my-jobs.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobPostComponent } from './jobs/job-post/job-post.component';
import { MyApplicationsComponent } from './jobs/my-applications/my-applications.component';

const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'jobs', component: JobListComponent },
  { path: 'jobs/:id', component: JobDetailsComponent },

  { path: 'post-job', component: JobPostComponent, canActivate: [AuthGuard], data: { role: 'employer' } },
  { path: 'my-jobs', component: MyJobsComponent, canActivate: [AuthGuard], data: { role: 'employer' } },
  { path: 'applications', component: MyApplicationsComponent, canActivate: [AuthGuard], data: { role: 'seeker' } },

  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
