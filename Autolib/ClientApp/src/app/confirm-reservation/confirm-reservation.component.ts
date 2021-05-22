import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogResaOkComponent } from '../dialog-resa-ok/dialog-resa-ok.component';
import { Borne } from '../models/borne';
import { Station } from '../models/station';
import { BoutonsService } from '../services/boutons.service';
import { ImageService } from '../services/image.service';
import { StationsService } from '../services/stations.service';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent implements OnInit {

  station: Station;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _imageService: ImageService,
    private _dialogueOK: MatDialog,
    private _stationService: StationsService,
    private _boutonsService: BoutonsService
  ) {}

  ngOnInit() {
  }

  openDialogResaOK(): void {
    const dialogOk = this._dialogueOK.open(DialogResaOkComponent,
      {
        data: {
          date: this.getDate(),
          time: this.getTime(),
          expirationDate: this.getExpireDate(),
          expirationTime: this.getExpireTime()
        },
        disableClose: true,
      },
    );
    dialogOk.afterClosed().subscribe(data =>
      this.updateStation(),
    )
  }

  getDate(): string {
    return (new Date).toLocaleDateString("fr-FR");
  }

  getTime(): string {
    return (new Date).toLocaleTimeString();
  }

  // Temps d'expiration de la réservation non utilisée: 1h30 soit 90 min.
  getExpireTime(): string {
    return (
      new Date(new Date(new Date()).getTime() + 1000 * 60 * 90 )
    ).toLocaleTimeString();
  }

  getExpireDate(): string {
    return (
      new Date(new Date(new Date()).getTime() + 1000 * 60 * 90)
    ).toLocaleDateString("fr-FR");
  }

  //TODO
  updateStation(): void {
    this._stationService.getStation(this.data.idStation).subscribe(
      station => {
        this.station = this.updateStatutVehicule(station),
          this._stationService.updateStation(this.station).subscribe(
          data => console.log(data))
      })
  }

  updateStatutVehicule(station: Station): Station {
    let _borne: Borne = this.data.borne;
    let index = station.bornes.indexOf(_borne);
    _borne.vehicule.disponibilite = 'RESERVEE';
    station.bornes[index] = _borne;
    return station;
  }
}
