import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicule } from '../models/vehicule';
import { VehiculeNested } from '../models/vehicule-nested';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getVehicule(id: number): Observable<Vehicule> {
    return this._http.get<Vehicule>("api/vehicule/" + id);
  }

  updateVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this._http.put<Vehicule>("api/vehicule/" + vehicule.id, vehicule, this.httpOptions);
  }
}
