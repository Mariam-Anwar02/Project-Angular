import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }

  setUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }


  getUser() {
    if (this.currentUser) return this.currentUser;
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.getUser() != null;
  }
  register(name: string, email: string, password: string, role: string) {
    const newUser = { name, email, password, role };
    return this.http.post(this.baseUrl, newUser);
  }

}
