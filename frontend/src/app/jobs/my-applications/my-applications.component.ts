import { Component } from '@angular/core';
import { JobService } from 'src/app/shared/job.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent {
applications: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getMyApplications().subscribe((res: any) => {
      this.applications = res;
    });
  }
}
