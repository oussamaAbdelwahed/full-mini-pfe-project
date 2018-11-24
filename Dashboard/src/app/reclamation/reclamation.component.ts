import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAffectTechnicienComponent } from '../modal-affect-technicien/modal-affect-technicien.component';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  public reclamations = [
    {
      title: "Panne dans le pc Asus",
      description: "Le pc ne demarre jamais",
      expediteur: "amine bejaoui",
      salle: "I.02",
      date_de_reclamation: "11/11/2018"
    },
    {
      title: "Panne dans le pc Asus",
      description: "Le pc ne demarre jamais",
      expediteur: "amine bejaoui",
      salle: "I.02",
      date_de_reclamation: "11/11/2018"
    },
    {
      title: "Panne dans le pc Asus",
      description: "Le pc ne demarre jamais",
      expediteur: "amine bejaoui",
      salle: "I.02",
      date_de_reclamation: "11/11/2018"
    },
    {
      title: "Panne dans le pc Asus",
      description: "Le pc ne demarre jamais",
      expediteur: "amine bejaoui",
      salle: "I.02",
      date_de_reclamation: "11/11/2018"
    },
    {
      title: "Panne dans le pc Asus",
      description: "Le pc ne demarre jamais",
      expediteur: "amine bejaoui",
      salle: "I.02",
      date_de_reclamation: "11/11/2018"
    }
  ]
  constructor(public dialogAffectTechnicien: MatDialog) { }

  ngOnInit() {
  }


  public openModal() {
    const dialogRef = this.dialogAffectTechnicien.open(ModalAffectTechnicienComponent, {
      width: "500px",
      hasBackdrop: true,
      disableClose: true
      
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log("modal closer")
    })
  }

}
