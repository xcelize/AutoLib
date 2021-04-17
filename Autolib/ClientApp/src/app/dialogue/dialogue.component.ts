import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockStationServiceService } from '../services/mock-station-service.service';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _mockStationService: MockStationServiceService
  ) { }

  ngOnInit() {
  }

  public totalBornes(): number { 
    return this.data.bornes.length;
  }

  public totalBornesDispo(): number {
    let dispo = 0;
    for (let borne of this.data.bornes) {
      if (borne.etatBorne == 1) dispo++;
    }
    return dispo;
  }

  public getAdresse(): string {
    return this.data.numero.toString() + " " +
      this.data.adresse + ", " +
      this.data.code_postal.toString() + " " + this.data.ville;
  }

  public getBackgroundColor(etatBorne: number): string {
    let color = 'rgb(220,220,220)';
    if (etatBorne == 0) color = "rgb(51, 174, 103)";
    return color;
  }

  public getColor(etatBorne: number): string {
    let color = 'black';
    if (etatBorne == 0) color = 'white';
    return color;
  }

  sendData(): void {
    this._mockStationService.getStation(this.data.id).subscribe(
      (data) => { console.log(data); }
    )
  }
}
