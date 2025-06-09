import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ExamService } from '../../../services/exam.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-view-results',
  imports: [CommonModule],
  templateUrl: './view-results.component.html',
  styleUrl: './view-results.component.css'
})
export class ViewResultComponent implements OnInit {
  score: number = 0;
  total: number = 0;
  percentage: number = 0;
  examId: number = 0;
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const resultData = history.state;

    if (
      resultData &&
      resultData.score !== undefined &&
      resultData.total !== undefined &&
      resultData.examId !== undefined
    ) {
      this.score = resultData.score;
      this.total = resultData.total;
      this.examId = resultData.examId;
      this.percentage = Math.round((this.score / this.total) * 100);
    } else {
      this.errorMessage = 'Missing result information. Please retake the exam.';
    }
  }
  goBack(): void {
    this.router.navigate(['/exams']);  
  }
}
