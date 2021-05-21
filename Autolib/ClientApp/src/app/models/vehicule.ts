import { Reservation } from "./reservation";
import { TypeVehicule } from "./type-vehicule";
import { Utiliser } from "./utiliser";

export class Vehicule {
  id: number;
  rfid: number;
  etatBatterie: number;
  disponibilite: string;
  latitude: number;
  longitude: number;
  typeVehicule: TypeVehicule;
  reservations: Reservation[];
  utilisations: Utiliser[];

  public isUsed(used: boolean): void {
    if (used) this.disponibilite = 'UTILISE'
    else this.disponibilite = 'LIBRE';
  }

  public isBooked(booked: boolean): void {
    if (booked) this.disponibilite = 'RESERVEE'
    else this.disponibilite = 'LIBRE'
  }
}
