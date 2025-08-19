import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosActivosComponent } from './documentos-activos.component';

describe('DocumentosActivosComponent', () => {
  let component: DocumentosActivosComponent;
  let fixture: ComponentFixture<DocumentosActivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosActivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
