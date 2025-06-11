import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }

  setUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    if (this.currentUser) return this.currentUser;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    return this.currentUser;
  }

  logout(): void {
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
  getUsers() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
