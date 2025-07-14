import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/shared/job.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent {
title = '';
  description = '';
  salary = '';
  location = '';
  success = false;
  error = '';

  constructor(private jobService: JobService, private router: Router) {}

  postJob() {
    const data = {
      title: this.title,
      description: this.description,
      salary: this.salary,
      location: this.location
    };

    this.jobService.postJob(data).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(['/my-jobs']);
      },
      error: () => {
        this.error = 'Job post failed';
      }
    });
  }
}
