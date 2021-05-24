import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Station } from '../models/station';
import { TypeVehiculeService } from './type-vehicule.service';
import { VehiculeService } from './vehicule.service';
import { flatMap, map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Borne } from '../models/borne';
import { Vehicule } from '../models/vehicule';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(
    private _http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private _vehiculeService: VehiculeService,
    private _typeVehiculeServcie: TypeVehiculeService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllStations(): Observable<Station[]> {
    return this._http.get<Station[]>("api/station")
      /*.pipe(flatMap(
        (stations: Station[]) => forkJoin(stations.map(
          (station: Station) => {
            return forkJoin(station.bornes.map(borne => return this._vehiculeService.getVehicule(borne.idVehicule)))
          }
        )
      ))*/
      
  }

  getStation(id: number): Observable<Station> {
    return this._http.get<Station>("station/" + id);
  }

  updateStation(station: Station): Observable<Station> {
    return this._http.put<Station>("station/" + station.idStation, station, this.httpOptions);
  }
}
