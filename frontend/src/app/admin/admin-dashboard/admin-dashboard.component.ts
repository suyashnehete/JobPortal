import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  jobs: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.adminService.getAllUsers().subscribe((res: any) => this.users = res);
    this.adminService.getAllJobs().subscribe((res: any) => this.jobs = res);
  }

  deleteUser(id: number) {
    if (!confirm("Delete user permanently?")) return;
    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== id);
    });
  }

  deleteJob(id: number) {
    if (!confirm("Delete job permanently?")) return;
    this.adminService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(j => j.id !== id);
    });
  }
}
