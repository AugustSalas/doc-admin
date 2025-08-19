import { Component, OnInit } from '@angular/core';
import { ActorMdl, FuncionesMdl, ActorFuncionesMdl } from 'src/app/_modelos/actor';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import { ActorsService } from 'src/app/_utils/services/Service-Entidades/actor.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioMdl } from 'src/app/_modelos/Usuario';
import { TipoActorMdl } from 'src/app/_modelos/TipoActor';
import { TratamientoMdl } from 'src/app/_modelos/Tratamiento';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';

@Component({
  selector: 'app-formulario-actor-administrativos',
  templateUrl: './formulario-actor-administrativos.component.html',
  styleUrls: ['./formulario-actor-administrativos.component.scss']
})
export class FormularioActorAdministrativosComponent implements OnInit {

  actor: ActorMdl = new ActorMdl()

  formGroup: FormGroup;
  formGroupUsuarios: FormGroup;

  ListadoOrganizacion: any[];
  ListadoOrganizacionFiltrada: any[];

  get f() { return this.formGroup.controls; }
  get u() { return this.formGroupUsuarios.controls; }

  isSave: boolean = true

  UsuarioBase: any;
  UsuarioAdicionales: any[] = [];


  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private Actorservice: ActorsService,
    public apiService: OpenApiService,
    private dinamicoService: DinamicoService,

  ) {

    this.formGroup = this._formbuilder.group(this.actor);

    this.formGroupUsuarios = this._formbuilder.group({
      usuarioAdicional: ['', []],
      usuarioBase: ['', [Validators.required]]

    });

  }

  ngOnInit() {


    this.dinamicoService.getListado("/webresources/grupoorganizacional/listgoo/").subscribe(respGrupos => {
      debugger

      this.ListadoOrganizacion = respGrupos;

      const id = this.route.snapshot.paramMap.get('id')
      if (id !== 'new') {
        this.isSave = false
        //Editar
        this.Actorservice.ActorFind(Number(id))
          .subscribe((resp: ActorMdl) => {

            this.actor = resp
            debugger
            this.actor.usuarioId = this.actor.usuarioId.usuarioId;
            this.actor.tipoActorId = this.actor.tipoActorId.tipoActorId;
            this.actor.tratamientoId = this.actor.tratamientoId.tratamientoId;

            let baseJson = {};
            try {

              if (this.actor.funciones == "[]") {

                baseJson = JSON.parse(' [{"base":[],"adicionales":[]}] ');

              }
              else {
                baseJson = JSON.parse(this.actor.funciones);
              }

              this.UsuarioBase = this.ListadoOrganizacion.find(org => org.grupo_organizacional_actor_id == baseJson[0].base[0].grupo_organizacional_id
                && org.organizacion_actor_id == baseJson[0].base[0].organizacion_id

              )


              baseJson[0].adicionales.forEach(element => {

                let adicional = this.ListadoOrganizacion.find(org => org.grupo_organizacional_actor_id == element.grupo_organizacional_id
                  && org.organizacion_actor_id == element.organizacion_id)
                if (adicional) {
                  this.UsuarioAdicionales.push(adicional);
                }

              });

              this.formGroupUsuarios.controls.usuarioBase.setValue(this.UsuarioBase);
              this.formGroupUsuarios.controls.usuarioAdicional.setValue(this.UsuarioAdicionales);

              this.ListadoOrganizacionFiltrada = this.ListadoOrganizacion.filter(org => (org.actor_id != this.UsuarioBase.actor_id))



            } catch (error) {
              baseJson = JSON.parse(' [{"base":[],"adicionales":[]}] ');
            }


            debugger



            this.formGroup = this._formbuilder.group(this.actor);

            this.formGroup.controls.nombre.disable();
            this.formGroup.controls.apellidoPaterno.disable();
            this.formGroup.controls.apellidoMaterno.disable();
            this.formGroup.controls.telefono.disable();
            this.formGroup.controls.correoElectronico.disable();

          })
      }
    });


    //obtengo el parametro en la ruta GET

  }

  //guardarDependencia(form: NgForm){
  guardarActor() {

    debugger

    if (this.formGroup.invalid) {
      //Aquí va la validación del form
      console.log(this.formGroup)
      console.log('Form no valido')
      return
    }

    if (this.formGroupUsuarios.invalid) {
      //Aquí va la validación del form
      console.log(this.formGroupUsuarios)
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

    this.actor = this.formGroup.getRawValue();
    this.actor.ctrlActivo = true;
    this.actor.ctrlCreadoPor = 1;
    this.actor.ctrlActualizado = new Date();
    this.actor.ctrlActualizadoPor = 1;
    this.actor.usuarioId = Number(this.actor.usuarioId);
    this.actor.tipoActorId = Number(this.actor.tipoActorId);
    this.actor.tratamientoId = Number(this.actor.tratamientoId);

    let funciones: FuncionesMdl = new FuncionesMdl();
    let funcionesBase: ActorFuncionesMdl = new ActorFuncionesMdl();
    funcionesBase.grupo_organizacional_id = this.UsuarioBase.grupo_organizacional_actor_id;
    funcionesBase.organizacion_id = this.UsuarioBase.organizacion_actor_id;

    funciones.base.push(funcionesBase);

    this.UsuarioAdicionales.forEach(element => {

      let funcionesAdicionales: ActorFuncionesMdl = new ActorFuncionesMdl();
      funcionesAdicionales.grupo_organizacional_id = element.grupo_organizacional_actor_id;
      funcionesAdicionales.organizacion_id = element.organizacion_actor_id;

      funciones.adicionales.push(funcionesAdicionales);

    });

    this.actor.funciones = "[" + JSON.stringify(funciones) + "]";

    debugger

    Swal.showLoading()

    if (this.actor.actorId) {
      this.actor.ctrlCreado = this.actor.ctrlCreado
      peticion = this.Actorservice.ActorEdit(this.actor.actorId, this.actor)

      console.log(this.actor)
    }

    else {
      this.actor.ctrlCreado = new Date()
      console.log(this.actor)
      peticion = this.Actorservice.ActorCreate(this.actor)
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

  onUsuario(event: any) {
    //    this.usuario = this.usuarios.find(usu => usu.usuarioId === event)
  }

  onUsuarioBaseSelect(valor) {
    this.ListadoOrganizacionFiltrada = this.ListadoOrganizacion.filter(org => (org.actor_id != valor.actor_id))
    this.UsuarioAdicionales = this.UsuarioAdicionales.filter(org => (org.actor_id != valor.actor_id))


    this.UsuarioBase = valor

    this.formGroupUsuarios.controls.usuarioBase.setValue(this.UsuarioBase);
    this.formGroupUsuarios.controls.usuarioAdicional.setValue(this.UsuarioAdicionales);

  }



}

