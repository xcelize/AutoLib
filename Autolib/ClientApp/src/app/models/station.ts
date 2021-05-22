import { Borne } from "./borne";

export class Station {
  idStation: number;
  latitude: number;
  longitude: number;
  adresse: string;
  numero: number;
  ville: string;
  codePostal: number;
  bornes: Borne[];

  public totalBornes(): number {
    return this.bornes.length;
  }

  public totalBornesDispo(): number {
    let dispo = 0;
    for (let borne of this.bornes) {
      if (borne.etatBorne == 1) dispo++;
    }
    return dispo;
  }

  public getBornesDispo(): Borne[] {
    let bornesDispo: Borne[];
    for (let borne of this.bornes) {
      if (borne.etatBorne == 1) bornesDispo.push(borne);
    }
    return bornesDispo;
  }

  public getAdresse(): string {
    return this.numero.toString() + " " +
           this.adresse + ", " +
           this.codePostal.toString() + " " + this.ville; 
  }
}

