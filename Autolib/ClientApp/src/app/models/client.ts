
export class Client {
  id: number;
  nom: string;
  prenom: string;
  date_naissance: Date;
  login: string;
  mdp: string;

  // getter
  public getId(): number { return this.id };
  public toString(): string {
    return this.nom + ' ' + this.prenom;
  }
  public getDateNaiss(): Date { return this.date_naissance };
  public getLogin(): string { return this.login };

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
