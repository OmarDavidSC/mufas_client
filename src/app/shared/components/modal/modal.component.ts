import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalType } from 'src/app/utils/Enumeradores';


export interface IDialogData {
  mensaje: string;
  tipoModal: ModalType;
  titulo: string;
  textoBotonNo: string;
  textoBotonSi: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalDialog implements OnInit {

  ngOnInit(): void {

  }

  constructor(
    public dialogRef: MatDialogRef<ModalDialog>,
    @Inject(MAT_DIALOG_DATA) public datos: IDialogData) { }
}