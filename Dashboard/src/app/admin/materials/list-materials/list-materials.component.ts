import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterielService } from 'src/app/services/materiel.service';
import { Materiel } from 'src/app/models/material.model';
import { Departement } from 'src/app/models/departement.model';
import { Classroom } from 'src/app/models/classroom.model';
import { DepartementService } from '../../../services/departement.service';
import { ClassroomService } from '../../../services/classroom.service';
import { formatGraphQLParams } from 'src/app/commons/common';
declare const $: any;
@Component({
  selector: "app-list-materials",
  templateUrl: "./list-materials.component.html",
  styleUrls: ["./list-materials.component.css"]
})
export class ListMaterialsComponent implements OnInit, OnDestroy {
  private depId: number;
  private classId: number;
  private categorie: string = "ALL";
  public materials: Materiel[] = [];
  private matId: number;
  private deletedElem: ElementRef;

  private countDepClick: number = 0;
  private countClassClick: number = 0;

  private matSubSubsc: Subscription;
  private depSubSubsc: Subscription;
  private classeSubSubsc: Subscription;

  public classesPerDep = [];
  public departements: Departement[] = [];
  public classes: Classroom[] = [];
  public viewTitle = "List des Materiels";

  constructor(
    private matService: MaterielService,
    private depService: DepartementService,
    private classeService: ClassroomService
  ) {}

  ngOnInit() {
    this.subscribeToMatSub();
    this.subscribeToDepSub();
    this.subscribeToClasseSub();
  }

  ngOnDestroy() {
    this.matSubSubsc.unsubscribe();
  }

  onChangeDep(event) {
    this.depId = +event.target.value;
    this.classId = 0;
    this.getClassroomsOfDep();
  }

  onChangeClass(event) {
    this.classId = +event.target.value;
    console.log(" selected class id = " + this.classId);
  }

  onChangeCate(event) {
    this.categorie = event.target.value;
  }

  // const obj = { DEP_ID: this.idSelectedDep, CLASSROOMS: [], isFilled: false};

  subscribeToMatSub() {
    this.matSubSubsc = this.matService.materialsSub.subscribe(
      (emitedData: Materiel[]) => {
        this.materials = emitedData;
      }
    );
  }

  subscribeToDepSub() {
    this.depSubSubsc = this.depService.departementsSub.subscribe(
      (emittedData: Departement[]) => {
        this.departements = emittedData;
        $("#dep_sel_dom_el").attr("disabled", false);
        $("#loading_spinner").hide();
        this.fillArrayClassesPerDep();
      }
    );
  }

  subscribeToClasseSub() {
    this.classeSubSubsc = this.classeService.classesPerDepSub.subscribe(
      (emittedData: Classroom[]) => {
        this.classes = emittedData;
        this.fillDepartementClasses();
      }
    );
  }

  getDepartements() {
    this.countDepClick++;
    if (this.countDepClick == 1) {
      $("#dep_sel_dom_el").attr("disabled", true);
      $("#loading_spinner").show();
      const parameters = formatGraphQLParams(["id", "nom"], "");
      const q = '{"query":"{getAllDepartements{' + parameters + '}}"}';
      this.depService.getDepartements(q);
    }
  }

  getClassroomsOfDep() {
    for (let i = 0; i < this.departements.length; i++) {
      if (this.classesPerDep[i].DEP_ID == this.depId) {
        if (!this.classesPerDep[i].isFilled) {
          $("#class_sel_dom_el").attr("disabled", true);
          $("#loading_spinner").show();
          const params = formatGraphQLParams(["id", "nom"], "");
          const q =
            '{"query":"{getClassesByDepartement(id: ' +
            this.depId +
            ") {" +
            params +
            '}}"}';
          this.classeService.getClassesOfDep(q);
          /*var obj = { DEP_ID: 0, CLASSROOMS: [], isFilled: false };
          this.classesPerDep.push(obj);*/
        } else {
          this.classes = this.classesPerDep[i].CLASSROOMS;
        }
        break;
      }
    }
  }

  fillDepartementClasses() {
    for (let i = 0; i < this.departements.length; i++) {
      if (this.classesPerDep[i].DEP_ID == this.depId) {
        if (!this.classesPerDep[i].isFilled) {
          this.classesPerDep[i].CLASSROOMS = this.classes;
          this.classesPerDep[i].isFilled = true;
          $("#loading_spinner").hide();
          $("#class_sel_dom_el").attr("disabled", false);
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

  checkForSelectClasses(depId: number): boolean {
    return false;
  }

  onSearch() {
    let q = "";
    let queryName = "";
    const params = formatGraphQLParams(
      [
        "id",
        "nom",
        "marque",
        "numSerie",
        "categorie",
        "adresseIp",
        "dateAchat",
        { n: "classe", v: ["id", "nom"] }
      ],
      ""
    );

    if (this.classId > 0) {
      if (this.categorie == "ALL") {
        //tous materiels par classe
        q =
          '{"query":"{getMaterialsByClassroom(classroomId: ' +
          +this.classId +
          ") {" +
          params +
          '}}"}';
        queryName = "getMaterialsByClassroom";
        this.viewTitle = "Materiels Par Classe";
      } else {
        //tous materiels par classe  et par categorie
        q =
          '{"query":"{getMaterialsByClasseAndCategorie(classId: ' +
          +this.classId +
          ',categ: \\"' +
          this.categorie +
          '\\") {' +
          params +
          '}}"}';
        queryName = "getMaterialsByClasseAndCategorie";
        this.viewTitle = "Materiels Par Classe et Categorie";
      }
    } else if (this.depId > 0) {
      if (this.categorie == "ALL") {
        //tous materiels par departement
        q =
          '{"query":"{getMaterialsByDepartement(departementId: ' +
          +this.depId +
          ") {" +
          params +
          '}}"}';
        queryName = "getMaterialsByDepartement";
        this.viewTitle = "Materiels Par Departement";
      } else {
        //tous materiels par departement et par categorie
        q =
          '{"query":"{getMaterialsByDepartementAndCategorie(depId: ' +
          +this.depId +
          ',categ: \\"' +
          this.categorie +
          '\\") {' +
          params +
          '}}"}';
        queryName = "getMaterialsByDepartementAndCategorie";
        this.viewTitle = "Materiels Par Departement et Categorie";
      }
    } else {
      // find all by categorie
      if (this.categorie == "ALL") {
        q = '{"query":"{getAllMaterials {' + params + '}}"}';
        queryName = "getAllMaterials";
        this.viewTitle = "Tous le Materiel";
      } else {
        q =
          '{"query":"{getMaterialsByCategorie(categ: \\"' +
          this.categorie +
          '\\") {' +
          params +
          '}}"}';
        queryName = "getMaterialsByCategorie";
        this.viewTitle = "Materiels Par Categorie";
      }
    }
    this.matService.getMaterialsByQuery(q, queryName);
  }

  onDeleteMat(event) {
    $(event.target).attr("disabled", true);
    const id = +event.target.getAttribute("id").split("_")[1];
    this.matId = id;
    this.deletedElem = event.target;
    $("#my_delete_modal").modal();
  }

  onDeleteFromModal() {
    const q = '{"query":"{deleteMateriel(matId: ' + this.matId + ')}"}';
    this.matService.deleteMateriel(q).then(
      (resolvedData: Boolean) => {
        if (resolvedData) {
          $("#elem_mat_" + this.matId).fadeOut(2000, function () {
            $(this.deletedElem).attr("disabled", false);
          });
        }
      }
    );
  }

  onIgnoreDelete() {
    $(this.deletedElem).attr("disabled", false);
  }
}
