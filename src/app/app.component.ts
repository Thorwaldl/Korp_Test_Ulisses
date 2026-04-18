import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { InvoicesComponent } from './components/invoices/invoices.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent, InvoicesComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  //title = 'KorpTest';
}
