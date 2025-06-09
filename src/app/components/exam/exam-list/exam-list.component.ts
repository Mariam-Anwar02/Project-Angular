import { Component,  OnInit } from '@angular/core';
import { ExamService } from '../../../services/exam.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-exam-list',
  imports: [CommonModule],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent implements OnInit {
  exams: any[] = [];
  expandedDescriptions = new Map<number, boolean>();

  constructor(private examService: ExamService,private router: Router) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe((data) => {
      this.exams = data;
    });
  }

  toggleDescription(id: number): void {
    const current = this.expandedDescriptions.get(id) || false;
    this.expandedDescriptions.set(id, !current);
  }
  takeExam(examId: number) {
    this.router.navigate(['/take-exam', examId]);
  }
}
