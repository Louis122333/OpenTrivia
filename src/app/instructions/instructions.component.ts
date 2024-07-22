import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/menu']);
  }
}