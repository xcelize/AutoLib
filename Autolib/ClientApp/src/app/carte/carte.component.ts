import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Station } from '../models/station';
import { MockStationServiceService } from '../services/mock-station-service.service';

declare var ol: any;

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements OnInit {

  stations: Station[] = [];
  loading: boolean = false;
  errorMessage: string = "";
  // coordonnées de Lyon
  lat_lyon: number = 45.764043;
  long_lyon: number = 4.835659;

  constructor(
    private _mockStationService: MockStationServiceService
  ) {
  }

  map: any;

  ngOnInit() {
    this.getStations();
    this.loadMap();
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


  loadMap(): void {
    this.map = new ol.Map(
      {
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([this.long_lyon, this.lat_lyon]),
          zoom: 12
        })
      }
    );

    for (let station of this.stations) {
      this.addPoint(station.latitude, station.longitude);
    }
    
  }

  addPoint(lat: number, long: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([long, lat])),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "../../assets/images/localisation_station.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }
}
