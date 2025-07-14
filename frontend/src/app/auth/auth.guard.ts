import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const isLoggedIn = this.auth.isLoggedIn();
    const userRole = this.auth.getUserRole();
    console.log('AuthGuard - isLoggedIn:', isLoggedIn, 'userRole:', userRole, 'expectedRole:', expectedRole);

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && expectedRole !== userRole) {
      this.router.navigate(['/jobs']); // redirect to safe fallback
      return false;
    }

    return true;
  }
}