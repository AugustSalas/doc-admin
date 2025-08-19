import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActorAdministrativosComponent } from './formulario-actor-administrativos.component';

describe('FormularioActorAdministrativosComponent', () => {
  let component: FormularioActorAdministrativosComponent;
  let fixture: ComponentFixture<FormularioActorAdministrativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioActorAdministrativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioActorAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
