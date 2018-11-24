import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicienService } from '../../../services/technicien.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Technicien } from 'src/app/models/technicien.model';
import { Location } from '@angular/common';

@Component({
  selector: "app-affecter-technicien",
  templateUrl: "./affecter-technicien.component.html",
  styleUrls: ["./affecter-technicien.component.css"]
})
export class AffecterTechnicienComponent implements OnInit {
  private recId: number;
  private techSubSubsc: Subscription;
  public groupedTechs: any;
  public workTypes: string[] = [];
  public techniciens: Technicien[] = [];
  public form: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private technicienService: TechnicienService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.getReclamationId();
    this.technicienService.getGroupedTechsByWorkType();
    this.subscribeToTechSub();
    this.initForm();
  }

  getReclamationId() {
    this.activatedRoute.params.subscribe(params => {
      this.recId = params["id"];
    });
  }

  subscribeToTechSub() {
    this.techSubSubsc = this.technicienService.techsSub.subscribe(
      (emittedData: any) => {
        this.groupedTechs = emittedData;
        this.fillArrays();
      }
    );
  }

  initForm() {
    this.form = this.formBuilder.group({
      workType: [""],
      technicien: ["", Validators.required],
      dateExecution: ["", Validators.required]
    });
  }

  fillArrays() {
    for (let key in this.groupedTechs) {
      this.workTypes.push(key);
      for (let i = 0; i < this.groupedTechs[key].length; i++) {
        this.techniciens.push(this.groupedTechs[key][i]);
      }
    }
  }

  onChangeWorkType(event) {
    const workType=event.target.value;
    this.techniciens = this.groupedTechs[workType];
  }

  onSubmitForm() {
    const formValue = this.form.value;
    formValue["reclamation"] = this.recId;
    this.technicienService.affectTechnicienToReclamation(formValue).then(
      (resolvedData: boolean) => {
        if(resolvedData) {
          this.location.back();
        }
      }
    ); 
  }
}
