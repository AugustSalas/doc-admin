import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOrganizacionalFormularioComponent } from './grupo-organizacional-formulario.component';

describe('GrupoOrganizacionalFormularioComponent', () => {
  let component: GrupoOrganizacionalFormularioComponent;
  let fixture: ComponentFixture<GrupoOrganizacionalFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOrganizacionalFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOrganizacionalFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
