import { Component, OnInit } from '@angular/core';
import { IntUsuPerService } from '../../../../_utils/services/Service-Entidades/IntUsuPer';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { IUsuarioPerfilMdl } from '../../../../_modelos/IUsuarioPerfil';

@Component({
  selector: 'app-actor',
  templateUrl: './IntUsuPer-listado.component.html',
  styleUrls: ['./IntUsuPer-listado.component.scss']
})



export class UsuarioAsignacionListadoComponent implements OnInit {

  data: any[] = []
  Iups: IUsuarioPerfilMdl[] = []
  p: number = 1
  cols: any[] = [

    { field: "usuarioNombre", header: "Usuario" },
    { field: "nombre", header: "Nombre" },
    { field: "apellidoPaterno", header: "Apellido Paterno" },
    { field: "apellidoMaterno", header: "Apellido Materno" },
    { field: "Acciones", header: "Acciones" },
  ];

  constructor(private iupService: IntUsuPerService) { }

  ngOnInit() {
    this.iupService.IntUsuPerFindall()
      .subscribe(resp => {
        this.Iups = resp
        this.Iups = this.Iups.filter(i => i.ctrlActivo == true)

        this.data = this.Iups;

        this.data.forEach(element => {

          try {
            element.usuarioNombre = element.usuario
          } catch{
            element.usuarioNombre = "";
          }

        })

      })
  }

  borrarIntermedia(intermedia: IUsuarioPerfilMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${intermedia.iusuarioPerfilId}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.Iups = this.Iups.filter(a => a.iusuarioPerfilId !== intermedia.iusuarioPerfilId)
        this.data = this.Iups.filter(a => a.iusuarioPerfilId !== intermedia.iusuarioPerfilId)
        intermedia.ctrlActivo = false;
        console.log(intermedia)
        this.iupService.IntUsuPerRemove(
          intermedia.iusuarioPerfilId
        ).subscribe()
      }
    })
  }
}
