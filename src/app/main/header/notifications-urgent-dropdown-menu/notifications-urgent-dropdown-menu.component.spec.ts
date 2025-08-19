import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsUrgentDropdownMenuComponent } from './notifications-urgent-dropdown-menu.component';

describe('NotificationsDropdownMenuComponent', () => {
  let component: NotificationsUrgentDropdownMenuComponent;
  let fixture: ComponentFixture<NotificationsUrgentDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsUrgentDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsUrgentDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
