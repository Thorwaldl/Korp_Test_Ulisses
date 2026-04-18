import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InvoiceItem {
    produtoId: number;
    quantidade: number;
}

export interface Invoice {
    id?: number;
    numero: number;
    status: string;
    itens: InvoiceItem[];
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService 
{

    private api = 'http://localhost:5103/api/invoices';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(this.api);
    }

    create(): Observable<Invoice> {
        return this.http.post<Invoice>(this.api, {});
    }

    addItem(invoiceId: number, item: InvoiceItem) {
        return this.http.post(`${this.api}/${invoiceId}/items`, item);
    }

    print(invoiceId: number) {
        return this.http.post(`${this.api}/${invoiceId}/print`, {});
    }
}