import { Station } from "./station";
import { Vehicule } from "./vehicule";

export class Borne {
  idBorne: number;
  etatBorne: boolean;
  station: Station;
  vehicule: Vehicule;
}
