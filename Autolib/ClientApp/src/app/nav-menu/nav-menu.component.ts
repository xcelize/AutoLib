import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [ConnexionService]
})
export class NavMenuComponent {
  isExpanded = false;
  hide = true;
  connexionForm: FormGroup;
  moment: number = new Date().getHours();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _connService: ConnexionService
  ) {
    this.connexionForm = this.fb.group({
      identifiant: ['', [Validators.required]],
      mdp: ['', [Validators.required]]
    });

  };

  isRequired(attr: string): boolean {
    if (this.connexionForm.get(attr).hasError('required')) return true;
    else return false;
  }

  currentUser = this._connService.getCurrentUser();


  get currentUserId() {
    return this.currentUser.id;
  }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  sayHello(moment: number): string {
    if (moment <= 17) return "Bonjour";
    else return "Bonsoir"
  }

  onSubmit() {
    this._connService.connexion(this.connexionForm);
    console.log("Utilisateur connecté: ", this.currentUser);
  }

  logout() {
    return this._connService.logout();
  }
}
