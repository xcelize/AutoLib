import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  constructor(private _connService: ConnexionService) {}

  currentUser = this._connService.getCurrentUser();


  ngOnInit() {
  }

}
