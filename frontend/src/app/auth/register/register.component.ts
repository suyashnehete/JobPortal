import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
name = '';
  email = '';
  password = '';
  role = 'seeker';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(data).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.access_token);
        this.router.navigate(['/jobs']);
      },
      error: () => {
        this.error = 'Registration failed. Try again.';
      }
    });
  }
}
