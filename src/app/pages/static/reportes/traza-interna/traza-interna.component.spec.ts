import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazaInternaComponent } from './traza-interna.component';

describe('TrazaInternaComponent', () => {
  let component: TrazaInternaComponent;
  let fixture: ComponentFixture<TrazaInternaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrazaInternaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazaInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
