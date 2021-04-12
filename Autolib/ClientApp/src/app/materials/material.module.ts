import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatIconRegistry,
  MatToolbarModule
];

@NgModule(
  {
    imports: [MaterialComponents],
    exports: [MaterialComponents]
  }
)

export class MaterialModule { };
