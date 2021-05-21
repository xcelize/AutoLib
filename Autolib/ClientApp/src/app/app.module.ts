import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InscriptionComponent } from './inscription/inscription.component';
import { CarteComponent } from './carte/carte.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CompteComponent } from './compte/compte.component';
import { FooterComponent } from './footer/footer.component';
import { ProximiteComponent } from './proximite/proximite.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { DialogResaOkComponent } from './dialog-resa-ok/dialog-resa-ok.component';
import { MatNativeDateModule } from '@angular/material';
import { DialogInscriptionValideComponent } from './dialog-inscription-valide/dialog-inscription-valide.component';
import { AuthInterceptor } from './auth/authconfig.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { environment } from '../environments/environment';
import { DialogGuardComponent } from './dialog-guard/dialog-guard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    InscriptionComponent,
    CarteComponent,
    ReservationComponent,
    CompteComponent,
    FooterComponent,
    ProximiteComponent,
    DialogueComponent,
    ConfirmReservationComponent,
    DialogResaOkComponent,
    DialogInscriptionValideComponent,
    DialogGuardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'inscription', component: InscriptionComponent },
      { path: 'proximite', component: ProximiteComponent },
      { path: 'reservation/stations/:id', component: ReservationComponent },
      { path: 'clients:/id', component: CompteComponent },
    ]),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: "BASE_API_URL", useValue: environment.api_url_base }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogueComponent,
    ConfirmReservationComponent,
    DialogResaOkComponent,
    DialogInscriptionValideComponent,
    DialogGuardComponent
  ],
  
})
export class AppModule { }
