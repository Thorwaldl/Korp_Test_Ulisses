import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InvoiceService, Invoice } from '../../services/invoice.service';
import { ProductService, Product } from '../../services/product.service';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { InvoiceCardComponent } from './invoice-card/invoice-card.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    InvoiceCardComponent,
    MatSnackBarModule
  ],
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[] = [];
  products: Product[] = [];

  loading = false;
  error = '';
  success = '';

  newItem: { [key: number]: { produtoId: number; quantidade: number } } = {};

constructor(
  private service: InvoiceService,
  private productService: ProductService,
  private snackBar: MatSnackBar
) {}

  ngOnInit(): void {
    this.load();

    this.productService.getAll().subscribe(res => {
      this.products = res;
    });
  }

  load() {
    this.service.getAll().subscribe(res => {
      this.invoices = res;

      this.invoices.forEach(i => {
        if (!this.newItem[i.id!]) {
          this.newItem[i.id!] = { produtoId: 0, quantidade: 0 };
        }
      });
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      panelClass: ['snackbar-error']
    });
  }
  
  getItem(invoiceId: number) {
    if (!this.newItem[invoiceId]) {
      this.newItem[invoiceId] = { produtoId: 0, quantidade: 0 };
    }
    return this.newItem[invoiceId];
  }

  getProductName(id: number): string {
    return this.products.find(p => p.id === id)?.descricao || 'Desconhecido';
  }

  create() {
    this.loading = true;
    this.error = '';

    this.service.create().subscribe({
      next: () => {
        this.load();
        this.showSuccess('Nota criada!');
        this.loading = false;
      },
      error: () => {
        this.showError('Erro ao criar nota');
        this.loading = false;
      }
    });
  }

  print(id: number) {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.service.print(id).subscribe({
      next: () => {
        this.load();
        this.showSuccess('Nota impressa com sucesso!'); 
        this.loading = false;
      },
      error: (err) => {
        const backendMessage =
          typeof err?.error === 'string'
            ? err.error
            : err?.error?.message || '';

        if (backendMessage.includes('Erro ao atualizar estoque do produto')) {
          this.showError('Estoque insuficiente');
        } else if (backendMessage.includes('Apenas notas abertas podem ser impressas')) {
          this.showError('Nota já fechada');
        }else {
          this.showError('Erro ao imprimir');
        }

        this.loading = false;
      }
    });
  }

  addItem(invoiceId: number) {
    const item = this.getItem(invoiceId);

    this.loading = true;
    this.error = '';

    this.service.addItem(invoiceId, item).subscribe({
      next: () => {
        this.load();
        this.showSuccess('Item adicionado!');
        this.loading = false;
      },
      error: () => {
        this.showError('Erro ao adicionar item');
        this.loading = false;
      }
    });
  }
}