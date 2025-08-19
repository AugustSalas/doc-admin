import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntoDialogComponent } from './adjunto-dialog.component';

describe('AdjuntoDialogComponent', () => {
  let component: AdjuntoDialogComponent;
  let fixture: ComponentFixture<AdjuntoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjuntoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
