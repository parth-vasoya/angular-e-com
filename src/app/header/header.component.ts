import {Component, OnInit} from '@angular/core';
import {SharedService} from "../shared/services/shared.service";
import {RegisterUserResponse} from "../shared/model/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  authUser!: RegisterUserResponse;

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.authUser = this.sharedService.authUser;
    this.sharedService.userSubject.subscribe((user) => {
      this.authUser = user;
    })
  }

}
