import { Component, OnInit, ViewChild, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, } from '@angular/animations';
import { NotificacionesService } from 'src/app/_utils/services/notificaciones.service';
import { MessageService } from "primeng/api"

@Component({
  selector: 'app-notifications-urgent-dropdown-menu',
  templateUrl: './notifications-urgent-dropdown-menu.component.html',
  styleUrls: ['./notifications-urgent-dropdown-menu.component.scss'],
  animations: [
    trigger('shakeit', [
      state('shakestart', style({
        transform: 'scale(1)',
      })),
      state('shakeend', style({
        transform: 'scale(1)',
      })),
      transition('shakestart => shakeend', animate('1000ms ease-in', keyframes([
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 }),
      ]))),
    ])]
})
export class NotificationsUrgentDropdownMenuComponent implements OnInit {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  isOpen = true;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2,
    private notificacionService: NotificacionesService,
    private messageService: MessageService
   

    ) { }

  ngOnInit() { 
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleDropdownMenu() {
    this.isOpen = !this.isOpen;

    this.messageService.add({severity:'success', summary: 'Oficio', detail:'Oficio mensaje'});
    this.notificacionService.AlertaUrgente();
    
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();

    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }
}
