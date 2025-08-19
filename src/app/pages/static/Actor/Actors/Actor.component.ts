import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsService} from 'src/app/_utils/services/Service-Entidades/actor.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuarioMdl } from 'src/app/_modelos/Usuario';
import { TratamientoMdl } from 'src/app/_modelos/Tratamiento';
import { TipoActorMdl} from 'src/app/_modelos/TipoActor';
import { ActorMdl } from 'src/app/_modelos/actor';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';



@Component({
    selector: 'app-actor',
    templateUrl: './Actor.component.html',
    styleUrls: ['./Actor.component.scss']
})


export class ActoresComponent implements OnInit {

  actor: ActorMdl = new ActorMdl()
  
  usuario: UsuarioMdl = new UsuarioMdl()
  usuarios: UsuarioMdl[] = []
  usuarioss : number = 0;

  TA: TipoActorMdl = new TipoActorMdl()
  TAs: TipoActorMdl[] = []
  TAss: number = 0;

  tratamiento: TratamientoMdl = new TratamientoMdl()
  tratamientos: TratamientoMdl[] = []
  tratamientoss: number = 0;
 
   

    formGroup: FormGroup;

    get f() { return this.formGroup.controls; }
    isSave: boolean = true

    constructor(
        private _formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private Route: Router,
        private dinamicoService: DinamicoService,
        private AService: ActorsService,
        public apiService: OpenApiService,) {

        this.formGroup = this._formbuilder.group(this.actor);

    }

    ngOnInit() {

        debugger

        this.AService.GetTratamiento()
        .subscribe(res => {
          
          this.tratamientos = res
        })
  
        this.AService.GetTipoActor()
        .subscribe(res => {
          
          this.TAs = res
        })

        this.AService.GetUsuario()
        .subscribe(res => {
          
          this.usuarios = res
        })

      

            debugger

        const id = this.route.snapshot.paramMap.get('id')
        if (id !== 'new') {
            this.isSave = false

            this.AService.ActorFind(Number(id)).subscribe((resp: ActorMdl) => {

                debugger
                this.actor = resp

                this.actor.tratamientoId = this.actor.tratamientoId.tratamientoId;
                this.actor.tipoActorId = this.actor.tipoActorId.tipoActorId;

                if(this.actor.usuarioId != null){
                this.actor.usuarioId = this.actor.usuarioId.usuarioId
                }


                this.formGroup = this._formbuilder.group(this.actor);

            })



        }

    }


    guardarActor() {

        debugger

        if (this.formGroup.invalid) {
            //Aquí va la validación del form
            console.log(this.formGroup)
            console.log('Form no valido')
            return
        }
        let peticion: Observable<any>
        Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            icon: 'info',
            allowOutsideClick: false
        })

        debugger

        this.actor = this.formGroup.value;
        this.actor.ctrlActivo = true;
        this.actor.ctrlCreadoPor = 1;
        this.actor.ctrlActualizado = new Date();
        this.actor.ctrlActualizadoPor = 1;
        this.actor.tipoActorId = Number(this.actor.tipoActorId);
        this.actor.tratamientoId = Number(this.actor.tratamientoId);

        if(this.actor.usuarioId == 0){

        this.actor.usuarioId = null

        }else{

        this.actor.usuarioId = Number(this.actor.usuarioId)

        }
        
        Swal.showLoading()

        if (this.actor.actorId) {
            this.actor.ctrlCreado = this.actor.ctrlCreado
            debugger
            peticion = this.AService.ActorEdit(this.actor.actorId, this.actor)

            console.log(this.actor)
        }

        else {
            this.actor.ctrlCreado = new Date()
            console.log(this.actor)
            debugger
            peticion = this.AService.ActorCreate(this.actor)
        }

        peticion.subscribe(resp => {
            Swal.fire({
                title: this.actor.nombre,
                text: 'Realizado correctamente',
                icon: 'success',
            })
        },

            error => {
                if (error) {

                }

                Swal.fire({
                    title: this.actor.nombre,
                    text: 'error',
                    icon: 'error',
                })
            },

        )


    }

}



