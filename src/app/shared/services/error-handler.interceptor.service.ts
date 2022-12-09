import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {SharedService} from "./shared.service";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let modifiedReq = req.clone();
    // let modifiedReq;
    if(this.sharedService.authUser?.idToken) {
        modifiedReq = req.clone({
        params: new HttpParams().set('idToken', this.sharedService.authUser.idToken)
      });
    }
    return next.handle(modifiedReq).pipe(catchError(((err: HttpErrorResponse) => {
      console.log(err);
      let errorMsg = '';
      if (err.error) {
        errorMsg = err.error.error.message;
      }
      if (errorMsg) {
        this.sharedService.dialogSubject.next({message: 'Error: ' + errorMsg});
      }
      return throwError(errorMsg);
    })));
  }
}
