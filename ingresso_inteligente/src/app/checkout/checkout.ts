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
  lotePercentual: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, ResumoPipe, CardComponent, TicketItemComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  ingressos = signal<Ingresso[]>([]);
  percentualDesconto = signal(0);

  totalValue = computed(() => {
    const bruto = this.ingressos().reduce((acc, curr) => acc + curr.preco, 0);
    return bruto * (1 - this.percentualDesconto());
  });

  temBrinde = computed(() => this.ingressos().length > 2);

  aplicarDesconto(valor: number) {
    this.percentualDesconto.set(valor);
  }

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
    const tipos: ('VIP' | 'STANDARD' | 'MEIA')[] = ['VIP', 'STANDARD', 'MEIA'];
    const descricoes = {
      'VIP': 'Acesso ao lounge exclusivo, buffet liberado e workshop frontal com palestrantes.',
      'STANDARD': 'Acesso às palestras principais, área de networking e kit básico do evento.',
      'MEIA': 'Entrada para estudantes e professores no workshop prático de Angular Signals.'
    };

    const tipoSorteado = tipos[Math.floor(Math.random() * tipos.length)];
    const precoBase = tipoSorteado === 'VIP' ? 500 : (tipoSorteado === 'MEIA' ? 125 : 250);

    const novo: Ingresso = {
      id: Date.now() + Math.random(),
      nome: `Ingresso ${tipoSorteado} #${this.ingressos().length + 1}`,
      tipo: tipoSorteado,
      data: new Date(2026, 2, 28 + this.ingressos().length),
      preco: precoBase,
      descricao: descricoes[tipoSorteado],
      lotePercentual: Math.floor(Math.random() * 100)
    };

    this.ingressos.update(lista => [...lista, novo]);
  }

  remover(id: number) {
    this.ingressos.update(lista => lista.filter(item => item.id !== id));
  }
}