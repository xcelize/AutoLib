import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogSpprimerCompteComponent } from '../dialog-spprimer-compte/dialog-spprimer-compte.component';
import { Reservation } from '../models/reservation';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  constructor(
    private _connService: ConnexionService,
    private fb: FormBuilder,
    private dialogSupprimerCompte: MatDialog
  ) {
    this.empty = this.isEmpty(this.currentUser.reservations);
    this.modifForm = this.fb.group({
      nom: [this.currentUser.nom, [Validators.required]],
      prenom: [this.currentUser.prenom, [Validators.required]],
      date: [this.currentUser.dateNaiss, [Validators.required]],
    });
  }

  currentUser = this._connService.getCurrentUser();
  colonnes: string[] = ['date', 'vehicule', 'categorie'];
  empty: boolean = false;
  modifier: boolean = false;
  modifForm: FormGroup;

  ngOnInit() {
  }

  isRequired(attr: string): boolean {
    if (this.modifForm.get(attr).hasError('required')) return true;
    else return false;
  }

  isEmpty(resa: Reservation[] | undefined): boolean {
    if (resa == undefined) return true;
    else {
      if (resa.length == 0) return true;
      else return false;
    }
  }

  clickOnModifier() {
    this.modifier = true;

  }

  clickOnSupprimer() {
    this.dialogSupprimerCompte.open(DialogSpprimerCompteComponent,
      {
        data: this.currentUser.id,
        disableClose: true
      }
    )
  }




}
