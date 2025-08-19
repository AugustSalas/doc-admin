import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoRelacionadoListadoComponent } from './documento-relacionado-listado.component';

describe('DocumentoRelacionadoListadoComponent', () => {
  let component: DocumentoRelacionadoListadoComponent;
  let fixture: ComponentFixture<DocumentoRelacionadoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoRelacionadoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoRelacionadoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
