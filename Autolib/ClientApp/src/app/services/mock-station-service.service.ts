import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class MockStationServiceService {
  constructor(private _http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllStations(): Observable<Station[]> {
    return this._http.get<Station[]>("/stations");
  }

  getStation(id: number): Observable<Station> {
    return this._http.get<Station>("stations/" + id);
  }

  updateStation(station: Station): Observable<Station>{
    return this._http.put<Station>("stations/" + station.idStation, station, this.httpOptions);
  }
 
}
