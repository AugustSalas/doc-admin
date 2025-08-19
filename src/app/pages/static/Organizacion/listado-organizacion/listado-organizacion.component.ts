import { Component, OnInit } from '@angular/core';
import {OrganizacionService} from '../../../../_utils/services/Service-Entidades/Organizacion.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { OrganizacionMdl } from '../../../../_modelos/organizacion';

@Component({
  selector: 'app-actor',
  templateUrl: './listado-organizacion.component.html',
  styleUrls: ['./listado-organizacion.component.scss']
})


export class ListadoOrganizacionComponent implements OnInit {

  data: any[] = []
  organizacion: OrganizacionMdl[] = []
  Ancho = "100%";
  p: number = 1
  cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripción" },
    { field: "prefijo", header: "Prefijo" },
    { field: "folioEntradaOrganizacion", header: "Folio Entrada" },
    { field: "folioSalidaOrganizacion", header: "Folio Salida" },
    { field: "nombreTitular", header: "Titular Área" },
    { field: "puesto", header: "Puesto" },
    { field: "membreteNombre", header: "Membrete" },
    { field: "grupoOrganizacionalId", header: "Área de adscripción" },
    { field: "OrganizacionPadre", header: "Área Padre" },
    { field: "Acciones", header: "Acciones" },
  ];

  constructor(private OService: OrganizacionService) { }

  ngOnInit() {
    this.OService.OrganizacionFindall()
      .subscribe(resp => {
        this.organizacion = resp
        this.organizacion = this.organizacion.filter(orga => orga.ctrlActivo == true)

        this.data = this.organizacion;
        this.Ancho = (this.cols.length) * 20 + "%";
        this.data.forEach(element => {


          try {
            element.grupoOrganizacionalId = element.grupoOrganizacionalId.nombre
          } catch{
            element.grupoOrganizacionalId = "";
          }

          try {
            element.OrganizacionPadre = element.organizacionIdPadre.nombre
          } catch{
            element.OrganizacionPadre = "";
          }

          try {
            element.nombreTitular = element.titularOrganizacion.nombre
          } catch{
            element.nombreTitular = "";
          }

          try {
            element.membreteNombre = element.membrete.nombreArchivoOriginal
          } catch{
            element.membreteNombre = "";
          }



        })

      })
  }

  borrarOrganizacion(org: OrganizacionMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${org.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.organizacion = this.organizacion.filter(a => a.organizacionId !== org.organizacionId)
        this.data = this.organizacion.filter(a => a.organizacionId !== org.organizacionId)
        org.ctrlActivo = false;
        console.log(org)
        this.OService.OrganizacionRemove(
          org.organizacionId
        ).subscribe()
      }
    })
  }
}
