import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarAddReclamationComponent } from './snack-bar-add-reclamation.component';

describe('SnackBarAddReclamationComponent', () => {
  let component: SnackBarAddReclamationComponent;
  let fixture: ComponentFixture<SnackBarAddReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarAddReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarAddReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
