import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosListEnviadosComponent } from './turnos-list-enviados.component';

describe('TurnosListEnviadosComponent', () => {
  let component: TurnosListEnviadosComponent;
  let fixture: ComponentFixture<TurnosListEnviadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosListEnviadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosListEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
