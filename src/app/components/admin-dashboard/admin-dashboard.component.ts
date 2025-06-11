import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
    exams: any[] = [];

    constructor(private examService: ExamService, private router: Router) {}

    ngOnInit(): void {
      this.loadExams();
    }

    loadExams(): void {
      this.examService.getExams().subscribe(data => this.exams = data);
    }

    deleteExam(id: string): void {
      if (confirm('Delete this exam?')) {
        this.examService.deleteExam(id).subscribe(() => this.loadExams());
      }
    }

    editExam(id: string): void {
      this.router.navigate(['/admin-dashboard/edit-exam/', id]);
    }

    addExam(): void {
      this.router.navigate(['admin-dashboard/create-exam']);
    }
    manageQuestions(id: string): void {
  this.router.navigate(['/admin-dashboard/manage-questions', id]);
}
  }
