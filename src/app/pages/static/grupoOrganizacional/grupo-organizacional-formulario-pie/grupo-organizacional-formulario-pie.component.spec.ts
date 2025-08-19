import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOrganizacionalFormularioPieComponent } from './grupo-organizacional-formulario-pie.component';

describe('GrupoOrganizacionalFormularioPieComponent', () => {
  let component: GrupoOrganizacionalFormularioPieComponent;
  let fixture: ComponentFixture<GrupoOrganizacionalFormularioPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOrganizacionalFormularioPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOrganizacionalFormularioPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
