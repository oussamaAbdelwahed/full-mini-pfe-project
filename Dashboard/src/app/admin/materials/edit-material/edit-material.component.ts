import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartementService } from '../../../services/departement.service';
import { ClassroomService } from '../../../services/classroom.service';
import { Departement } from 'src/app/models/departement.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isUndefined } from 'util';
import { Materiel } from 'src/app/models/material.model';
import { ActivatedRoute } from '@angular/router';
import { Classroom } from 'src/app/models/classroom.model';
import { Location } from '@angular/common';
import { MaterielService } from 'src/app/services/materiel.service';
import { Subscription } from 'rxjs';
import { formatGraphQLParams } from '../../../commons/common';

declare const $: any;
@Component({
  selector: "app-edit-material",
  templateUrl: "./edit-material.component.html",
  styleUrls: ["./edit-material.component.css"]
})
export class EditMaterialComponent implements OnInit, OnDestroy {
  private departementsSubsc: Subscription;
  private matSubSubsc: Subscription;
  private classSubSubsc: Subscription;
  private isSelectDepVisited: boolean = false;
  private idSelectedDep: number;
  public classes: Array<Classroom> = [];
  public errorMessage = "";
  public classesPerDep = [];
  public count=0;

  public departements: Array<Departement> = [];
  public material: Materiel;

  public formEditMat: FormGroup;

  constructor(
    private depService: DepartementService,
    private classService: ClassroomService,
    private matService: MaterielService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();
    this.getIdFromUrl();
    this.subscribeToMatSubject();
    this.subscribeToDepSubject();
    this.subscribeToClassSubject();
  }

  ngOnDestroy() {
    this.departementsSubsc.unsubscribe();
    this.matSubSubsc.unsubscribe();
    this.classSubSubsc.unsubscribe();
  }

  getIdFromUrl() {
    this.activatedRoute.params.subscribe(params => {
      const parameters = formatGraphQLParams(["id", "nom", "adresseIp", "categorie", "numSerie", "marque", { n: "classe", v: ["id","nom",{n:"departement",v:["id","nom"]}]}],"");
      const q = '{"query":"{getMaterialById(matId: '+params["id"]+') {'+parameters +'}}"}';
      this.matService.getMaterielById(q);
    });
  }

  subscribeToDepSubject() {
    this.departementsSubsc = this.depService.departementsSub.subscribe(
      (emittedData: Array<Departement>) => {
        this.departements = emittedData;
        this.fillArrayClassesPerDep();
        $("#spinnerDept").hide();
        $("#departement").attr("disabled", false);
        this.formEditMat.controls["departement"].setValue(
          this.material.classe.departement.id,
          { onlySelf: true }
        );
      }
    );
  }

  subscribeToMatSubject() {
    this.matSubSubsc = this.matService.singleMatSub.subscribe(
      (emittedData: Materiel) => {
        this.material = emittedData;
        this.initForm(emittedData);
        this.idSelectedDep = this.material.classe.departement.id;
        const obj = { DEP_ID: this.idSelectedDep, CLASSROOMS: [], isFilled: false};
        this.classesPerDep.push(obj);
        this.classes.push(this.material.classe);
        this.formEditMat.controls["classe"].setValue(this.material.classe.id, {
          onlySelf: true
        });
      }
    );
  }

  subscribeToClassSubject() {
    this.classSubSubsc = this.classService.classesPerDepSub.subscribe(
      (emittedData: Array<Classroom>) => {
        this.classes = emittedData;
        for (let i = 0; i < this.classesPerDep.length; i++) {
          if (this.classesPerDep[i].DEP_ID == this.idSelectedDep && this.classesPerDep[i].isFilled===false) {
            this.classesPerDep[i].CLASSROOMS = this.classes;
            this.classesPerDep[i].isFilled = true;
            $("#spinnerSalle").hide();
            $("#classe").attr("disabled", false);
            break;
          }
        }
      }
    );
  }

  initForm(material?: Materiel) {
    if (isUndefined(material)) {
      this.formEditMat = this.formBuilder.group({
        numSerie: ["", Validators.required],
        nom: ["", Validators.required],
        marque: ["", Validators.required],
        adresseIp: ["", Validators.required],
        categorie: ["", Validators.required],
        departement: ["", Validators.required],
        classe: ["", Validators.required]
      });
    } else {
      this.formEditMat = this.formBuilder.group({
        numSerie: [material.numSerie, Validators.required],
        nom: [material.nom, Validators.required],
        marque: [material.marque, Validators.required],
        adresseIp: [material.adresseIp, Validators.required],
        categorie: [material.categorie.toString(), Validators.required],
        departement: [, Validators.required],
        classe: [, Validators.required]
      });
      this.departements.push(material.classe.departement);
      this.formEditMat.controls["departement"].setValue(
        material.classe.departement.id,
        { onlySelf: true }
      );
      this.formEditMat.controls["classe"].setValue(material.classe.nom, {
        onlySelf: true
      });
    }
  }

  onChangeDep(event) {
    this.idSelectedDep = event.target.value;
    for (let i = 0; i < this.classesPerDep.length; i++) {
      if (this.classesPerDep[i].DEP_ID == this.idSelectedDep) {
        if (!this.classesPerDep[i].isFilled) {
          const params = formatGraphQLParams(["id","nom"],""); 
          const q = '{"query":"{getClassesByDepartement(id: ' + +this.idSelectedDep +') {' + params + '}}"}';
          this.classService.getClassesOfDep(q);
          $("#spinnerSalle").show();
          $("#classe").attr("disabled", true);
          //this.classesPerDep[i].isFilled = true;
          break;
        } else {
          console.log("error");
          this.classes = this.classesPerDep[i].CLASSROOMS;
        }
      }
    }
  }

  fn1() {
    if (!this.isSelectDepVisited) {
      $("#spinnerDept").show();
      $("#departement").attr("disabled", true);
      this.isSelectDepVisited = true;
      const parameters = formatGraphQLParams(["id","nom"],"");
      const q = '{"query":"{getAllDepartements{'+ parameters +'}}"}';
      this.depService.getDepartements(q);
    }
  }

  fillArrayClassesPerDep() {
    let id_dep = null;
    for (let i = 0; i < this.departements.length; i++) {
      if(!this.classesPerDep[i]) {
        id_dep = this.departements[i].id;
        var obj = { DEP_ID: id_dep, CLASSROOMS: [], isFilled: false };
        this.classesPerDep.push(obj);
      }
    }
  }

  onClickClass(event) {
    this.count++;
    if (this.count == 1) {
      $("#spinnerSalle").show();
      $("#classe").attr("disabled", true);
      const params = formatGraphQLParams(["id","nom"],"");
      const q = '{"query":"{getClassesByDepartement(id: ' + this.idSelectedDep + ') {' + params + '}}"}';
      //this.classesPerDep.push({ DEP_ID: this.idSelectedDep, CLASSROOMS: [], isFilled: false });
      this.classService.getClassesOfDep(q);
    }
  }

  onSubmitForm() {
    const formContent = this.formEditMat.value;
    console.log(formContent);
    console.log("materiel id = " + this.material.id);
    this.matService.updateMaterial(+this.material.id, formContent).then(
      (data: boolean) => {
        if(data) {
           this.location.back();
        } else{
          this.errorMessage = "une erreur est suvenue , ressayer";
        }
      }
    );
  }
}
