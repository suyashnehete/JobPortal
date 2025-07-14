import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobs: any[] = [];
  location = '';
  category = '';

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    const filters = {
      location: this.location.trim(),
      category: this.category.trim()
    };

    this.jobService.getJobs(filters).subscribe((data: any) => {
      this.jobs = data;
    });
  }
}
