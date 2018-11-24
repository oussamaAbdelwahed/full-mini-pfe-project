import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewReclamationsComponent } from './list-new-reclamations.component';

describe('ListNewReclamationsComponent', () => {
  let component: ListNewReclamationsComponent;
  let fixture: ComponentFixture<ListNewReclamationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNewReclamationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
