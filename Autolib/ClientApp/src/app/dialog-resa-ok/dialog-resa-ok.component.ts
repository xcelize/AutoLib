import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-resa-ok',
  templateUrl: './dialog-resa-ok.component.html',
  styleUrls: ['./dialog-resa-ok.component.css']
})
export class DialogResaOkComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

}
