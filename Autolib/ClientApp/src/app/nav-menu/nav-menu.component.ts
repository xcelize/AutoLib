import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  hide = true;
  connexionForm: FormGroup;
  moment: number = new Date().getHours();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.authService.logIn(this.connexionForm.get('identifiant').value, this.connexionForm.get('mdp').value)
      .pipe(first());
  }
}
