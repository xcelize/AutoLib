import { Injectable } from '@angular/core';
import { Borne } from '../models/borne';

@Injectable({
  providedIn: 'root'
})
export class BoutonsService {

  constructor() { }

  reservee: boolean;

  isBooked(borne: Borne): boolean {
    if (borne.vehicule.disponibilite == 'RESERVEE') {
      this.reservee = true;
    }
    else {
      this.reservee = false;
    }
    return this.reservee;
  }
}

