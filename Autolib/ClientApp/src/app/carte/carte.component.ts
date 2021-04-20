import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station';
import { MockStationServiceService } from '../services/mock-station-service.service';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material';
import { DialogueComponent } from '../dialogue/dialogue.component';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  loading: boolean = false;
  errorMessage: string = "";
  // coordonnées de Lyon
  lat_lyon: number = 45.764043;
  long_lyon: number = 4.835659;

  mymap: L.Map;


  constructor(
    private _mockStationService: MockStationServiceService,
    public dialogue: MatDialog
  ) {}

  ngOnInit() {
    this.getStations();
    this.leafletMap();

  }

  getStations(): void {
    this.loading = true;
    this._mockStationService.getAllStations().subscribe(
      (data) => {
        console.log('stations received');
        this.addSiteOnMap(data);
        console.log(data);
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


  leafletMap() {
    this.mymap = L.map("mapid").setView([this.lat_lyon, this.long_lyon], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);
  }

  addSiteOnMap(stations: Station[]): void {
    stations.forEach(station => {
      var myIcon =
        L.icon({
          iconUrl: "./../assets/images/localisation_station.png",
          iconSize: [40, 40],
          iconAnchor: [13, 0]
        });

      const marker =
        L.marker(
          [station.latitude, station.longitude],
          { icon: myIcon }
        )
        .addTo(this.mymap)
          .on('click', () => {
            this.openDialog(station)
        });
    });
  }

  openDialog(station: Station): void {
    this.dialogue.open(DialogueComponent, {
      data: station
    });
  }

}
