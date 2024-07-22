import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TriviaService } from '../services/trivia.service';

@Component({
  selector: 'app-game-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {
  settings = {
    amount: 10,
    difficulty: 'Mixed',
    category: 'all'
  };
  questionAmounts = [10, 25, 50];
  difficulties = ['Mixed', 'Easy', 'Medium', 'Hard'];
  categories: any[] = [];

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit() {
    this.triviaService.getCategories().subscribe((data: any) => {
      this.categories = [{id: 'all', name: 'All'}, ...data.trivia_categories];
    });
  }

  startQuiz() {
    const queryParams: any = { amount: this.settings.amount };

    if (this.settings.difficulty !== 'Mixed') {
      queryParams.difficulty = this.settings.difficulty.toLowerCase();
    }

    if (this.settings.category !== 'all') {
      queryParams.category = this.settings.category;
    }

    this.router.navigate(['/quiz'], { queryParams });
  }
}