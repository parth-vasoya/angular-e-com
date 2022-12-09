import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/model/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  productId: string = '';
  imagePath: string = '';
  percentage: number = 0;
  product!: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private afStorage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      this.productId = params.id;
      if (this.productId) {
        this.getProduct(this.productId);
      }
    });
  }

  initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      image: new FormControl(null),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      stock: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }

  get f() {
    return this.productForm.controls;
  }

  getProductFormValues() {
    const product: Product = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
      image: this.imagePath ? this.imagePath : this.product.image,
    };
    return product;
  }

  addProduct() {
    this.productService.addProduct(this.getProductFormValues()).subscribe((res) => {
      if (res) {
        this.router.navigate(['/products']);
      }
    });
  }

  uploadImg(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    let ref = this.afStorage.ref(randomId);
    let task = ref.put(event.target.files[0]);
    task.snapshotChanges()
      .pipe(finalize(() => {
        ref.getDownloadURL().subscribe(downloadURL => {
          console.log('downloadURL', downloadURL);
          this.imagePath = downloadURL;
        })
      }))
      .subscribe((res) => console.log(res));

    task.percentageChanges().subscribe((percentage) => {
      this.percentage = Math.round(percentage ? percentage : 0);
    })
    // this.afs.upload('/products', event.target.files[0]);
  }

  getProduct(productId: string) {
    this.productService.getProduct(productId).subscribe((product) => {
      this.product = product;
      const {name, description, stock, price} = this.product;
      this.productForm.patchValue({
        name,
        description,
        stock,
        price
      })
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.getProductFormValues(), this.productId).subscribe(res => {
      if (res) {
        this.router.navigate(['/products']);
      }
    });
  }
}
