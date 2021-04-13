import { Borne } from "./borne";
import { Client } from "./client";
import { Vehicule } from "./vehicule";

export class Utiliser {
  idService: number;
  vehicule: Vehicule;
  client: Client;
  date: Date;
  borne_depart: Borne;
  borne_arrive: Borne;
}
