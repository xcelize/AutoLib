import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService implements CanActivate {

  resultatConexion: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private _clientService: ClientsService,
    private _http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.currentUserSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  getCurrentToken() {
    return this.currentTokenSubject.value;
  }

  connexion(loginForm: FormGroup) {
    let identifiant = loginForm.controls['identifiant'].value;
    let mdp = loginForm.controls['mdp'].value;
    console.log("username = ", identifiant);

    if (identifiant == "" && mdp == "") {
      alert("Merci de saisir votre idenfiant et votre mot de passe.")
    }
    else {
      // Appel API
      this._http.post<any>('api/client', {
        'username': identifiant,
        'password': mdp
      }).subscribe(
        res => {
          if (res.token != null) {
            this._clientService.setUser(
              res.id, res.nom, res.prenom,
              res.dateNaissance, res.login,
              res.token, res.reservations,
            );
            alert("Connexion réussi");
          }
          else {
            alert("Connexion échoué: le mot de passe ou l'identifiant est incorrect");
          }
        });
    }

    loginForm.reset();
  }

  isAuthenticated() {
    if (localStorage.getItem('token') != undefined) {
      if (this.isLoggedIn()) {
        return true;
      } else {
        this.refreshToken();
      }
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.expiration());
  }

  refreshToken() {
    this._http.post<any>('api/client',
      { 'token': this._clientService.getToken() }
    ).subscribe(res => {
      this._clientService.updateToken(res.token);
    })
  }

  expiration() {
    const expiration = localStorage.getItem('expire_at');
    const expire_at = JSON.parse(expiration);
    return moment(expire_at);
  }

  logout() {
    this._clientService.clearUser();
    this.router.navigate(['/']);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.isAuthenticated()) {
      return true;
    }
    else {
      return false;
    }
  }

}
