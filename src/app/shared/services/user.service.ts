import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  dbUrl = environment.firebase.databaseURL;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dbUrl + '/users.json');
  }

  getUserByLocalId(id: string): any {
    return this.db.database.ref('/users').orderByChild('localId').equalTo(id);
  }

  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(this.dbUrl + '/users.json', userData);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.dbUrl + '/users/' + userId + '.json');
  }

  updateUser(userData: User, userId: string): Observable<User> {
    return this.http.patch<User>(this.dbUrl + '/users/' + userId + '.json', userData);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(this.dbUrl + '/users/' + userId + '.json');
  }
}
