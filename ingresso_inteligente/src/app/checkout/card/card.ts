import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card-box">
      <h2 class="titulo">{{ title }}</h2>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card-box {
      background-color: var(--card-bg-color, #ffffff);
      border: 2px solid var(--card-border-color, #ddd);
      
      padding: 20px;
      border-radius: 12px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .titulo {
      color: var(--card-title-color, #333);
      margin-top: 0;
    }
  `]
})
export class CardComponent {
  @Input() title: string = '';
}