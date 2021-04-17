import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicule } from '../models/vehicule';
import { MockStationServiceService } from '../services/mock-station-service.service';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  showBtnReserver: boolean = false;
  showInfo: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _mockStationService: MockStationServiceService
  ) { }

  ngOnInit() {
    this.showElement();
  }

  public totalBornes(): number { 
    return this.data.bornes.length;
  }

  public totalBornesDispo(): number {
    let dispo = 0;
    for (let borne of this.data.bornes) {
      if (borne.etatBorne == 0) dispo++;
    }
    return dispo;
  }

  public getAdresse(): string {
    return this.data.numero.toString() + " " +
      this.data.adresse + ", " +
      this.data.code_postal.toString() + " " + this.data.ville;
  }
  /*
  public getBackgroundColor(etatBorne: number): string {
    let color = 'rgb(220,220,220)';

    if (etatBorne == 0) {
      if (dispoVehicule == 'LIBRE') {
        color = "rgb(51, 174, 103)";
      }
      else {
        color = "rgb(0, 148, 255)";
      }
    }
    return color;
  }*/

  public getBackgroundColor(vehicule: Vehicule): string {
    let color = 'rgb(220,220,220)';
    if (vehicule != undefined) {
      if (vehicule.disponibilite == 'LIBRE') color = "rgb(51, 174, 103)";
      else color = "rgb(0, 148, 255)";
    }
    return color;
  }
  /*
  public getColor(etatBorne: number): string {
    let color = 'black';
    if (etatBorne == 0) color = 'white';
    return color;
  }*/

  public getColor(vehicule: Vehicule): string {
    let color = 'black';
    if (vehicule != undefined) color = 'white';
    return color;
  }

  public showElement(): void {
    let dispo = this.totalBornesDispo();
    if (dispo == 0) {
      this.showBtnReserver = false;
      this.showInfo = true;
    }
    else {
      this.showBtnReserver = true;
      this.showInfo = false;
    }
  }

}
