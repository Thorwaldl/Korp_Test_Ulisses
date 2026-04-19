import { Routes } from '@angular/router';
import { EntryComponent } from './pages/Entry/Entry.component';
import { ProductsComponent } from './pages/products/products.component';
import { InvoicesComponent } from './pages/Invoices/invoices.component';

export const routes: Routes = [
  { path: '', redirectTo: 'entrada', pathMatch: 'full' },
  { path: 'entrada', component: EntryComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'notas', component: InvoicesComponent },
];