import { Component, signal, computed } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { CardComponent } from './card/card';
import { ResumoPipe } from '../pipes/resumo-pipe';

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
  imports: [CommonModule, DatePipe, CurrencyPipe, ResumoPipe, CardComponent],
  templateUrl: './checkout.html'
})
export class CheckoutComponent {
  ingressos = signal<Ingresso[]>([
    {
      id: 1,
      nome: 'Angular Conf Day 1',
      tipo: 'VIP',
      data: new Date(2026, 2, 28),
      preco: 500,
      descricao: 'Acesso ao lounge exclusivo, buffet liberado e workshop frontal.'
    },
    {
      id: 2,
      nome: 'Angular Conf Day 2',
      tipo: 'STANDARD',
      data: new Date(2026, 2, 29),
      preco: 250,
      descricao: 'Acesso às palestras principais e área de networking.'
    },
    {
      id: 3,
      nome: 'Workshop Meia',
      tipo: 'MEIA',
      data: new Date(2026, 2, 30),
      preco: 125,
      descricao: 'Entrada para estudantes no workshop prático de Signals.'
    }
  ]);

  totalValue = computed(() => 
    this.ingressos().reduce((acc, curr) => acc + curr.preco, 0)
  );

  temBrinde = computed(() => this.ingressos().length > 2);
}