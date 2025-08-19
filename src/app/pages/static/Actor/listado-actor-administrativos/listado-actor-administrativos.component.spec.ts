import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActorAdministrativosComponent } from './listado-actor-administrativos.component';

describe('ListadoActorAdministrativosComponent', () => {
  let component: ListadoActorAdministrativosComponent;
  let fixture: ComponentFixture<ListadoActorAdministrativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoActorAdministrativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoActorAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
