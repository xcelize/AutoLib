import { TypeVehicule } from "./type-vehicule";

export class Vehicule {
  idVehicule: number;
  rfid: number;
  etatBatterie: number;
  disponibilite: string;
  latitude: number;
  longitude: number;
  typeVehicule: TypeVehicule;

  public isUsed(used: boolean): void {
    if (used) this.disponibilite = 'OCCUPE'
    else this.disponibilite = 'LIBRE';
  }
}
