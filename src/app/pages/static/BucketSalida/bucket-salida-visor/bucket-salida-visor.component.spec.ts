import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketSalidaVisorComponent } from './bucket-salida-visor.component';

describe('BucketSalidaVisorComponent', () => {
  let component: BucketSalidaVisorComponent;
  let fixture: ComponentFixture<BucketSalidaVisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketSalidaVisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketSalidaVisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
