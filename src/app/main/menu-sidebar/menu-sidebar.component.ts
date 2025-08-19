import {
  Component,
  OnInit,
  AfterViewInit,
  Renderer2,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { AppService } from 'src/app/_utils/services/app.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @ViewChild('side', { static: false }) sidebar;

  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  filtro:string="";
  menuCount:number=0;

  constructor(public appService: AppService,  public openApi: OpenApiService) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }

}
