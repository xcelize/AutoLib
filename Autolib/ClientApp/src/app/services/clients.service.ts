import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  ids: string[] = [];


  /*addClient(newClient: Client): any {
    return this._http.post<Client>("api/client", newClient, this.httpOptions)
  }*/

  /*delete(id: number) {
    return this._http.delete("api/client/" + id);
  }*/

  setUser(
    id: string, nom: string, prenom: string,
    dateNaissance: string, identifant: string, 
    token: string, reservations: any[]
  ) {
    // Token connexion qui est valable pour 1 hour, après ce temps il faudra se reconnecter.
    const expire_at = moment().add(1, 'hour');
    localStorage.setItem('currentUser', JSON.stringify({
      'id': id,
      'nom': nom,
      'prenom': prenom,
      'dateNaiss': dateNaissance,
      'identifiant': identifant,
      'reservation': reservations
    }));
    localStorage.setItem('token', token);
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
  }

  clearUser() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getReservations() {
    return JSON.parse(localStorage.getItem('reservations'));
  }

  updateToken(token: string) {
    localStorage.setItem('token', token);
    const expire_at = moment().add(1, 'hour');
    localStorage.setItem('expire_at', JSON.stringify(expire_at.valueOf()));
  }


}
