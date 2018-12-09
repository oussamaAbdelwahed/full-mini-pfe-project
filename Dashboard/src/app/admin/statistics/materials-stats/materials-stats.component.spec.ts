import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsStatsComponent } from './materials-stats.component';

describe('MaterialsStatsComponent', () => {
  let component: MaterialsStatsComponent;
  let fixture: ComponentFixture<MaterialsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
