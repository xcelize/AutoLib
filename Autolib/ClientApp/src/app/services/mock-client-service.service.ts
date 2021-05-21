import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MockClientServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  ids: string[] = [];

  constructor(
    private _http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this._http.get<Client[]>("/clients");
  }

  getClient(id: number): Observable<Client> {
    return this._http.get<Client>("/clients/" + id);
  }

  addClient(newClient: Client): any {
    return this._http.post<Client>("/clients", newClient, this.httpOptions)
  }

  delete(id: number) {
    return this._http.delete("/clients/" + id);
  }

}
