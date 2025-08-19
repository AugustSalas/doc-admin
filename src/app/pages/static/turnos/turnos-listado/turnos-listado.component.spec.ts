import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosListadoComponent } from './turnos-listado.component';

describe('TurnosListadoComponent', () => {
  let component: TurnosListadoComponent;
  let fixture: ComponentFixture<TurnosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
