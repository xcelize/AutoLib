import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Borne } from '../models/borne';
import { Station } from '../models/station';
import { MockStationServiceService } from '../services/mock-station-service.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  bornesDispo: Borne[];
  colonnes: string[] = ['borne', 'vehicule', 'categorie', 'batterie', 'dispo', 'reserver'];

  constructor(
    private _mockStationService: MockStationServiceService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._mockStationService.getStation(+id).subscribe(
      station => {
        this.bornesDispo = this.getBornesDispo(station);
        console.log(this.bornesDispo);
      }
    );
  }

  getBornesDispo(station: Station): Borne[] {
    let bornes: Borne[]=[];
    for (let borne of station.bornes) {
      if (borne.etatBorne == 0) bornes.push(borne);
    }
    return bornes;
  }

  getImgVehicule(nomVehicule: string): string {
    let source: string = "";
    switch (nomVehicule) {
      case "Citroën C1": source = "../../assets/images/citroenC1.jpg"; break;
      case "Toyota Aygo": source = "../../assets/images/toyotaAygo.png"; break;
      case "Citroën Berlingo": source = "../../assets/images/citroenBerlingo.jpg"; break;
      case "Citroën Berlingo PRM": source = "../../assets/images/citroenBerlingoPRM.jpg"; break;
      case "Nissan Evalia": source = "../../assets/images/nissan.png"; break;
      case "C4 Picasso": source = "../../assets/images/c4Picasso.jpg"; break;
      case "Toyota Verso": source = "../../assets/images/toyotaVerso.JPG"; break;
      case "Toyota Yaris": source = "../../assets/images/toyotaYaris.png"; break;
      default: source = ""; break; 
    }
    return source;
  }

}
