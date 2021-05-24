import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, Form } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogInscriptionValideComponent } from '../dialog-inscription-valide/dialog-inscription-valide.component';
import { Router } from '@angular/router';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    return control.dirty && form.invalid;
    }
}

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})


export class InscriptionComponent implements OnInit {
  currentDate = new Date();
  minLen: number = 8;
  hide: boolean = true;
  inscriptionForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  newClient: Client = new Client();

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      date: ['', [Validators.required]],
      login: ['', [Validators.required, Validators.minLength(this.minLen)]],
      mdp: ['', [Validators.required, Validators.minLength(this.minLen)]],
      confirmMdp: ['', [Validators.required]]
    },
      {
        validators: [
          this.passwordMatchValidator
        ]
      }
    );
  }

  ngOnInit() {
  }

  passwordMatchValidator(g: FormGroup) {
    const mdp = g.get('mdp').value;
    const confirm = g.get('confirmMdp').value;
    return mdp !== confirm ? { mismatch: true } : null ;
  }


  isRequired(attr: string): boolean {
    if (this.inscriptionForm.get(attr).hasError('required')) return true;
    else return false;
  }

  isPasswordMatched(): boolean {
    if (this.inscriptionForm.hasError('mismatch')) return true;
    else return false;
  }

  getNom(): string { return this.inscriptionForm.get('nom').value; }
  getPrenom(): string { return this.inscriptionForm.get('prenom').value; }
  getDateNaiss(): Date { return this.inscriptionForm.get('date').value; }
  getLogin(): string { return this.inscriptionForm.get('login').value; }
  getMdp(): string { return this.inscriptionForm.get('mdp').value; }


  onSubmit() {
    this.newClient.nom = this.getNom().toUpperCase();
    this.newClient.prenom = this.getPrenom().toUpperCase();
    this.newClient.date_naissance = this.getDateNaiss();
    this.newClient.login = this.getLogin();
    this.newClient.password = this.getMdp();

    /*this.clientService.addClient(this.newClient).subscribe(
      data => console.log(data)
    );*/

    this.openDialog(this.newClient);
  }

  openDialog(newClient: Client) {
    this.dialog.open(DialogInscriptionValideComponent,
      {
        data: newClient,
        disableClose: true
      }
    );

  }

}
