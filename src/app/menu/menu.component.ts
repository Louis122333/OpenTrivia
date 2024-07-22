import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) {}

  startNewGame() {
    this.router.navigate(['/settings']);
  }

  viewInstructions() {
    this.router.navigate(['/instructions']);
  }
}