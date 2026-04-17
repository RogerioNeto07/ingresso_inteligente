import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout'; 
import { CardComponent } from './checkout/card/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheckoutComponent, CardComponent],
  templateUrl: './app.component.html',
  styles: [] 
})
export class AppComponent {
  title = 'ingresso-inteligente';
}