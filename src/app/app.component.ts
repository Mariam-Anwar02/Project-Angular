import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/shared/header/header.component';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  get user() {
    return this.auth.getUser();
  }
}
