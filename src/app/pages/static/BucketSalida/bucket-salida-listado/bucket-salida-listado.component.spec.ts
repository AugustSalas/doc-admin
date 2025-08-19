import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketSalidaListadoComponent } from './bucket-salida-listado.component';

describe('BucketSalidaListadoComponent', () => {
  let component: BucketSalidaListadoComponent;
  let fixture: ComponentFixture<BucketSalidaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketSalidaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketSalidaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
