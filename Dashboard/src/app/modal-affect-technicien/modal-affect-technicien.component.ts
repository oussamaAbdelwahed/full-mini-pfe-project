import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-affect-technicien',
  templateUrl: './modal-affect-technicien.component.html',
  styleUrls: ['./modal-affect-technicien.component.css']
})
export class ModalAffectTechnicienComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalAffectTechnicienComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  public closeModal() {
    this.dialogRef.close();
  }

}
