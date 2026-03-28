import { Component, signal, computed } from '@angular/core';
import { TicketItemComponent } from './ticket-item/ticket-item';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [TicketItemComponent],
  template: `
    <h1>Checkout - VIP Pass</h1>

    <app-ticket-item 
      eventName="Angular Conf 2026"
      [(quantity)]="qtd"
      (cancelRequested)="handleCancelRequest()" />

    <hr>

    <div class="summary">
      <p>Status: <strong>{{ mensagemStatus() }}</strong></p>
      <p>Quantidade selecionada: {{ qtd() }}</p>
      <h3>Total: R$ {{ totalValue() }}</h3>
    </div>
  `
})
export class CheckoutComponent {
  qtd = signal(1);
  mensagemStatus = signal('Aguardando finalização...');

  totalValue = computed(() => this.qtd() * 150);

  handleCancelRequest() {
    this.mensagemStatus.set("O usuário solicitou o cancelamento da compra!");
  }
}