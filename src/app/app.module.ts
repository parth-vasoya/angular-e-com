import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { RangePipe } from './shared/range.pipe';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { DialogComponent } from './dialog/dialog.component';
import {ErrorHandlerInterceptor} from "./shared/services/error-handler.interceptor.service";
import { FilterPipe } from './shared/filter.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    ProductComponent,
    AddProductComponent,
    AddUserComponent,
    UserComponent,
    HomeComponent,
    ViewProductComponent,
    RangePipe,
    CartComponent,
    OrdersComponent,
    OrderDetailComponent,
    DialogComponent,
    FilterPipe,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent]
})
export class AppModule { }
