import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConnexionService } from "../services/connexion.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token: string;

  constructor(
    private _connService: ConnexionService
  ) {
    this.token = this._connService.getCurrentToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      headers: new HttpHeaders({
        'Authorization': 'JWT ' + this.token,
        'Content-Type': 'application/json'
      })
    });
    return next.handle(request);
  }
    

}
