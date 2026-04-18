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
        <input #cupomInput type="text" 
               (keydown.enter)="handleCoupon(cupomInput)" 
               placeholder="Digite ANGULAR10 e Enter">
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
  discountApplied = output<number>();

  increment() {
    this.quantity.update(val => val + 1);
  }

  decrement() {
    if (this.quantity() > 1) {
      this.quantity.update(val => val - 1);
    }
  }

  handleCoupon(inputElement: HTMLInputElement) {
    const cupom = inputElement.value.trim().toUpperCase();
    
    if (cupom === 'ANGULAR10') {
      this.discountApplied.emit(0.10);
      inputElement.value = '';
      alert('Cupom aplicado! 10% de desconto.');
    } else if (cupom !== '') {
      alert('Cupom inválido!');
    }
  }

  onCancelClick() {
    this.cancelRequested.emit();
  }
}