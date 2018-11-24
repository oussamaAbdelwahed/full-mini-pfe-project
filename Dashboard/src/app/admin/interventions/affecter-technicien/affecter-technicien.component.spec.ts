import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterTechnicienComponent } from './affecter-technicien.component';

describe('AffecterTechnicienComponent', () => {
  let component: AffecterTechnicienComponent;
  let fixture: ComponentFixture<AffecterTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffecterTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
