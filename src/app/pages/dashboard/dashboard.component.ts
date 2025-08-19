import { Component, OnInit } from '@angular/core';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';
import { notificacionMdl } from 'src/app/_modelos/notificacion';
import { NotificacionesService } from 'src/app/_utils/services/notificaciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 

  notificaciones :notificacionMdl=new notificacionMdl()
  constructor(
    private notificacionesService: NotificacionesService, 
  ) { }

  ngOnInit() {
    this.notificacionesService.getNotificaciones().subscribe(resp => {
      this.notificacionesService.notificaciones=resp[0];
      this.notificaciones=resp[0];
    });
  }

}
