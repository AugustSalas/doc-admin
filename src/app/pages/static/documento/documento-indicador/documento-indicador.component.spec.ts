import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoIndicadorComponent } from './documento-indicador.component';

describe('DocumentoIndicadorComponent', () => {
  let component: DocumentoIndicadorComponent;
  let fixture: ComponentFixture<DocumentoIndicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoIndicadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoIndicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
