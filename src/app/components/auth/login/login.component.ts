import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: users => {
        if (users.length > 0) {
          const user = users[0];
          this.auth.setUser(user);
          const role = user.role;

          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'student') {
            this.router.navigate(['/exams']);
          } else {
            this.errorMessage = 'Unknown role';
          }
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      error: () => {
        this.errorMessage = 'Error connecting to server';
      }
    });
  }

}
