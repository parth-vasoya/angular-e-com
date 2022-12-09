import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../shared/model/product.model";
import {SharedService} from "../shared/services/shared.service";
import {RegisterUserResponse} from "../shared/model/user.model";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
  providers: [ProductService]
})
export class ViewProductComponent implements OnInit {

  product!: Product;
  productId: string = '';
  authUser!: RegisterUserResponse;
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(private productService: ProductService, private route: ActivatedRoute, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.authUser = this.sharedService.authUser;
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.productId = params.id;
        this.getProduct(params.id);
      }
    });
    this.sharedService.userSubject.subscribe((user) => {
      if (user.idToken) {
        this.authUser = user;
      }
    });
  }

  getProduct(productId: string) {
    this.productService.getProduct(productId).subscribe((res) => {
      console.log(res);
      this.product = res;
    })
  }

  addCart(quantity: string) {
    let cartArr = {
      userId: this.authUser.idToken,
      items: [
        {
          productId: this.productId,
          quantity: parseInt(quantity),
          name: this.product.name,
          price: this.product.price,
          stock: this.product.stock,
        }
      ]
    };

    const cartDetails = localStorage.getItem(this.authUser.idToken);
    if (cartDetails) {
      cartArr = JSON.parse(cartDetails);
      const cartItem = cartArr.items.find((item: any) => item.productId === this.productId);
      if (cartItem) {
        cartItem.quantity = parseInt(quantity);
      } else {
        cartArr.items.push({
          productId: this.productId,
          quantity: parseInt(quantity),
          name: this.product.name,
          price: this.product.price,
          stock: this.product.stock,
        });
      }
    }
    localStorage.setItem(this.authUser.idToken, JSON.stringify(cartArr));
    this.sharedService.dialogSubject.next({message: 'Item added to cart successfully!'});
  }
}
