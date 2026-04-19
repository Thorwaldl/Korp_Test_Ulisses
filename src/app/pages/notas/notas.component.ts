import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService, Invoice } from '../../services/invoice.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule
  ],
  templateUrl: './notas.component.html'
})
export class NotasComponent implements OnInit {

  invoices: Invoice[] = [];
  loading = false;
  error = '';
  success = '';

  newItem: { [key: number]: { produtoId: number; quantidade: number } } = {};

  constructor(private service: InvoiceService) {}

  ngOnInit(): void {
    this.load();
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

  getItem(invoiceId: number) {
    if (!this.newItem[invoiceId]) {
      this.newItem[invoiceId] = { produtoId: 0, quantidade: 0 };
    }
    return this.newItem[invoiceId];
  }
  
  create() {
    this.loading = true;
    this.error = '';

    this.service.create().subscribe({
      next: () => {
        this.load();
        this.success = 'Nota criada!';
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao criar nota';
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
      this.success = 'Nota impressa com sucesso!';
      this.loading = false;
    },
    error: (err) => {
      console.log(err);

      const backendMessage =
        typeof err?.error === 'string'
          ? err.error
          : err?.error?.message || '';

      if (backendMessage.includes('Erro ao atualizar estoque do produto')) {
        this.error = 'Estoque insuficiente para um dos produtos';
      } else if (err?.status === 500) {
        this.error = 'Erro no servidor (estoque pode estar fora do ar)';
      } else if (err?.status === 0) {
        this.error = 'Não foi possível conectar ao backend';
      } else if (backendMessage.includes('Apenas notas abertas podem ser impressas')) {
        this.error = 'Nota já impressa';
      } else {
        this.error = 'Erro inesperado';
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
        this.success = 'Item adicionado!';
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao adicionar item';
        this.loading = false;
      }
    });
  }
}