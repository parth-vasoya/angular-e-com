import {Injectable} from "@angular/core";
import {RegisterUserResponse} from "../model/user.model";
import {Subject, BehaviorSubject} from "rxjs";
import {DialogData} from "../model/dialog.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userSubject: BehaviorSubject<RegisterUserResponse> = new BehaviorSubject<RegisterUserResponse>({
    'idToken': '',
    'email': '',
    'refreshToken': '',
    'expiresIn': '',
    'localId': '',
  });
  dialogSubject: Subject<DialogData> = new Subject<DialogData>();
  authUser!: RegisterUserResponse;

  constructor() {
    this.userSubject.subscribe((user: RegisterUserResponse) => {
      this.authUser = user;
    });
  }
}
