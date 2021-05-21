import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private authService: AuthService
  ) { }
    
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: `${this.baseUrl}${req.url}`,
      headers: new HttpHeaders({
        'Authorization': 'JWT' + this.authService.currentToken,
        'Content-Type': 'application/json'
      })
    }); 
    return next.handle(request);
  }

}
