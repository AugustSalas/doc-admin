import { Component, OnInit } from '@angular/core';
import { MembreteMdl } from 'src/app/_modelos/membrete';
import { MembreteService } from 'src/app/_utils/services/Service-Entidades/membrete.service';
import Swal from 'sweetalert2';
import { GrupoOrganizacionalService } from 'src/app/_utils/services/Service-Entidades/grupoOrganizacional.service';
import { GrupoOrganizacionalMdl, GrupoOrganizacionalMembreteMdl } from 'src/app/_modelos/grupoOrganizacional';

@Component({
  selector: 'app-grupo-organizacional-listado',
  templateUrl: './grupo-organizacional-listado.component.html',
  styleUrls: ['./grupo-organizacional-listado.component.scss']
})
export class GrupoOrganizacionalListadoComponent implements OnInit {

  membrete: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl();
  membretes: GrupoOrganizacionalMembreteMdl[] = []
  data: any[] = []
  p: number = 1

  cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "descripcion", header: "Descripción" },
    { field: "membreteId", header: "Membrete id" },
    { field: "dependencia", header: "Dependencia" },
   // { field: "base64", header: "membrete imagen" },
  //  { field: "Acciones", header: "Acciones" },
  ];

  constructor(private grupoOrganizacionalService: GrupoOrganizacionalService) { }

  ngOnInit() {
    this.grupoOrganizacionalService.GrupoOrganizacionalFindallMembrete()
      .subscribe(resp => {
        this.membretes = resp
        this.data = this.membretes;

        this.data.forEach(element => {

          try {
            element.membreteId = element.grupoOrganizacional.membrete.nombre
          } catch{
            element.membreteId = "";
          }

          try {
            element.dependencia = element.grupoOrganizacional.dependenciaId.nombre
          } catch{
            element.dependencia = "";
          }

          try {
            element.nombre = element.grupoOrganizacional.nombre
          } catch{
            element.nombre = "";
          }

          try {
            element.descripcion = element.grupoOrganizacional.descripcion
          } catch{
            element.descripcion = "";
          }
        })

      })
  }

  borrarBucket(buck: GrupoOrganizacionalMdl, i: number) {
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
