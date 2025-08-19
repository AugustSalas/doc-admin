import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFormularioComponent } from './perfil-formulario.component';

describe('PerfilFormularioComponent', () => {
  let component: PerfilFormularioComponent;
  let fixture: ComponentFixture<PerfilFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
