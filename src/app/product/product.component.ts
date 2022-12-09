import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/model/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      if (response) {
        this.products = response;
      }
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe((res) => console.log('delete'))
  }
}
