import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-results',
   imports: [CommonModule, FormsModule],
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.css']
})
export class AdminResultsComponent implements OnInit {
  results: any[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    this.resultService.getAllResults().subscribe(data => {
      this.results = data;
    });
  }
}
