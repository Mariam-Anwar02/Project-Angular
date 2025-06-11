import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:3000/results'; // Change if needed

  constructor(private http: HttpClient) {}

  // Get all student results (for admin)
  getAllResults(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get results by user ID (for student view, optional)
  getResultsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  // Save a new result (called after submitting an exam)
  saveResult(result: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, result);
  }
}
