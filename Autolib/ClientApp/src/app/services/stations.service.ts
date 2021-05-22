import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllStations(): Observable<Station[]> {
    return this._http.get<Station[]>("api/station");
  }

  getStation(id: number): Observable<Station> {
    return this._http.get<Station>("station/" + id);
  }

  updateStation(station: Station): Observable<Station> {
    return this._http.put<Station>("station/" + station.idStation, station, this.httpOptions);
  }
}
