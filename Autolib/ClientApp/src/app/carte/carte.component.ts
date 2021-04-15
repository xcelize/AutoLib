import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station';
import { MockStationServiceService } from '../services/mock-station-service.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  stations: Station[] = [];
  loading: boolean = false;
  errorMessage: string = "";

  constructor(
    private _mockStationService: MockStationServiceService
  ) {
  }

  ngOnInit() {
    this.getStations();
  }

  getStations(): void {
    this.loading = true;
    this._mockStationService.getAllStations().subscribe(
      (data) => {
        console.log('stations received')
        this.stations = data;
      },
      (error) => {
        console.error('request failed with error')
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        console.log('request completed')
        this.loading = false;
      }
    );

  }
}
