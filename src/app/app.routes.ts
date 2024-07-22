import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { InstructionsComponent } from './instructions/instructions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'settings', component: GameSettingsComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'instructions', component: InstructionsComponent },
];