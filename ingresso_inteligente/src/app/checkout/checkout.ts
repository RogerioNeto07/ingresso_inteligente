import { Component, signal, computed } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { CardComponent } from './card/card';
import { ResumoPipe } from '../pipes/resumo-pipe';
import { TicketItemComponent } from './ticket-item/ticket-item';

interface Ingresso {
  id: number;
  nome: string;
  tipo: 'VIP' | 'STANDARD' | 'MEIA';
  data: Date;
  preco: number;
  descricao: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, ResumoPipe, CardComponent, TicketItemComponent],
  templateUrl: './checkout.html'
})
export class CheckoutComponent {
  ingressos = signal<Ingresso[]>([]); 

  ajustarQuantidade(novaQtd: number) {
    const qtdAtual = this.ingressos().length;

    if (novaQtd > qtdAtual) {
      this.adicionarIngresso();
    } else if (novaQtd < qtdAtual) {
      this.ingressos.update(lista => {
        const novaLista = [...lista];
        novaLista.pop(); 
        return novaLista;
      });
    }
  }

  adicionarIngresso() {
    const novo: Ingresso = {
      id: Date.now() + Math.random(),
      nome: `Ingresso #${this.ingressos().length + 1}`,
      tipo: 'STANDARD',
      data: new Date(),
      preco: 150,
      descricao: 'Acesso padrão adquirido via seletor rápido.'
    };
    this.ingressos.update(lista => [...lista, novo]);
  }

  remover(id: number) {
    this.ingressos.update(lista => lista.filter(item => item.id !== id));
  }

  totalValue = computed(() => this.ingressos().reduce((acc, curr) => acc + curr.preco, 0));
}