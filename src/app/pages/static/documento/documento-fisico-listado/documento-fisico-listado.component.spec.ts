import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoFisicoListadoComponent } from './documento-fisico-listado.component';

describe('DocumentoFisicoListadoComponent', () => {
  let component: DocumentoFisicoListadoComponent;
  let fixture: ComponentFixture<DocumentoFisicoListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoFisicoListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoFisicoListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
