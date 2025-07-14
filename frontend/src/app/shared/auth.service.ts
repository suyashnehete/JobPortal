import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5001/api/auth';
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string {
  const token = this.getToken();
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role || '';
}

getEmployerId(): string {
  const token = this.getToken();
  if (!token) return '';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.sub; // sub is now the user id as a string
}

getUserName(): string {
  const token = this.getToken();
  if (!token) return '';
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || '';
  } catch {
    return '';
  }
}
}
