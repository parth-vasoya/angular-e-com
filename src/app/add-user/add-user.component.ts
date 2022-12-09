import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {RegisterUser, RegisterUserResponse, User, UserPwdUpdateRequest} from "../shared/model/user.model";
import {map, mergeMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmPwd, DateValidator} from "../shared/validator/custom.validator";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  userId: string = '';
  roles = ['member', 'admin'];
  user!: User;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      this.userId = params.id;
      if (this.userId) {
        this.userForm.get('passwordValidation.password')?.clearValidators();
        this.userForm.get('passwordValidation.confirm_password')?.clearValidators();
        this.userForm.get('email')?.disable();
        this.getUser(this.userId);
      }
    });

  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]+$')]),
      email: new FormControl({
        value: null,
        disabled: this.userId ? true : false
      }, [Validators.required, Validators.email]),
      dob: new FormControl(null, [Validators.required, DateValidator]),
      passwordValidation: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[^&\\\\;<>]*[^a-zA-Z0-9&\\\\;<>][^&\\\\;<>]*$')]),
        confirm_password: new FormControl(null),
      }, {
        validators: ConfirmPwd
      }),
      role: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.userForm.controls;
  }

  addUser() {
    console.log(this.userForm, this.userForm.valid);
    const userData: RegisterUser = {
      email: this.userForm.value.email,
      password: this.userForm.value.passwordValidation.password,
      returnSecureToken: true
    };
    this.authService.register(userData).pipe(
      map(res => {
        return {
          name: this.userForm.value.name,
          email: this.userForm.value.email,
          dob: this.userForm.value.dob,
          password: this.userForm.value.passwordValidation.password,
          role: this.userForm.value.role,
          idToken: res.idToken,
          localId: res.localId,
        };
      }),
      mergeMap((user) => this.userService.registerUser(user))
    ).subscribe(res => {
      console.log(res);
      this.router.navigate(['/users']);
    }, ({error}) => {
      console.log(error);
    });
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe((res) => {
      this.user = res;
      const {name, email, role, dob} = this.user;
      this.userForm.patchValue({
        name, email, role, dob
      });
    });
  }

  updateUser() {
    console.log(this.userForm, this.userForm.valid);
    const userData: User = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      dob: this.userForm.value.dob,
      password: this.user.password,
      role: this.userForm.value.role,
      idToken: this.user.idToken,
      localId: this.user.localId,
    };
    this.userService.updateUser(userData, this.userId).subscribe(res => {
      if (res) {
        this.router.navigate(['/users']);
      }
    });
  }

  updateUserOld() {
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
          email: this.userForm.value.email,
          dob: this.userForm.value.dob,
          password: this.userForm.value.passwordValidation.password,
          role: this.userForm.value.role,
          idToken: res.idToken,
          localId: res.localId,
        };
      }),
      mergeMap((user) => this.userService.updateUser(user, this.userId!))
    ).subscribe(res => {
      console.log(res)
      this.router.navigate(['/users']);
    });
  }
}
