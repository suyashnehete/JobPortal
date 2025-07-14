import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:5001/api/jobs';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  getJobs(filters?: { location?: string; category?: string }) {
    let params = new HttpParams();
    if (filters?.location) {
      params = params.set('location', filters.location);
    }
    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    return this.http.get(this.apiUrl, { params, ...this.getAuthHeaders() });
  }

  getJobById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  applyToJob(jobId: number, resumeUrl: string) {
    return this.http.post(`http://localhost:5001/api/applications/${jobId}`, {
      resume_url: resumeUrl
    }, this.getAuthHeaders());
  }

  getMyJobs() {
    return this.http.get(`http://localhost:5001/api/jobs/my`, this.getAuthHeaders());
  }

  deleteJob(id: number) {
    return this.http.delete(`http://localhost:5001/api/jobs/${id}`, this.getAuthHeaders());
  }

  postJob(data: any) {
    return this.http.post(`http://localhost:5001/api/jobs`, data, this.getAuthHeaders());
  }

  getMyApplications() {
    return this.http.get(`http://localhost:5001/api/applications/my`, this.getAuthHeaders());
  }

  getApplicants(jobId: number) {
  return this.http.get(`http://localhost:5001/api/applications/job/${jobId}`, this.getAuthHeaders());
}



}
