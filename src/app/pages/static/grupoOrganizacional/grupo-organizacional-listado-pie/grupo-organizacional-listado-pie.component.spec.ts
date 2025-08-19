import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOrganizacionalListadoPieComponent } from './grupo-organizacional-listado-pie.component';

describe('GrupoOrganizacionalListadoPieComponent', () => {
  let component: GrupoOrganizacionalListadoPieComponent;
  let fixture: ComponentFixture<GrupoOrganizacionalListadoPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOrganizacionalListadoPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOrganizacionalListadoPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
