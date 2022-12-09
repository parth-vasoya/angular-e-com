import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {OrderResponse} from "../model/order.model";
import {SharedService} from "./shared.service";

@Injectable()
export class OrderService {
  dbUrl = environment.firebase.databaseURL;

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse>(this.dbUrl + '/orders.json')
      .pipe(
        map((res: any) => {
          const role = this.sharedService.authUser.role;
          const orderArr: Array<OrderResponse> = [];
          for (const key in res) {
            res[key]['id'] = key;
            if (role == 'admin' || res[key]['userId'] == this.sharedService.authUser.idToken) {
              orderArr.push(res[key]);
            }
          }
          return orderArr;
        })
      );
  }

  getOrder(orderId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(this.dbUrl + '/orders/' + orderId + '.json');
  }

  addOrder(orderData: OrderResponse): Observable<any> {
    return this.http.post(this.dbUrl + '/orders.json', orderData);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(this.dbUrl + '/orders/' + orderId + '.json');
  }

}
