import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      let userDetails = JSON.parse(user);
      if (userDetails.role == "admin") {
        return  true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
