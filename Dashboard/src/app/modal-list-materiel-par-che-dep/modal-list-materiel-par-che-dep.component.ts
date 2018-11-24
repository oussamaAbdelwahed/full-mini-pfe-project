import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-list-materiel-par-che-dep',
  templateUrl: './modal-list-materiel-par-che-dep.component.html',
  styleUrls: ['./modal-list-materiel-par-che-dep.component.css']
})
export class ModalListMaterielParCheDepComponent implements OnInit {
  public Classes = []
  public materiels = []
  public showSelectMaterielUI: boolean = false
  private materiel : any
  
  
  constructor(public dialogRef: MatDialogRef<ModalListMaterielParCheDepComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit() {
    console.log(this.data)
    this.extractClasses()
  }


  private extractClasses() {
    let i=0
    for(i;i<this.data.length;i++){
      this.Classes.push(this.data[i].classe)
    }
  }

  public loadMaterielFromClasseId(classeId) {
    this.extractMateriel(classeId)
  }

  private extractMateriel(classeId) {
    let i=0
    this.materiels = []
    for(i;i<this.data.length;i++){
      if(classeId == this.data[i].classe.id){
        this.materiels.push({
          id: this.data[i].id,
          nom: this.data[i].nom,
          numSerie: this.data[i].numSerie
        })
      }
    }
    this.showSelectMaterielUI = true
  }

  public PrepareData(materielId) {
    for(let i=0;i<this.data.length;i++) {
      if(materielId == this.data[i].id){
        this.materiel = this.data[i]
      }
    }
  }
  public sendBackData() {
    this.close()
  }

  public close() {
    //console.log(this.materiel)
    this.dialogRef.close(this.materiel)
  }

}
