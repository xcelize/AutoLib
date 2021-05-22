import { Reservation } from "./reservation";
import { Utiliser } from "./utiliser";

export class Client {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: Date;
  login: string;
  password: string;
  reservations: Reservation[];
  utilisations: Utiliser[];

  // getter
  public toString(): string {
    return this.nom + ' ' + this.prenom;
  }

  // setter
  public setNom(_nom: string): void {
    this.nom = _nom;
  }

  public setPrenom(_prenom: string): void {
    this.prenom = _prenom;
  }

  public setDateNaiss(_dateNaiss: Date): void {
    this.date_naissance = _dateNaiss;
  }
}
