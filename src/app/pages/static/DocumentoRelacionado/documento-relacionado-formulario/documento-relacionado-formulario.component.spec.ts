import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoRelacionadoFormularioComponent } from './documento-relacionado-formulario.component';

describe('DocumentoRelacionadoFormularioComponent', () => {
  let component: DocumentoRelacionadoFormularioComponent;
  let fixture: ComponentFixture<DocumentoRelacionadoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoRelacionadoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoRelacionadoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
