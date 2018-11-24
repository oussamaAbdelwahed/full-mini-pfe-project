import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterielService } from 'src/app/services/materiel.service';
import { Departement } from '../../../models/departement.model';
import { Classroom } from 'src/app/models/classroom.model';
import { DepartementService } from '../../../services/departement.service';
import { ClassroomService } from '../../../services/classroom.service';
import { Subscription } from 'rxjs';
import { formatGraphQLParams } from 'src/app/commons/common';

import { Location } from '@angular/common';
declare const $ :any;
@Component({
  selector: "app-create-material",
  templateUrl: "./create-material.component.html",
  styleUrls: ["./create-material.component.css"]
})
export class CreateMaterialComponent implements OnInit {
  public form: FormGroup;
  public departements: Departement[] = [];
  public classes: Classroom[] = [];
  private classesPerDep = [];
  private nbrDepClick = 0;
  private depServiceSubsc: Subscription;
  private classServiceSubsc: Subscription;
  private depId: number = 0;
  private classId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private matService: MaterielService,
    private depService: DepartementService,
    private classService: ClassroomService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();
    this.subscribeToDepService();
    this.subscribeToClassService();
  }

  initForm() {
    this.form = this.formBuilder.group({
      numSerie: ["", Validators.required],
      marque: ["", Validators.required],
      nom: ["", Validators.required],
      categorie: ["PC", Validators.required],
      dateAchat: [""],
      adresseIp: [""],
      departement: ["departement"],
      classe: [""]
    });
  }

  onSubmitForm() {
    const formContent = this.form.value;
    this.matService.saveMaterial(formContent).then((resolvedData: boolean) => {
      if (resolvedData) {
        this.location.back();
      } else {
        //doesnt saved
      }
    });
  }

  onClickDep(event) {
    this.nbrDepClick++;
    if (this.nbrDepClick == 1) {
      $("#departement").attr("disabled", true);
      const parameters = formatGraphQLParams(["id", "nom"], "");
      const q = '{"query":"{getAllDepartements{' + parameters + '}}"}';
      this.depService.getDepartements(q);
    }
  }

  subscribeToDepService() {
    this.depServiceSubsc = this.depService.departementsSub.subscribe(
      (emittedData: Departement[]) => {
        this.departements = emittedData;
        $("#departement").attr("disabled", false);
        this.fillArrayClassesPerDep();
      }
    );
  }

  subscribeToClassService() {
    this.classServiceSubsc = this.classService.classesPerDepSub.subscribe(
      (emittedData: Classroom[]) => {
        this.classes = emittedData;
        this.fillDepartementClasses();
      }
    );
  }

  setClassroomsIntoArray() {
    for (let i = 0; i < this.classesPerDep.length; i++) {
      if (this.classesPerDep[i].DEP_ID == this.depId) {
        if (!this.classesPerDep[i].isFilled) {
          $("#classe").attr("disabled", true);
          const params = formatGraphQLParams(["id", "nom"], "");
          const q =
            '{"query":"{getClassesByDepartement(id: ' +
            this.depId +
            ") {" +
            params +
            '}}"}';
          this.classService.getClassesOfDep(q);
        } else {
          this.classes = this.classesPerDep[i].CLASSROOMS;
        }
        break;
      }
    }
  }

  fillArrayClassesPerDep() {
    let id_dep = null;
    for (let i = 0; i < this.departements.length; i++) {
      if (!this.classesPerDep[i]) {
        id_dep = this.departements[i].id;
        var obj = { DEP_ID: id_dep, CLASSROOMS: [], isFilled: false };
        this.classesPerDep.push(obj);
      }
    }
  }

  onChangeDep(event) {
    $("#classe").attr("disabled", false);
    this.depId = event.target.value;
    this.setClassroomsIntoArray();
  }

  fillDepartementClasses() {
    for (let i = 0; i < this.departements.length; i++) {
      if (this.classesPerDep[i].DEP_ID == this.depId) {
        if (!this.classesPerDep[i].isFilled) {
          this.classesPerDep[i].CLASSROOMS = this.classes;
          this.classesPerDep[i].isFilled = true;
          $("#classe").attr("disabled", false);
        }
        break;
      }
    }
  }

  onChangeDate(event) {
    console.log(event.target.value);
  }
}
