import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserPwdUpdateRequest} from "../shared/model/user.model";
import {UserService} from "../shared/services/user.service";
import {SharedService} from "../shared/services/shared.service";
import {Router} from "@angular/router";
import {ConfirmPwd, DateValidator} from "../shared/validator/custom.validator";
import {map, mergeMap} from "rxjs/operators";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm!: FormGroup;
  userId: string = '';
  user!: User;

  constructor(private userService: UserService, private sharedService: SharedService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.sharedService.authUser.id!;
    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]+$')]),
      email: new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
      dob: new FormControl(null, [Validators.required, DateValidator]),
      passwordValidation: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[^&\\\\;<>]*[^a-zA-Z0-9&\\\\;<>][^&\\\\;<>]*$')]),
        confirm_password: new FormControl(null),
      }, {
        validators: ConfirmPwd
      }),
      // role: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.userForm.controls;
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((res) => {
      this.user = res;
      const {name, email, dob} = this.user;
      this.userForm.patchValue({
        name, email, dob
      });
    });
  }

  updateUser() {
    console.log(this.userForm);
    const userData: UserPwdUpdateRequest = {
      idToken: this.user.idToken,
      password: this.userForm.value.passwordValidation.password,
      returnSecureToken: true
    };
    this.authService.updatePwd(userData).pipe(
      map(res => {
        return {
          name: this.userForm.value.name,
          email: this.user.email,
          dob: this.userForm.value.dob,
          password: this.userForm.value.passwordValidation.password,
          role: this.user.role,
          idToken: res.idToken,
          localId: res.localId,
        };
      }),
      mergeMap((user) => this.userService.updateUser(user, this.userId!))
    ).subscribe((res: User) => {
      if (res) {
        this.sharedService.dialogSubject.next({message: 'Profile updated successfully!'});
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.sharedService.userSubject.next({
      'idToken': '',
      'email': '',
      'refreshToken': '',
      'expiresIn': '',
      'localId': '',
    });
    this.router.navigate(['/login']);
  }
}
