import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5001/api/admin';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getAllJobs() {
    return this.http.get(`${this.apiUrl}/jobs`);
  }

  deleteJob(id: number) {
    return this.http.delete(`${this.apiUrl}/jobs/${id}`);
  }
}
