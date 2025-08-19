import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoFisicoFormularioComponent } from './documento-fisico-formulario.component';

describe('DocumentoFisicoFormularioComponent', () => {
  let component: DocumentoFisicoFormularioComponent;
  let fixture: ComponentFixture<DocumentoFisicoFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoFisicoFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoFisicoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
