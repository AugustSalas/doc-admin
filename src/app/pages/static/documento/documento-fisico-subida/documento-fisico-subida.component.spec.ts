import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoFisicoSubidaComponent } from './documento-fisico-subida.component';

describe('DocumentoFisicoSubidaComponent', () => {
  let component: DocumentoFisicoSubidaComponent;
  let fixture: ComponentFixture<DocumentoFisicoSubidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoFisicoSubidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoFisicoSubidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
