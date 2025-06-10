import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getExams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/exams`);
  }

  getQuestions(examId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/questions?examId=${examId}`);
  }
  submitResult(result: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/results`, result);
  }
  getResultsByUserAndExam(userId: string, examId: string | number) {
    return this.http.get<any[]>(`${this.baseUrl}/results?userId=${userId}&examId=${examId}`);
  }
  getResultsByUser(userId: string) {
    return this.http.get<any[]>(`${this.baseUrl}/results?userId=${userId}`);
  }
  getExamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/exams/${id}`);
  }

  createExam(exam: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/exams`, exam);
  }

  updateExam(exam: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/exams/${exam.id}`, exam);
  }

  deleteExam(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/exams/${id}`);
  }
  createQuestion(question: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/questions`, question);
  }

  updateQuestion(question: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/questions/${question.id}`, question);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/questions/${id}`);
  }

}
