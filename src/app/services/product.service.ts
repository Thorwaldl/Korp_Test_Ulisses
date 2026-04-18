import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
    id?: number;
    codigo: string;
    descricao: string;
    saldo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private api = 'http://localhost:5043/api/products';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Product[]> {
        return this.http.get<Product[]>(this.api);
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.api, product);
    }
}