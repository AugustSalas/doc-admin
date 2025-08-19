import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginDropdownMenuComponent } from './login-dropdown.component';

describe('LoginDropdownMenuComponent', () => {
  let component: LoginDropdownMenuComponent;
  let fixture: ComponentFixture<LoginDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
