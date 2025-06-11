import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-view-results',
  imports: [CommonModule],
  templateUrl: './admin-view-results.component.html',
  styleUrl: './admin-view-results.component.css'
})
export class AdminViewResultsComponent implements OnInit {
  results: any[] = [];
  exams: any[] = [];
  users: any[] = [];

  constructor(private examService: ExamService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.examService.getAllResults().subscribe(data => {
      this.results = data;
    });

    this.examService.getExams().subscribe(data => {
      this.exams = data;
    });

    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  getExamTitle(examId: number | string): string {
    const exam = this.exams.find(e => e.id == examId);
    return exam ? exam.title : 'Unknown';
  }

  getStudentName(userId: string): string {
    const user = this.users.find(u => u.id == userId);
    return user ? user.name : 'Unknown';
  }
  getResultsForExam(examId: string | number): any[] {
    return this.results.filter(r => r.examId == examId);
  }

}
