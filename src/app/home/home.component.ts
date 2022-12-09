import { Component, OnInit } from '@angular/core';
import {Product} from "../shared/model/product.model";
import {ProductService} from "../shared/services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductService]
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  searchText: string = '';
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }
}
