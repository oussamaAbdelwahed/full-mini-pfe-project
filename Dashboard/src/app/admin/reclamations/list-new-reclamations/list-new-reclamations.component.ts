import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../../../models/reclamation.model';
import { Subscription } from 'rxjs';
import { ReclamationService } from '../../../services/reclamation.service';
import { formatGraphQLParams } from 'src/app/commons/common';

@Component({
  selector: 'app-list-new-reclamations',
  templateUrl: './list-new-reclamations.component.html',
  styleUrls: ['./list-new-reclamations.component.css']
})
export class ListNewReclamationsComponent implements OnInit {
   public reclamations: Reclamation[] = [];
   private reclamationsSubSubsc: Subscription;
   constructor(private reclamationService: ReclamationService) { }

  ngOnInit() {
    this.subscribeToReclamationsSub();
    this.getUntreatedReclamations();
  }

  subscribeToReclamationsSub() {
    this.reclamationsSubSubsc = this.reclamationService.reclamationsSub.subscribe(
       (emittedData: Reclamation[]) => {
         this.reclamations = emittedData;
         console.log(this.reclamations);
       }
    );
  }

  getUntreatedReclamations() {
    const params = formatGraphQLParams(["id","dateCreation",{n:"materiel",v:["id","nom","marque","numSerie"]},{n:"chefDepartement",v:["id","nom","prenom"]},"objectif","description"],"");
    const q = '{"query":"{getNewReclamations {' + params + '}}"}';
    this.reclamationService.getNewReclamations(q);
  }
}
