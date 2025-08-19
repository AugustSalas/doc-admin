import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_utils/services/app.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';

@Component({
  selector: 'app-login-dropdown',
  templateUrl: './login-dropdown.component.html',
  styleUrls: ['./login-dropdown.component.scss']
})
export class LoginDropdownMenuComponent implements OnInit {
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }
  user: any = [];



  constructor(private elementRef: ElementRef, private renderer: Renderer2,
    private appService: AppService,
    public apiService: OpenApiService,
    private router: Router,

  ) { }

  ngOnInit() {
    var temp = this.apiService.getCurrentUser().nombre;
    this.apiService.ActualizarMenu();
    this.apiService.BuscarPermiso("","");

  }

  ChangePerfil(perfil: any) {
    sessionStorage.setItem('perfil', perfil)
    this.apiService.ActualizarMenu();

  }



  toggleDropdownMenu() {
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

  logout() {
    this.appService.logout();
  }

  password() {
    let user=this.apiService.getCurrentUser()
    this.router.navigate(['/iup/crear/'+user.usuario_id+'/local'], { skipLocationChange: true });       
  }


}
