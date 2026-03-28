import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-ticket-item',
  standalone: true,
  template: `
    <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
      <h3>Evento: {{ eventName() }}</h3>
      
      <div class="counter">
        <button (click)="decrement()">-</button>
        <span> Quantidade: {{ quantity() }} </span>
        <button (click)="increment()">+</button>
      </div>

      <div style="margin-top: 15px;">
        <label>Cupom de Desconto: </label>
        <input type="text" (keydown.enter)="handleCoupon($event)" placeholder="Digite e aperte Enter">
      </div>

      <button (click)="onCancelClick()" style="margin-top: 15px; color: red;">
        Solicitar Cancelamento
      </button>
    </div>
  `
})
export class TicketItemComponent {
  eventName = input.required<string>();

  quantity = model(1);

  cancelRequested = output<void>();

  increment() {
    this.quantity.update(val => val + 1);
  }

  decrement() {
    if (this.quantity() > 1) {
      this.quantity.update(val => val - 1);
    }
  }

  handleCoupon(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    alert(`Buscando cupom: [${inputElement.value}]`);
  }

  onCancelClick() {
    this.cancelRequested.emit();
  }
}