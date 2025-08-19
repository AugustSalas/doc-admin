import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorAcusesComponent } from './visor-acuses.component';

describe('VisorAcusesComponent', () => {
  let component: VisorAcusesComponent;
  let fixture: ComponentFixture<VisorAcusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorAcusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorAcusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
