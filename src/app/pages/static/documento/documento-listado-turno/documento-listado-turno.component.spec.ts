import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoListadoTurnoComponent } from './documento-listado-turno.component';

describe('DocumentoListadoTurnoComponent', () => {
  let component: DocumentoListadoTurnoComponent;
  let fixture: ComponentFixture<DocumentoListadoTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoListadoTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoListadoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
