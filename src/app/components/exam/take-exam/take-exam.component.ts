import { AuthService } from './../../../services/auth.service';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { FormsModule } from '@angular/forms';
import { Question } from '../../../models/question.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-take-exam',
  imports: [FormsModule, CommonModule],
  templateUrl: './take-exam.component.html',
  styleUrl: './take-exam.component.css'
})
export class TakeExamComponent implements OnInit {
  questions: Question[] = [];
  answers: { [key: string]: string } = {};
  examId!: number;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.examService.getQuestions(this.examId).subscribe({
      next: (data) => {
        this.questions = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load questions. Please try again later.';
        this.isLoading = false;
        console.error('Error loading questions:', err);
      }
    });
  }

  submitExam(): void {
    const correct = this.questions.filter(q => this.answers[q.id] === q.answer).length;
    const score = Math.round((correct / this.questions.length) * 100);

    const user = this.authService.getUser(); // ✅ Get the full user object
    if (!user) {
      this.errorMessage = 'User not found. Please log in again.';
      return;
    }

    const userId = user.id;

    this.examService.getResultsByUserAndExam(userId, this.examId).subscribe(existingResults => {
      if (existingResults.length > 0) {
        this.errorMessage = 'You have already taken this exam.';
        return;
      }

      const result = {
        id: Date.now(),
        userId,
        examId: this.examId.toString(),
        score,
        total: this.questions.length,
        date: new Date().toISOString()
      };

      this.examService.submitResult(result).subscribe({
        next: () => {
          this.router.navigate(['/view-results'], {
            state: {
              score: correct,
              total: this.questions.length,
              examId: this.examId
            }
          });
        },
        error: () => {
          this.errorMessage = 'Failed to submit exam. Try again.';
        }
      });
    });
  }
}
