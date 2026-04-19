import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../../services/invoice.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  template: `
    <mat-card>

      <!-- Cabeçalho -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong>Nº {{ invoice.numero }}</strong> -

          <span [ngStyle]="{
            color: invoice.status === 'ABERTA' ? 'orange' : 'green',
            fontWeight: 'bold'
          }">
            {{ invoice.status }}
          </span>
        </div>

        <button mat-button color="accent"
                (click)="onPrint.emit(invoice.id!)"
                [disabled]="loading">
          Imprimir
        </button>
      </div>

      <!-- Conteúdo externo -->
      <ng-content></ng-content>



    </mat-card>
  `
})
export class InvoiceCardComponent {
  @Input() invoice!: Invoice;
  @Input() loading!: boolean;

  @Output() onPrint = new EventEmitter<number>();
}