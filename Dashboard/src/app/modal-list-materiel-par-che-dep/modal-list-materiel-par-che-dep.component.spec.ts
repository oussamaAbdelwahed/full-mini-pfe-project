import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListMaterielParCheDepComponent } from './modal-list-materiel-par-che-dep.component';

describe('ModalListMaterielParCheDepComponent', () => {
  let component: ModalListMaterielParCheDepComponent;
  let fixture: ComponentFixture<ModalListMaterielParCheDepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListMaterielParCheDepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListMaterielParCheDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
