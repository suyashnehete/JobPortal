import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.authService.setToken(res.access_token);
          this.router.navigate(['/jobs']);
        },
        error: () => this.error = 'Invalid credentials'
      });
  }
}
