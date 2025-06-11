import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Question } from '../../models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manage-questions',
  standalone: true,
   imports: [CommonModule, FormsModule],
   templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {
  examId!: number;
  questions: Question[] = [];
  selectedQuestion: Question | null = null;

  form = {
    question: '',
    options: ['', '', '', ''],
    answer: ''
  };
formRef: any;

  constructor(private route: ActivatedRoute, private examService: ExamService) {}

  ngOnInit(): void {
    this.examId = +this.route.snapshot.paramMap.get('examId')!;
    console.log('Exam ID:', this.examId);  // 👈 Add this
    this.loadQuestions();
  }


  loadQuestions(): void {
    this.examService.getQuestions(this.examId).subscribe(data => this.questions = data);
  }

  saveQuestion(): void {
    if (this.selectedQuestion) {
      // Edit
      const updated = {
        ...this.selectedQuestion,
        ...this.form
      };
      this.examService.updateQuestion(updated).subscribe(() => {
        this.loadQuestions();
        this.resetForm();
      });
    } else {
      // Add
      const newQuestion = {
        examId: this.examId,
        ...this.form
      };
      this.examService.createQuestion(newQuestion).subscribe(() => {
        this.loadQuestions();
        this.resetForm();
      });
    }
  }

  editQuestion(q: Question): void {
    this.selectedQuestion = q;
    this.form = {
      question: q.question,
      options: [...q.options],
      answer: q.answer
    };
  }

  deleteQuestion(id: string): void {
  if (confirm('Are you sure you want to delete this question?')) {
    this.examService.deleteQuestion(id).subscribe(() => this.loadQuestions());
  }
}

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.form = {
      question: '',
      options: ['', '', '', ''],
      answer: ''
    };
    this.selectedQuestion = null;
  }
}
