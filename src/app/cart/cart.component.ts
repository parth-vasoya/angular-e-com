import {Component, OnInit} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {Router} from "@angular/router";
import {SharedService} from "../shared/services/shared.service";
import {RegisterUserResponse} from "../shared/model/user.model";
import {OrderResponse} from "../shared/model/order.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [OrderService]
})
export class CartComponent implements OnInit {

  cart!: OrderResponse;
  total: number = 0;
  authUser!: RegisterUserResponse;

  constructor(private orderService: OrderService, private router: Router, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.authUser = this.sharedService.authUser;
    this.getCartProducts();
  }

  getCartProducts() {
    const cartArr = localStorage.getItem(this.authUser.idToken);
    if (cartArr) {
      this.cart = JSON.parse(cartArr);
      this.calculateTotal();
    }
  }

  quantityUpdate(quantity: string, productId: string) {
    const cartItem = this.cart.items.find((o: any) => o.productId === productId);
    if (cartItem) {
      cartItem.quantity = parseInt(quantity);
    }
    localStorage.setItem(this.authUser.idToken, JSON.stringify(this.cart));
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.cart.items.map((item: any) => {
      this.total += (parseInt(item.quantity) * parseInt(item.price));
    })
  }

  deleteItem(index: number) {
    console.log(index, this.cart.items);
    this.cart.items.splice(index, 1);
    localStorage.setItem(this.authUser.idToken, JSON.stringify(this.cart));
    this.getCartProducts();
  }

  placeOrder() {
    const orderData: OrderResponse = {
      ...this.cart,
      total: this.total
    };
    this.orderService.addOrder(orderData).subscribe((res) => {
      if (res) {
        localStorage.removeItem(this.authUser.idToken);
        this.router.navigate(['/orders', res.name]);
      }
    })
  }
}
