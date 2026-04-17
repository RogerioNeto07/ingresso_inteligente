import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card-container">
      @if (title()) {
        <h2 class="card-title">{{ title() }}</h2>
      }
      
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid #eee;
    }

    .card-title {
      margin-top: 0;
      color: var(--gray-900);
      border-bottom: 2px solid var(--bright-blue);
      display: inline-block;
      padding-bottom: 5px;
      margin-bottom: 15px;
    }

    .card-content {
      color: var(--gray-700);
    }
  `]
})
export class CardComponent {
  title = input<string>('');
}