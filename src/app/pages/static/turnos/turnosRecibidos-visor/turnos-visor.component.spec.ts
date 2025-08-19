import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosVisorComponent } from './turnos-visor.component';

describe('TurnosVisorComponent', () => {
  let component: TurnosVisorComponent;
  let fixture: ComponentFixture<TurnosVisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosVisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
