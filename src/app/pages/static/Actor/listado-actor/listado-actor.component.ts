import { Component, OnInit } from '@angular/core';
import { ActorsService } from '../../../../_utils/services/Service-Entidades/actor.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { ActorMdl } from '../../../../_modelos/actor';

@Component({
  selector: 'app-actor',
  templateUrl: './listado-actor.component.html',
  styleUrls: ['./listado-actor.component.scss']
})


export class ListadoActorComponent implements OnInit {

  data: any[] = []
  actors: ActorMdl[] = []
  p: number = 1
  Ancho = "100%";
  cols: any[] = [
    { field: "nombre", header: "Nombre" },
    { field: "apellidoPaterno", header: "Apellido Paterno" },
    { field: "apellidoMaterno", header: "Apellido Materno" },
    { field: "telefono", header: "Teléfono" },
    { field: "correoElectronico", header: "Correo Electronico" },
    { field: "interino", header: "Interino" },
    { field: "usuarioId", header: "Usuario" },
    { field: "tipoActorId", header: "Tipo Actor" },
    { field: "tratamientoId", header: "Grado Académico" },
    { field: "Acciones", header: "Acciones" },
  ];

  constructor(private AService: ActorsService) { }

  ngOnInit() {
    this.AService.ActorFindall()
      .subscribe(resp => {
        this.actors = resp
        this.actors = this.actors.filter(a => a.ctrlActivo == true)

        this.data = this.actors;
        console.log(this.cols);

        this.Ancho = (this.cols.length) * 22 + "%";
        this.data.forEach(element => {


          try {
            element.usuarioId = element.usuarioId.usuario
          } catch{
            element.usuarioId = "";
          }

          try {
            element.tipoActorId = element.tipoActorId.nombre
          } catch{
            element.tipoActorId = "";
          }

          try {
            element.tratamientoId = element.tratamientoId.nombre
          } catch{
            element.tratamientoId = "";
          }

        })

      })
  }

  borrarActor(act: ActorMdl, i: number) {
    Swal.fire({
      title: 'Eliminar',
      text: `Eliminará  ${act.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        // this.dependencias.splice(i, 1)
        this.actors = this.actors.filter(a => a.actorId !== act.actorId)
        this.data = this.actors.filter(a => a.actorId !== act.actorId)
        act.ctrlActivo = false;
        console.log(act)
        this.AService.ActorRemove(
          act.actorId
        ).subscribe()
      }
    })
  }
}
