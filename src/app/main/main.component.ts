import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { OpenApiService } from '../_utils/services/open-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = true;
  @ViewChild('contentWrapper', { static: false }) contentWrapper;
  @ViewChild('sideBar', { static: false }) sideBar;
  alturaMenu = "100%";

  constructor(private renderer: Renderer2,
    private openApi: OpenApiService,

    ) { }


  ngOnInit() {
    this.openApi.getDerechos()
      .subscribe(resp => {

        console.log(resp);
        sessionStorage.setItem('openApi', JSON.stringify(resp));
        let temp = this.openApi.CrearMenu(resp.paths);

      });

    this.sideBar
  }

  AlturaMenu() {

    setTimeout(() => {
      this.alturaMenu = this.sideBar.sidebar.nativeElement.scrollHeight + "px";

    },
      350);

  }

  mainSidebarHeight(height) {
 /*  this.renderer.setStyle(
       this.contentWrapper.nativeElement,
       'min-height',
       height - 114 + 'px'
     ); */
  }

  toggleMenuSidebar() {
    // console.log('sidebarMenuCollapsed', this.sidebarMenuOpened);
    if (this.sidebarMenuOpened) { // open
      this.renderer.removeClass(document.body, 'sidebar-open');
      this.renderer.addClass(document.body, 'sidebar-collapse');
      this.sidebarMenuOpened = false;
    } else { // close
      this.renderer.removeClass(document.body, 'sidebar-collapse');
      this.renderer.addClass(document.body, 'sidebar-open');
      this.sidebarMenuOpened = true;
    }
  }
}
