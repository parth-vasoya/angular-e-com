import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SharedService} from "./shared/services/shared.service";
import {DialogComponent} from "./dialog/dialog.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DialogData} from "./shared/model/dialog.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'e-commerce';
  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;
  errorSubscription: Subscription = new Subscription();

  constructor(private sharedService: SharedService, private cfr: ComponentFactoryResolver, private router: Router) {
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.sharedService.userSubject.next(JSON.parse(userData));
    }

    this.errorSubscription = this.sharedService.dialogSubject.subscribe((data: DialogData) => {
      if (data) {
        const componentFac = this.cfr.resolveComponentFactory(DialogComponent);
        const componentRef = this.container.createComponent(componentFac);
        componentRef.instance.message = data.message;
        componentRef.instance.onClose.subscribe((res) => {
          this.container.clear();
          if (data.redirectTo) {
            this.router.navigate([data.redirectTo]);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
