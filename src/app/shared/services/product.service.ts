import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class ProductService {
  dbUrl = environment.firebase.databaseURL;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dbUrl + '/products.json')
      .pipe(map((productsRes: any) => {
          const productArr: Array<Product> = [];
          for (const key in productsRes) {
            productsRes[key]['id'] = key;
            productArr.push(productsRes[key]);
          }
          return productArr;
        })
      );
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(this.dbUrl + '/products/' + productId + '.json');
  }

  addProduct(productData: Product): Observable<any> {
    return this.http.post(this.dbUrl + '/products.json', productData);
  }

  updateProduct(productData: Product, productId: string): Observable<Product> {
    return this.http.patch<Product>(this.dbUrl + '/products/' + productId + '.json', productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(this.dbUrl + '/products/' + productId + '.json');
  }
}
