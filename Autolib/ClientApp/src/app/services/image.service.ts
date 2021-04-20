import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImgVehicule(nomVehicule: string): string {
    let source: string = "";
    switch (nomVehicule) {
      case "Citroën C1": source = "../../assets/images/citroenC1.jpg"; break;
      case "Toyota Aygo": source = "../../assets/images/toyotaAygo.png"; break;
      case "Citroën Berlingo": source = "../../assets/images/citroenBerlingo.jpg"; break;
      case "Citroën Berlingo PRM": source = "../../assets/images/citroenBerlingoPRM.jpg"; break;
      case "Nissan Evalia": source = "../../assets/images/nissan.png"; break;
      case "C4 Picasso": source = "../../assets/images/c4Picasso.jpg"; break;
      case "Toyota Verso": source = "../../assets/images/toyotaVerso.JPG"; break;
      case "Toyota Yaris": source = "../../assets/images/toyotaYaris.png"; break;
      default: source = ""; break;
    }
    return source;
  }
}
