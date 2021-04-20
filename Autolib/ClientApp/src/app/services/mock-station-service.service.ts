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

  mock_api_stations = 'http://localhost:44333/stations';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getAllStations(): Observable<Station[]> {
    return this._http.get<Station[]>(this.mock_api_stations);
  }

  getStation(id: number): Observable<Station> {
    return this._http.get<Station>(this.mock_api_stations + "/" + id);
  }

  updateStation(station: Station): Observable<Station>{
    return this._http.put<Station>(this.mock_api_stations + "/" + station.id, station);
  }
 
}
