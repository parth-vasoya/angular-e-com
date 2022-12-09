import {Component, OnInit} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {OrderResponse} from "../shared/model/order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrderService]
})
export class OrdersComponent implements OnInit {

  orders: OrderResponse[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }
}
