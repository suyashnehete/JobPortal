import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { FormsModule } from '@angular/forms';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { MyJobsComponent } from './employer/my-jobs/my-jobs.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RegisterComponent } from './auth/register/register.component';
import { JobPostComponent } from './jobs/job-post/job-post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { MyApplicationsComponent } from './jobs/my-applications/my-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JobListComponent,
    JobDetailsComponent,
    MyJobsComponent,
    AdminDashboardComponent,
    NavbarComponent,
    RegisterComponent,
    JobPostComponent,
    MyApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
