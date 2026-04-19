import { Component } from '@angular/core';
//import { ProductsComponent } from './components/products/products.component';
//import { InvoicesComponent } from './components/invoices/invoices.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  //title = 'KorpTest';
}
