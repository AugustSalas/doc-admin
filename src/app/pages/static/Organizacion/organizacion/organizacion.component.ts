import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrganizacionService } from 'src/app/_utils/services/Service-Entidades/Organizacion.service';
import { OpenApiService } from 'src/app/_utils/services/open-api.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { OrganizacionMdl } from 'src/app/_modelos/organizacion';
import { GrupoOrganizacionalMdl } from 'src/app/_modelos/grupoOrganizacional';
import { ActorMdl } from 'src/app/_modelos/actor';
import { DinamicoService } from 'src/app/_utils/services/dinamico.service';



@Component({
  selector: 'app-macro',
  templateUrl: './organizacion.component.html',
  styleUrls: ['./organizacion.component.scss']
})


export class OrganizacionComponent implements OnInit {


  organizacion: OrganizacionMdl = new OrganizacionMdl()
  org:any
  orga:OrganizacionMdl[]=[];


  go: GrupoOrganizacionalMdl = new GrupoOrganizacionalMdl()
  gos: GrupoOrganizacionalMdl[] = []
  goss: number = 0;

  actor: ActorMdl = new ActorMdl()
  actors: ActorMdl[] = []
  actorss: number = 0;



  formGroup: FormGroup;

  get f() { return this.formGroup.controls; }
  isSave: boolean = true

  constructor(
    private _formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private Oservice: OrganizacionService,
    private dinamicoService: DinamicoService,
    public apiService: OpenApiService,


  ) {
    this.formGroup = this._formbuilder.group(this.organizacion);
  }

  ngOnInit() {


    debugger

    this.Oservice.GetGO()
      .subscribe(res => {

        this.gos = res
      })



    //obtengo el parametro en la ruta GET
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'new') {
      this.isSave = false
      debugger
      //Editar
      this.Oservice.OrganizacionFind(Number(id)).subscribe((resp: OrganizacionMdl) => {

        this.dinamicoService.getListado("/webresources/actor").subscribe(respActores => {

          respActores.forEach(element => {
            element.NombreCompleto = element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno;
          })
          debugger

          this.actors = respActores;

          this.organizacion = resp

          this.goss = resp.grupoOrganizacionalId.grupoOrganizacionalId;
          this.go = this.gos.find(g => g.grupoOrganizacionalId == this.goss)

          this.organizacion.grupoOrganizacionalId = this.organizacion.grupoOrganizacionalId.grupoOrganizacionalId;

          if(this.organizacion.organizacionIdPadre != null){
            this.organizacion.organizacionIdPadre= this.organizacion.organizacionIdPadre.organizacionId
            }

          let endpointActor = this.apiService.BuscarEndpointPorClase("#/components/schemas/Actor");

          this.actor = this.actors.find(a => a.actorId == this.organizacion.titularOrganizacion.actorId)
          this.organizacion.titularOrganizacion = this.actor

          debugger

          this.Oservice.ListaOrganizacion(this.goss)
          .subscribe(res => {
            this.org = res
            this.goss = this.organizacion.grupoOrganizacionalId;

          this.formGroup = this._formbuilder.group(this.organizacion);

        })

      })



      })
    } else {
      this.dinamicoService.getListado("/webresources/actor").subscribe(respActores => {

        respActores.forEach(element => {
          element.NombreCompleto = element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno;
        })
        debugger
        this.actors = respActores;

      })
    }
    
  }


  
  onSelectOrg(id: number) {
    debugger
    this.Oservice.ListaOrganizacion(id)
      .subscribe(res => {
        this.org = res
      })
  }

  //guardarDependencia(form: NgForm){
  guardarOrganizacion() {

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

    let temp = this.formGroup.value;
    temp = this.formGroup.value;
    temp.ctrlActivo = true;
    temp.ctrlCreadoPor = 1;
    temp.ctrlActualizado = new Date();
    temp.ctrlActualizadoPor = 1;
    temp.ctrlCreado = new Date();
    temp.titularOrganizacion = Number(temp.titularOrganizacion.actorId);

    debugger

    if(temp.organizacionId != null && temp.organizacionId != temp.organizacionIdPadre) { // PUT ORGANIZACION

    debugger
    this.organizacion.organizacionId = temp.organizacionId

    }
    
    
    if(this.organizacion.organizacionIdPadre == ""){ //POST CON ORGANIZACION PADRE

      debugger
    temp.organizacionIdPadre = Number(this.organizacion.organizacionId);
    temp.organizacionId =  this.organizacion.organizacionId = null;

    }

    if(temp.organizacionIdPadre == 0){ // POST SIN ORGANIZACION PADRE

      temp.organizacionIdPadre =  this.organizacion.organizacionIdPadre = null;
      temp.organizacionId =  this.organizacion.organizacionId = null;
     

    }




    

    Swal.showLoading()

    debugger

    if (this.organizacion.organizacionId) {
      this.organizacion.ctrlCreado = this.organizacion.ctrlCreado
      peticion = this.Oservice.OrganizacionEdit(this.organizacion.organizacionId, temp)

      console.log(this.organizacion)
    }

    

    else {
      this.organizacion.ctrlCreado = new Date()
      console.log(this.organizacion)
      peticion = this.Oservice.OrganizacionCreate(temp)
    }


    peticion.subscribe(resp => {
      Swal.fire({
        title: this.organizacion.nombre,
        text: 'Realizado correctamente',
        icon: 'success',
      })
    },

      error => {
        if (error) {

        }

        Swal.fire({
          title: this.organizacion.nombre,
          text: 'error',
          icon: 'error',
        })
      },

    )


  }

  onGO(event: any) {
    this.go = this.gos.find(go => go.grupoOrganizacionalId === event)
  }

}

