import { Reservation } from "./reservation";
import { TypeVehicule } from "./type-vehicule";
import { Utiliser } from "./utiliser";

export class VehiculeNested {
  id: number;
  rfid: number;
  etatBatterie: number;
  disponibilite: string;
  latitude: number;
  longitude: number;
  typeVehicule: TypeVehicule;
  reservations: Reservation[];
  utilises: Utiliser[];
}
