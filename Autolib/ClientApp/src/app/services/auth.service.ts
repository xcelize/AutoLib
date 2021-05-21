import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // MOCK_API: string = "http://localhost:44333";
  // CLIENTS: string = this.MOCK_API + "/clients";
  // CONNEXION: string = this.MOCK_API + "/connexions";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public currentUser: Observable<Client>;
  public currentTokenSubject: BehaviorSubject<string>;
  private currentUserSubject: BehaviorSubject<Client>;


  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
  }

  public get currentUserValue(): Client {
    return this.currentUserSubject.value;
  }

  public get currentToken(): string {
    return this.currentTokenSubject.value;
  }

  logIn(identifiant: string, mdp: string) {
    return this._http.post("/connexions", { identifiant, mdp })
      .pipe(map(info => {
        this.populateData(info);
        return info;
      }));
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }

  private populateData(information: any) {
    localStorage.clear();
    localStorage.setItem("token", information.token);
    localStorage.setItem('currentUser', JSON.stringify(information.client));
    this.currentUserSubject.next(information.client);
    this.currentTokenSubject.next(information.token);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token'))
      return true;
    return false;
  }
}
