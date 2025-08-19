import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DinamicoService } from './dinamico.service';
import { notificacionMdl } from 'src/app/_modelos/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  notificaciones :notificacionMdl=new notificacionMdl()

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,

  ) { }


  AlertaUrgente() {
    const audio = new Audio('assets/sounds/SD_ALERT_29.mp3');
    audio.play();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.openFromTemplate
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getNotificaciones(){

      //return this.http.get(`${URL_API}/openapi.json`).pipe(map(this.crearListaItem));
      return this.http.get<any[]>((`${environment.apiURL}/webresources/notificaciones`));

  }
 



}
