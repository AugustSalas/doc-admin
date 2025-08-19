import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorAdjuntosComponent } from './visor-adjuntos.component';

describe('VisorAdjuntosComponent', () => {
  let component: VisorAdjuntosComponent;
  let fixture: ComponentFixture<VisorAdjuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorAdjuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorAdjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
