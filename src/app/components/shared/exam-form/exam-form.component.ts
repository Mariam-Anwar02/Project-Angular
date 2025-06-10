import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-form',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './exam-form.component.html',
  styleUrl: './exam-form.component.css'
})
export class ExamFormComponent implements OnInit {
  examForm: FormGroup;
  isEdit = false;
  examId: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.examForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.examId;

    if (this.isEdit && this.examId) {
      this.loadExam(this.examId);
    }
  }

  loadExam(id: string): void {
    this.isLoading = true;
    this.examService.getExamById(id).subscribe({
      next: (exam) => {
        this.examForm.patchValue({
          title: exam.title,
          description: exam.description
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading exam:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.examForm.invalid) return;

    const examData = {
      ...this.examForm.value,
      id: this.isEdit ? this.examId : Date.now().toString()
    };

    const request = this.isEdit
      ? this.examService.updateExam(examData)
      : this.examService.createExam(examData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.error('Error saving exam:', err);
      }
    });
  }
}
