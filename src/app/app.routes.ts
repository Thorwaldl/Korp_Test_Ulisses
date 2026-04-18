import { Routes } from '@angular/router';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { NotasComponent } from './pages/notas/notas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'entrada', pathMatch: 'full' },
  { path: 'entrada', component: EntradaComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'notas', component: NotasComponent },
];