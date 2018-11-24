import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalListMaterielParCheDepComponent } from '../modal-list-materiel-par-che-dep/modal-list-materiel-par-che-dep.component';
import { MaterielService } from '../services/materiel.service';
import { Subscription } from 'rxjs';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import { ReclamationService } from '../services/reclamation.service';
import {MatSnackBar} from '@angular/material';
import { SnackBarAddReclamationComponent } from '../snack-bar-add-reclamation/snack-bar-add-reclamation.component';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit, OnDestroy {

  public listClassesAndMateriel = []
  private listClassesAndMaterielSubscritpion: Subscription
  public infoFromModal: any
  public showInfo: boolean = false
  public showErreurSelectionerMateriel: boolean = false;
  public AddRecalamationForm: FormGroup

  constructor(public ModalListMaterielParCheDepComponent: MatDialog,
     private _materielService: MaterielService,
     private _reclamationService: ReclamationService,
     private _fb: FormBuilder,
     public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm()
    this.getClassesAndMateriels()
  }

  ngOnDestroy() {
    this.listClassesAndMaterielSubscritpion.unsubscribe()
  }

  public openModalListMateriel() {
    const dialogRef = this.ModalListMaterielParCheDepComponent.open(ModalListMaterielParCheDepComponent, {
      width: "500px",
      hasBackdrop: true,
      disableClose: true,
      data: this.listClassesAndMateriel
      
    })


    dialogRef.afterClosed().subscribe((result) => {
      if(result == '' || result == null) {
        this.showErreurSelectionerMateriel = true
        
      }else {
        this.showErreurSelectionerMateriel = false
        this.infoFromModal = result     
        this.showInfo = true
      }
      
    })
  }

  public getClassesAndMateriels() {
    let GraphQlQuery  = '{AllMaterielsByChefDepart(chefDepartId: "1") {id nom  numSerie classe {  id nom }} }'
    this.listClassesAndMaterielSubscritpion = this._materielService.getAllMaterielByChefDep(1,GraphQlQuery)
      .subscribe((result) => {
        this.listClassesAndMateriel = result.data.AllMaterielsByChefDepart
      })
  }

  private initForm() {
    this.AddRecalamationForm = this._fb.group({
      objectif: [null, Validators.compose([Validators.required])],
      description: [null,Validators.required]
    })
  }

  public postReclamation() {
    if(this.infoFromModal == '' || this.infoFromModal == null) {
      this.showErreurSelectionerMateriel = true
    }else{
      this.showErreurSelectionerMateriel = false      
      this._reclamationService.addReclamation(this.AddRecalamationForm.value,this.infoFromModal)
        .subscribe((result) => {
          if(result.message == "Insert with success") {
            this.openSnackBar("Reclamation a été envoyée avec success", "successMessage")
          }
        }, (err) => {
          this.openSnackBar("Il y a une petite erreur dans le serveur", "erreurMessage")
        })
    }
  }


  private openSnackBar(message, messageClass) {
    console.log(messageClass)
    this.snackBar.openFromComponent(SnackBarAddReclamationComponent,{
      data: message,
      duration: 3000,
      panelClass: messageClass
    })
  }

}
