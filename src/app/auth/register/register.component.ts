import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterUser} from "../../shared/model/user.model";
import {AuthService} from "../../shared/services/auth.service";
import {map, mergeMap} from "rxjs/operators";
import {UserService} from "../../shared/services/user.service";
import {ConfirmPwd, DateValidator} from "../../shared/validator/custom.validator";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/services/shared.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  constructor(private authService: AuthService, private userService: UserService, private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver, private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^0-9]+$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, [Validators.required, DateValidator]),
      passwordValidation: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('^[^&\\\\;<>]*[^a-zA-Z0-9&\\\\;<>][^&\\\\;<>]*$')]),
        confirm_password: new FormControl(null),
      }, {
        validators: ConfirmPwd
      })
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    console.log(this.registerForm);
    const userData: RegisterUser = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwordValidation.password,
      returnSecureToken: true
    };
    this.authService.register(userData).pipe(
      map(res => {
        return {
          name: this.registerForm.value.name,
          email: this.registerForm.value.email,
          dob: this.registerForm.value.dob,
          password: this.registerForm.value.passwordValidation.password,
          role: 'member',
          idToken: res.idToken,
          localId: res.localId,
        };
      }),
      mergeMap((user) => this.userService.registerUser(user))
    ).subscribe(res => {
      if (res) {
        this.sharedService.dialogSubject.next({message: 'Registration successfully', redirectTo: '/login'});
      }
      // const componentFac = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
      // const componentRef = this.container.createComponent(componentFac);
      // componentRef.instance.message = 'Registration successfully';
      // componentRef.instance.onClose.subscribe(res => {
      //   this.container.clear();
      //   this.router.navigate(['/login']);
      // });
    }, (error) => {
      console.log(error.error.error.message);
    });
  }
}
