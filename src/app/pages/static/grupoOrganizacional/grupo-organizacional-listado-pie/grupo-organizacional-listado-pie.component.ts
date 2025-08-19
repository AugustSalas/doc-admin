import { Component, OnInit } from '@angular/core';
import { MembreteMdl } from 'src/app/_modelos/membrete';
import { MembreteService } from 'src/app/_utils/services/Service-Entidades/membrete.service';
import Swal from 'sweetalert2';
import { GrupoOrganizacionalService } from 'src/app/_utils/services/Service-Entidades/grupoOrganizacional.service';
import { GrupoOrganizacionalMdl, GrupoOrganizacionalMembreteMdl } from 'src/app/_modelos/grupoOrganizacional';

@Component({
  selector: 'app-grupo-organizacional-listado-pie',
  templateUrl: './grupo-organizacional-listado-pie.component.html',
  styleUrls: ['./grupo-organizacional-listado-pie.component.scss']
})
export class GrupoOrganizacionalListadoPieComponent implements OnInit {

  membrete: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl();
  membretes: GrupoOrganizacionalMembreteMdl[] = []
  data: any[] = []
  p: number = 1

  cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripción" },
    { field: "pieId", header: "Pie id" },
    { field: "dependencia", header: "Dependencia" },
    // { field: "base64", header: "membrete imagen" },
    //  { field: "Acciones", header: "Acciones" },
  ];

  constructor(private grupoOrganizacionalService: GrupoOrganizacionalService) { }

  ngOnInit() {
    this.grupoOrganizacionalService.GrupoOrganizacionalFindallPie()
      .subscribe(resp => {
        this.membretes = resp
        this.data = this.membretes;

        this.data.forEach(element => {

          try {
            element.pieId = element.grupoOrganizacional.piePaginaDocumentoFisico.nombre
          } catch {
            element.pieId = "";
          }

          try {
            element.dependencia = element.grupoOrganizacional.dependenciaId.nombre
          } catch {
            element.dependencia = "";
          }

          try {
            element.nombre = element.grupoOrganizacional.nombre
          } catch {
            element.nombre = "";
          }

          try {
            element.descripcion = element.grupoOrganizacional.descripcion
          } catch {
            element.descripcion = "";
          }
        })

      })
  }

  borrarGrupOrganizacional(buck: GrupoOrganizacionalMdl) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${buck.grupoOrganizacionalId}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.membretes = this.membretes.filter(b => b.grupoOrganizacional.grupoOrganizacionalId !== buck.grupoOrganizacionalId)
        this.data = this.membretes.filter(b => b.grupoOrganizacional.grupoOrganizacionalId !== buck.grupoOrganizacionalId)
        buck.ctrlActivo = false;
        console.log(buck)
        this.grupoOrganizacionalService.GrupoOrganizacionalRemove(
          buck.grupoOrganizacionalId).subscribe()
      }
    })
  }

}
