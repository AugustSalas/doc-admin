import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoBase64Component } from './documento-base64.component';

describe('DocumentoBase64Component', () => {
  let component: DocumentoBase64Component;
  let fixture: ComponentFixture<DocumentoBase64Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoBase64Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoBase64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
