import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-spprimer-compte',
  templateUrl: './dialog-spprimer-compte.component.html',
  styleUrls: ['./dialog-spprimer-compte.component.css']
})
export class DialogSpprimerCompteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  onConfirmer() {
    alert("Action à supprimer le compte !");
  }

}
