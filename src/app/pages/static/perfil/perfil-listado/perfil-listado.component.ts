import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PerfilService } from 'src/app/_utils/services/Service-Entidades/perfil.service';

@Component({
  selector: 'app-perfil-listado',
  templateUrl: './perfil-listado.component.html',
  styleUrls: ['./perfil-listado.component.scss']
})
export class PerfilListadoComponent implements OnInit {


  data: any[] = []
  organizacion: any[] = []
  p: number = 1
  cols: any[] = [
    { field: "perfilId", header: "Perfil Id" },
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripción" },
    { field: "Acciones", header: "Acciones" },
  ];

  constructor(private OService: PerfilService) { }

  ngOnInit() {
    this.OService.perfilFindall()
      .subscribe(resp => {
        debugger
        this.organizacion = resp
        this.data = this.organizacion;
      

      })
  }

  borrarPerfil(org: any, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${org.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.organizacion = this.organizacion.filter(a => a.perfilId !== org.perfilId)
        this.data = this.organizacion.filter(a => a.perfilId !== org.perfilId)
        org.ctrlActivo = false;
        console.log(org)
        this.OService.perfilRemove(
          org.perfilId
        ).subscribe()
      }
    })
  }
}