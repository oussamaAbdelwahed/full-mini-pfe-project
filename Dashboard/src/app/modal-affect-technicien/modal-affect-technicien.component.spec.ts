import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAffectTechnicienComponent } from './modal-affect-technicien.component';

describe('ModalAffectTechnicienComponent', () => {
  let component: ModalAffectTechnicienComponent;
  let fixture: ComponentFixture<ModalAffectTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAffectTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAffectTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
