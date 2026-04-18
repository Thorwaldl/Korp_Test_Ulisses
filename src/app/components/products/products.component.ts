
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading = false;
  error = '';
  success = '';

  newProduct: Product = {
    codigo: '',
    descricao: '',
    saldo: 0
  };

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (res) => this.products = res,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  create() {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.service.create(this.newProduct).subscribe({
      next: () => {
        this.load();
        this.newProduct = { codigo: '', descricao: '', saldo: 0 };
        this.success = 'Produto criado com sucesso!';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao criar produto';
        this.loading = false;
      }
    });
  }
}