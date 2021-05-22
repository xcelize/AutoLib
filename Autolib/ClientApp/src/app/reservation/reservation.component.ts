import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmReservationComponent } from '../confirm-reservation/confirm-reservation.component';
import { Borne } from '../models/borne';
import { Station } from '../models/station';
import { Vehicule } from '../models/vehicule';
import { BoutonsService } from '../services/boutons.service';
import { ImageService } from '../services/image.service';
import { StationsService } from '../services/stations.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  bornesDispo: Borne[];
  colonnes: string[] = ['borne', 'vehicule', 'categorie', 'batterie', 'dispo', 'reserver'];
  idStation: number;
  _resa: boolean = false;

  constructor(
    private _stationService: StationsService,
    private _route: ActivatedRoute,
    private _dialogue: MatDialog,
    private _imageService: ImageService,
    private _boutonsService: BoutonsService
  ) {
  }

  ngOnInit() {
    this.idStation = +this._route.snapshot.paramMap.get('id');
    this._stationService.getStation(this.idStation).subscribe(
      station => {
        this.bornesDispo = this.getBornesDispo(station);
        console.log(this.bornesDispo);
      }
    );
  }

  getBornesDispo(station: Station): Borne[] {
    let bornes: Borne[]=[];
    for (let borne of station.bornes) {
      if (borne.etatBorne == 0) {
        if (borne.vehicule.disponibilite == 'LIBRE') bornes.push(borne);
      }
    }
    return bornes;
  }

  openDialogueConfirmation(borne: Borne): void {
    this._dialogue.open(ConfirmReservationComponent,
      {
        data: {
          borne: borne,
          idStation: this.idStation,
        },
        disableClose: true
      }
    )
  }
}
