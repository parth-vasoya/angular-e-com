import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {RegisterUser, RegisterUserResponse, UserPwdUpdateRequest, UserPwdUpdateResponse} from "../model/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(userData: RegisterUser): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(environment.signUpUrl, userData);
  }

  login(userData: RegisterUser): Observable<RegisterUserResponse> {
    return this.http.post<RegisterUserResponse>(environment.signInUrl, userData);
  }

  updatePwd(data: UserPwdUpdateRequest): Observable<UserPwdUpdateResponse> {
    return this.http.post<UserPwdUpdateResponse>(environment.updatePwdUrl, data);
  }
}
