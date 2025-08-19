import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuseDialogComponent } from './acuse-dialog.component';

describe('AcuseDialogComponent', () => {
  let component: AcuseDialogComponent;
  let fixture: ComponentFixture<AcuseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcuseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcuseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
