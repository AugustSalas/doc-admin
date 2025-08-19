import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosEstatusComponent } from './documentos-estatus.component';

describe('DocumentosActivosComponent', () => {
  let component: DocumentosEstatusComponent;
  let fixture: ComponentFixture<DocumentosEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
