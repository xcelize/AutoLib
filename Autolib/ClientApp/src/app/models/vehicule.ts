import { TypeVehicule } from "./type-vehicule";

export class Vehicule {
  idVehicule: number;
  rfid: number;
  etatBatterie: number;
  disponibilite: string;
  latitude: number;
  longitude: number;
  typeVehicule: TypeVehicule;
}
