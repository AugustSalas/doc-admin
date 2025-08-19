import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActorMdl } from 'src/app/_modelos/actor';
import { ActorsService } from 'src/app/_utils/services/Service-Entidades/actor.service';

@Component({
  selector: 'app-listado-actor-administrativos',
  templateUrl: './listado-actor-administrativos.component.html',
  styleUrls: ['./listado-actor-administrativos.component.scss']
})
export class ListadoActorAdministrativosComponent implements OnInit {


  data: any[] = []
  actors: ActorMdl[] = []
  p: number = 1
  Ancho = "100%";
  cols: any[] = [

    //{ field: "actor_id", header: "Funcionario id" },
    { field: "nombre_actor", header: "Nombre" },
    { field: "grupo_organizacional_actor", header: "Área de adscripción" },
    { field: "Acciones", header: "Acciones" },

  ];

  constructor(private AService: ActorsService) { }

  ngOnInit() {
    this.AService.ActorFindallAdmins()
      .subscribe(resp => {
        this.actors = resp
        // this.Ancho = (this.cols.length) * 22 + "%";
        // this.actors = this.actors.filter(a => a.ctrlActivo == true)
        this.data = this.actors;


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
