import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-inscription-valide',
  templateUrl: './dialog-inscription-valide.component.html',
  styleUrls: ['./dialog-inscription-valide.component.css']
})
export class DialogInscriptionValideComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

}
