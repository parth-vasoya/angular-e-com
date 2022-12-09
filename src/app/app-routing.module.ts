import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ProductComponent} from "./product/product.component";
import {UserComponent} from "./user/user.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {HomeComponent} from "./home/home.component";
import {ViewProductComponent} from "./view-product/view-product.component";
import {CartComponent} from "./cart/cart.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrdersComponent} from "./orders/orders.component";
import {AuthGuard} from "./shared/guard/auth-guard";
import {GuestGuard} from "./shared/guard/guest-guard";
import {AdminGuard} from "./shared/guard/admin-guard";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: UserProfileComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate:[AuthGuard]},
  {path: 'orders/:id', component: OrderDetailComponent, canActivate:[AuthGuard]},
  {path: 'products', component: ProductComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'products/add', component: AddProductComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'products/edit/:id', component: AddProductComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'product/:id', component: ViewProductComponent},
  {path: 'users', component: UserComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'users/add', component: AddUserComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'users/edit/:id', component: AddUserComponent, canActivate:[AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
