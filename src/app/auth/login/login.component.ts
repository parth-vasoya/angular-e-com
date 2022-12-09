import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {RegisterUser, User} from "../../shared/model/user.model";
import {Router} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../../shared/services/user.service";
import {SharedService} from "../../shared/services/shared.service";
import {idToken} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private sharedService: SharedService) {
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user);
    const user: RegisterUser = {...this.user, returnSecureToken: true};
    this.authService.login(user).subscribe((res) => {
      if (res) {
        let userDetails: User;
        this.userService.getUserByLocalId(res.localId).on('value', (data: any) => {
          data.forEach((child: any) => {
            console.log(child, child.key, child.val());
            userDetails = child.val();
            res.role = userDetails.role;
            res.id = child.key;
          });

          this.userService.updateUser({...userDetails, idToken: res.idToken}, res.id!).subscribe((res) => console.log('success'));
          localStorage.setItem('user', JSON.stringify(res));
          this.sharedService.userSubject.next(res);
          this.router.navigate(['/home']);
        });
      }
    }, ({error}) => {
      console.log(error)
      // alert(error.error.message);
    });
  }
}
