import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOrganizacionalListadoComponent } from './grupo-organizacional-listado.component';

describe('GrupoOrganizacionalListadoComponent', () => {
  let component: GrupoOrganizacionalListadoComponent;
  let fixture: ComponentFixture<GrupoOrganizacionalListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOrganizacionalListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOrganizacionalListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
