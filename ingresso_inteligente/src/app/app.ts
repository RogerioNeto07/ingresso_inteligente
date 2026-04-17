import { Component } from '@angular/core';
import { CheckoutComponent } from './checkout/checkout'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CheckoutComponent],
  templateUrl: './app.component.html',
  styles: [] 
})
export class AppComponent {
  title = 'ingresso-inteligente';
}