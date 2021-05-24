import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeVehicule } from '../models/type-vehicule';

@Injectable({
  providedIn: 'root'
})
export class TypeVehiculeService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTypeVehicule(id: number): Observable<TypeVehicule> {
    return this._http.get<TypeVehicule>("api/typeVehicule/" + id);
  }

}
