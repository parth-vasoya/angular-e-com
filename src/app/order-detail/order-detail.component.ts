import {Component, OnInit} from '@angular/core';
import {OrderService} from "../shared/services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderResponse} from "../shared/model/order.model";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderService]
})
export class OrderDetailComponent implements OnInit {

  order!: OrderResponse;
  orderId: string = '';

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.getOrder(params.id);
      }
    });
  }

  getOrder(orderId: string) {
    this.orderService.getOrder(orderId).subscribe((res) => {
      this.order = res;
    });
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.orderId).subscribe((res) => {
      this.router.navigate(['/orders']);
    });
  }
}
