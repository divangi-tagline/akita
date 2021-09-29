import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionQuery } from 'src/app/session/state/session.query';
import { Product } from '../state/product.model';
import { ProductQuery } from '../state/product.query';
import { ProductService } from '../state/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  username$: Observable<string>;
  products$: Observable<Product[]>;

  constructor(
    private sessionQuery: SessionQuery,
    private productQuery: ProductQuery,
    private productService: ProductService
  ) {
    this.username$ = this.sessionQuery.selectUserName();
    this.products$ = this.productQuery.selectAll();
    this.getProducts();
  }

  ngOnInit(): void {}

  getProducts(): void {
    this.productService.get();
  }

  addProduct() {
    const product: Product = {
      title: 'test product',
      price: 13.5,
      description: 'lorem ipsum set',
      category: 'electronic',
    };
    this.productService.add(product);
  }
}
