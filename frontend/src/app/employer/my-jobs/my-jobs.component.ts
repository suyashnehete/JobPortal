import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobService } from 'src/app/shared/job.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
  jobs: any[] = [];
  applicants: { [jobId: number]: any[] } = {};

  constructor(private jobService: JobService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMyJobs();
  }

  loadMyJobs() {
    this.jobService.getMyJobs().subscribe((data: any) => {
      this.jobs = data;
    });
  }

  deleteJob(id: number) {
    if (!confirm("Are you sure you want to delete this job?")) return;
    this.jobService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(job => job.id !== id);
    });
  }

  viewApplicants(jobId: number) {
    this.jobService.getApplicants(jobId).subscribe((res: any) => {
      this.applicants[jobId] = res;
    });
  }

  showApplicants: { [jobId: number]: boolean } = {};

  toggleApplicants(jobId: number) {
    this.showApplicants[jobId] = !this.showApplicants[jobId];
  }
}
