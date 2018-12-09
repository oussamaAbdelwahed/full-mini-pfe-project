import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-materials-stats',
  templateUrl: './materials-stats.component.html',
  styleUrls: ['./materials-stats.component.css']
})
export class MaterialsStatsComponent implements OnInit {
   @Input() public isSp1Visible : boolean =  true;
   @Input() public isSp2Visible: boolean = true;
   
   @Input() public statsPerCategorie : any[] = [];
   @Input() public statsPerMarque: any[] = [];

   public MatCatsMapper = {
     EQUIPEMENT_RESAU: "Equipements Réseaux ",
     PC: "Ordinateurs ",
     RETRO_PROJECTEUR: "Rétroprojecteurs "
   };

  constructor() { }

  ngOnInit() {}
}
