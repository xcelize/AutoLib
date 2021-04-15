import { Borne } from "./borne";
import { Client } from "./client";
import { Vehicule } from "./vehicule";

export class Utiliser {
  idService: number;
  vehicule: Vehicule;
  client: Client;
  date: Date;
  borne_depart: Borne;
  borne_arrivee: Borne;

  public libererBorneDepart(): void {
    this.borne_depart.etatBorne = 1;
    this.borne_depart.vehicule = null;
  }

  public checkInBorneArrivee(): void {
    this.borne_arrivee.etatBorne = 0;
    this.borne_arrivee.vehicule = this.vehicule;
  }

}
