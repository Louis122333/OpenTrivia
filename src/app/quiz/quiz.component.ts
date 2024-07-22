import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TriviaService } from '../services/trivia.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  shuffledAnswers: string[] = [];
  timer: number = 15;
  interval: any;
  score: number = 0;
  selectedAnswer: string = '';
  feedbackDelay: number = 5000; 
  isQuizFinished: boolean = false; 
  totalQuestions: number = 0; 
  buttonsDisabled: boolean = false; 
  showAnswers: boolean = false; 
  feedbackMessage: string = '';

  constructor(
    private triviaService: TriviaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const { amount, difficulty, category } = params;
      this.triviaService.getQuestions(amount, category, difficulty).subscribe((data) => {
        this.questions = data.results;
        this.totalQuestions = this.questions.length;
        this.nextQuestion();
      });
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  nextQuestion() {
    this.selectedAnswer = '';
    this.buttonsDisabled = false;
    this.showAnswers = false;
    this.feedbackMessage = '';
    if (this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.shuffledAnswers = this.shuffleAnswers([...currentQuestion.incorrect_answers, currentQuestion.correct_answer]);
      this.startTimer();
    } else {
      clearInterval(this.interval);
      this.isQuizFinished = true;
    }
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.buttonsDisabled = true;
    this.showAnswers = true;
    if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
      this.score++;
      this.feedbackMessage = 'Correct! ';
    } else {
      this.feedbackMessage = 'Oops, incorrect! ';
    }

    if (this.currentQuestionIndex === this.totalQuestions - 1) {
      this.feedbackMessage += 'Loading final score...';
    } else {
      this.feedbackMessage += 'Loading next question...';
    }

    this.stopTimer();
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.nextQuestion();
    }, this.feedbackDelay); 
  }

  startTimer() {
    this.stopTimer();
    this.timer = 15;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.currentQuestionIndex++;
        this.nextQuestion();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  shuffleAnswers(answers: string[]): string[] {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }

  isCorrect(answer: string): boolean {
    return answer === this.questions[this.currentQuestionIndex].correct_answer;
  }

  isIncorrect(answer: string): boolean {
    return this.selectedAnswer === answer && answer !== this.questions[this.currentQuestionIndex].correct_answer;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.isQuizFinished = false;
    this.nextQuestion();
  }

  quitQuiz() {
    this.router.navigate(['/menu']);
  }

  percentageCorrect(): number {
    return Math.round((this.score / this.totalQuestions) * 100);
  }

  getTitle(): string {
    const percentage = this.percentageCorrect();
    if (percentage === 100) {
      return 'Possible Cheater';
    } else if (percentage >= 90) {
      return 'Touch Grass';
    } else if (percentage >= 76) {
      return 'Scholar';
    } else if (percentage >= 51) {
      return 'A for Effort';
    } else if (percentage >= 26) {
      return 'Rookie';
    } else {
      return 'AFK';
    }
  }
}