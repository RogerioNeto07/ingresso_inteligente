import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CheckoutComponent],
  templateUrl: './app.component.html',
  styles: [] 
})
export class AppComponent {
  title = 'ingresso-inteligente';
}