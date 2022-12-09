import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {User} from "../shared/model/user.model";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .pipe(
        map(usersRes => {
          const userArr: Array<User> = [];
          for (const key in usersRes) {
            usersRes[key]['id'] = key;
            userArr.push(usersRes[key]);
          }
          return userArr;
        })
      ).subscribe((response) => {
      this.users = response;
    });
  }

  deleteUser(userId: string) {
    if (userId) {
      this.userService.deleteUser(userId).subscribe((res) => {
        if (res) {
          this.getUsers();
        }
      });
    }
  }
}
