import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { JobService } from 'src/app/shared/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  job: any;
  jobId: number = 0;
  resumeUrl: string = '';
  applySuccess = false;
  applyError = '';
  userRole = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.jobId = +this.route.snapshot.paramMap.get('id')!;
    this.jobService.getJobById(this.jobId).subscribe((data: any) => {
      this.job = data;
    });
  }

  apply() {
    if (!this.resumeUrl.startsWith("http")) {
      this.resumeUrl = "https://" + this.resumeUrl;
    }
    this.jobService.applyToJob(this.jobId, this.resumeUrl).subscribe({
      next: () => {
        this.applySuccess = true;
        this.applyError = '';
      },
      error: (err: any) => {
        this.applyError = err.error.message || 'Application failed';
      }
    });
  }

  
}
